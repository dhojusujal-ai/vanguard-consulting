import { Pool } from "pg";
import { defaultSiteContent } from "@/data/site";
import type { AppUser, InquiryPayload, InquiryRecord, SiteContent, UserRole, WebsiteSettings } from "@/types";

declare global {
  var postgresPool: Pool | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

export function getPool() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  globalThis.postgresPool ??= new Pool({
    connectionString: databaseUrl,
    max: 1, // 1 connection per serverless instance to avoid limits
    idleTimeoutMillis: 1000, // Drop idle connections immediately 
    connectionTimeoutMillis: 5000,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return globalThis.postgresPool;
}

export async function ensureInquiryTable() {
  await getPool().query(`
    create extension if not exists pgcrypto;

    create table if not exists public.inquiries (
      id uuid primary key default gen_random_uuid(),
      full_name text not null,
      email text not null,
      phone text not null,
      destination text not null,
      preferred_date text,
      preferred_time text,
      counseling_mode text,
      message text not null,
      created_at timestamptz not null default now()
    );
  `);

  await getPool().query(`
    alter table public.inquiries
      add column if not exists preferred_date text,
      add column if not exists preferred_time text,
      add column if not exists counseling_mode text;
  `);
}

export async function insertInquiry(payload: InquiryPayload) {
  await ensureInquiryTable();

  await getPool().query(
    `
      insert into public.inquiries (
        full_name,
        email,
        phone,
        destination,
        preferred_date,
        preferred_time,
        counseling_mode,
        message
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      payload.full_name,
      payload.email,
      payload.phone,
      payload.destination,
      payload.preferred_date,
      payload.preferred_time,
      payload.counseling_mode,
      payload.message,
    ],
  );
}

export async function ensureAuthTables() {
  await getPool().query(`
    create extension if not exists pgcrypto;

    create table if not exists public.app_users (
      id uuid primary key default gen_random_uuid(),
      full_name text not null,
      email text not null unique,
      password_hash text not null,
      role text not null default 'user' check (role in ('user', 'admin')),
      created_at timestamptz not null default now()
    );

    create table if not exists public.app_sessions (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references public.app_users(id) on delete cascade,
      token_hash text not null unique,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    );
  `);
}

function toAppUser(row: Record<string, string>): AppUser {
  return {
    id: row.id,
    full_name: row.full_name,
    email: row.email,
    role: row.role as UserRole,
    created_at: row.created_at,
  };
}

export async function createUser(input: {
  full_name: string;
  email: string;
  password_hash: string;
  role: UserRole;
}) {
  await ensureAuthTables();

  const result = await getPool().query(
    `
      insert into public.app_users (full_name, email, password_hash, role)
      values ($1, $2, $3, $4)
      returning id, full_name, email, role, created_at;
    `,
    [input.full_name, input.email, input.password_hash, input.role],
  );

  return toAppUser(result.rows[0]);
}

export async function findUserByEmail(email: string) {
  await ensureAuthTables();

  const result = await getPool().query<{
    id: string;
    full_name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    created_at: string;
  }>(
    `
      select id, full_name, email, password_hash, role, created_at
      from public.app_users
      where email = $1
      limit 1;
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function createSession(input: {
  user_id: string;
  token_hash: string;
  expires_at: Date;
}) {
  await ensureAuthTables();

  await getPool().query(
    `
      insert into public.app_sessions (user_id, token_hash, expires_at)
      values ($1, $2, $3);
    `,
    [input.user_id, input.token_hash, input.expires_at],
  );
}

export async function findUserBySessionToken(token_hash: string) {
  await ensureAuthTables();

  const result = await getPool().query(
    `
      select users.id, users.full_name, users.email, users.role, users.created_at
      from public.app_sessions sessions
      join public.app_users users on users.id = sessions.user_id
      where sessions.token_hash = $1
        and sessions.expires_at > now()
      limit 1;
    `,
    [token_hash],
  );

  return result.rows[0] ? toAppUser(result.rows[0]) : null;
}

export async function deleteSession(token_hash: string) {
  await ensureAuthTables();

  await getPool().query(
    "delete from public.app_sessions where token_hash = $1;",
    [token_hash],
  );
}

export async function listUsers({ limit = 50, offset = 0 } = {}) {
  await ensureAuthTables();

  const result = await getPool().query(
    `
      select id, full_name, email, role, created_at
      from public.app_users
      order by created_at desc
      limit $1 offset $2;
    `,
    [limit, offset]
  );

  return result.rows.map(toAppUser);
}

export async function listInquiries({ limit = 50, offset = 0 } = {}): Promise<InquiryRecord[]> {
  await ensureInquiryTable();

  const result = await getPool().query(
    `
      select id, full_name, email, phone, destination, preferred_date,
        preferred_time, counseling_mode, message, created_at
      from public.inquiries
      order by created_at desc
      limit $1 offset $2;
    `,
    [limit, offset]
  );

  return result.rows;
}

export async function ensureSiteContentTable() {
  await getPool().query(`
    create table if not exists public.site_content (
      id text primary key,
      content jsonb not null,
      updated_at timestamptz not null default now()
    );
  `);
}

function mergeDestinationDetails(content: Partial<SiteContent> | null | undefined) {
  const savedDestinations = (content?.destinationDetails ?? []).map((destination) => {
    const defaultDestination = defaultSiteContent.destinationDetails.find(
      (item) => item.slug === destination.slug,
    );

    if (!defaultDestination) {
      return destination;
    }

    return {
      ...destination,
      work:
        destination.work.length >= defaultDestination.work.length
          ? destination.work
          : defaultDestination.work,
    };
  });
  const savedSlugs = new Set(savedDestinations.map((destination) => destination.slug));
  const missingDefaults = defaultSiteContent.destinationDetails.filter(
    (destination) => !savedSlugs.has(destination.slug),
  );

  return [...savedDestinations, ...missingDefaults];
}

function mergeWebsiteSettings(content: Partial<SiteContent> | null | undefined) {
  const savedSettings: Partial<WebsiteSettings> = content?.websiteSettings ?? {};
  const mergedSettings = {
    ...defaultSiteContent.websiteSettings,
    ...savedSettings,
  };

  return {
    ...mergedSettings,
    contactEmail:
      !savedSettings.contactEmail || savedSettings.contactEmail === "info@vanguardconsulting.com.np"
        ? defaultSiteContent.websiteSettings.contactEmail
        : mergedSettings.contactEmail,
    officeAddress:
      !savedSettings.officeAddress || savedSettings.officeAddress.includes("Kamaladi")
        ? defaultSiteContent.websiteSettings.officeAddress
        : mergedSettings.officeAddress,
    officeHours:
      !savedSettings.officeHours || savedSettings.officeHours.includes("Saturday")
        ? defaultSiteContent.websiteSettings.officeHours
        : mergedSettings.officeHours,
    emailReplyTo:
      !savedSettings.emailReplyTo || savedSettings.emailReplyTo === "counseling@vanguardconsulting.com.np"
        ? defaultSiteContent.websiteSettings.emailReplyTo
        : mergedSettings.emailReplyTo,
  };
}

function mergeSiteContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    ...defaultSiteContent,
    ...(content ?? {}),
    destinationDetails: mergeDestinationDetails(content),
    pageSections: {
      ...defaultSiteContent.pageSections,
      ...(content?.pageSections ?? {}),
    },
    websiteSettings: mergeWebsiteSettings(content),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!databaseUrl) {
    return defaultSiteContent;
  }

  try {
    await ensureSiteContentTable();

    const result = await getPool().query<{ content: SiteContent }>(
      "select content from public.site_content where id = 'main' limit 1;",
    );

    return mergeSiteContent(result.rows[0]?.content);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await ensureSiteContentTable();

  await getPool().query(
    `
      insert into public.site_content (id, content, updated_at)
      values ('main', $1::jsonb, now())
      on conflict (id)
      do update set content = excluded.content, updated_at = now();
    `,
    [JSON.stringify(mergeSiteContent(content))],
  );
}

export async function getStoredAdminSignupCode(): Promise<string | null> {
  if (!databaseUrl) return null;
  try {
    await ensureSiteContentTable();
    const result = await getPool().query<{ content: { adminSignupCode?: string } }>(
      "select content from public.site_content where id = 'admin_settings' limit 1;",
    );
    return result.rows[0]?.content?.adminSignupCode ?? null;
  } catch {
    return null;
  }
}

export async function saveAdminSignupCode(code: string): Promise<void> {
  await ensureSiteContentTable();
  await getPool().query(
    `
      insert into public.site_content (id, content, updated_at)
      values ('admin_settings', $1::jsonb, now())
      on conflict (id)
      do update set content = excluded.content, updated_at = now();
    `,
    [JSON.stringify({ adminSignupCode: code })],
  );
}
