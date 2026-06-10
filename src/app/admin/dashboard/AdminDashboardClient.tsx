"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  BarChart3,
  BellRing,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Flag,
  Globe2,
  GraduationCap,
  GripVertical,
  Images,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MessageSquare,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  ToggleRight,
  Trash2,
  Upload,
  UserCog,
  UsersRound,
  X,
  XCircle,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import type {
  AppUser,
  BlogPost,
  DestinationDetail,
  GalleryItem,
  InquiryRecord,
  PageSectionContent,
  SiteContent,
  TeamMember,
  Testimonial,
  TestPreparationClass,
  TimelineStep,
  UniversityProfile,
  WebsiteSettings,
} from "@/types";

type EditableService = {
  title: string;
  description: string;
  image?: string;
  status?: string;
  featured?: boolean;
};

type InquiryRow = {
  name: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  counselor: string;
  note: string;
  date: string;
  mode: string;
};

type EditableCountry = DestinationDetail & {
  flagImage?: string;
  tuitionFees?: string;
  livingCosts?: string;
  featured?: boolean;
};

type EditableReview = Testimonial & {
  photo?: string;
  rating: string;
  status: string;
};

type EditableReason = {
  title: string;
  description: string;
  icon: string;
  order: string;
};

type EditableApplication = {
  student: string;
  program: string;
  country: string;
  status: string;
  counselor: string;
  documents: string;
  updated: string;
  comments: string;
};

type EditableContact = {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  replyStatus: string;
};

type EditableBlogPost = BlogPost & {
  image: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
};

type EditableUniversity = {
  name: string;
  country: string;
  ranking: string;
  tuition: string;
  intake: string;
  requirements: string;
};

type EditableGalleryItem = {
  title: string;
  description: string;
  photo: string;
  photos: string[];
  items: string;
  format: string;
  status: string;
};

type EditableTeamMember = {
  name: string;
  role: string;
  photo: string;
  social: string;
  status: string;
};

type EditableWebsiteSettings = {
  logo: string;
  favicon: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  officeHours: string;
  socialMediaLinks: string;
  emailSender: string;
  emailReplyTo: string;
  googleMapsEmbed: string;
};

type EditableSeoSettings = {
  metaTitle: string;
  keywords: string;
  metaDescription: string;
  openGraphImage: string;
  sitemapSettings: string;
};

type EditableAdminAccount = {
  fullName: string;
  email: string;
  role: string;
  status: string;
};

type EditableNotificationRule = {
  title: string;
  detail: string;
  channel: string;
  status: string;
};

type EditableRecord =
  | InquiryRow
  | EditableService
  | EditableCountry
  | EditableReview
  | EditableReason
  | EditableApplication
  | EditableContact
  | EditableBlogPost
  | EditableUniversity
  | EditableGalleryItem
  | EditableTeamMember
  | EditableWebsiteSettings
  | EditableSeoSettings
  | EditableAdminAccount
  | EditableNotificationRule
  | TestPreparationClass;

type EditorKind =
  | "inquiry"
  | "counseling"
  | "country"
  | "review"
  | "reason"
  | "websiteService"
  | "application"
  | "contact"
  | "blog"
  | "university"
  | "gallery"
  | "team"
  | "settings"
  | "seo"
  | "invite"
  | "notification"
  | "pageSections"
  | "testPrep"
  | "testPrepClass"
  | "processStep";

type EditorState = {
  kind: EditorKind;
  mode: "add" | "edit";
  index?: number;
  title: string;
  fields: Record<string, string>;
};

export type AdminSectionKey =
  | "dashboard"
  | "inquiries"
  | "counseling"
  | "countries"
  | "testimonials"
  | "why-choose-us"
  | "page-sections"
  | "services"
  | "test-prep"
  | "applications"
  | "contact-forms"
  | "blog"
  | "universities"
  | "gallery"
  | "team"
  | "settings"
  | "seo"
  | "roles"
  | "analytics"
  | "notifications"
  | "database";

const inquiryStatuses = [
  "New",
  "Contacted",
  "Counseling Scheduled",
  "Applied",
  "Visa Processing",
  "Completed",
];

const applicationRows = [
  {
    student: "Ritika Bhandari",
    program: "MSc Data Analytics",
    country: "Canada",
    status: "Visa Processing",
    counselor: "Anisha KC",
    documents: "8/10",
    updated: "May 28, 2026",
  },
  {
    student: "Sagar Thapa",
    program: "Bachelor of Nursing",
    country: "Australia",
    status: "Applied",
    counselor: "Prabin Rai",
    documents: "6/9",
    updated: "May 25, 2026",
  },
  {
    student: "Manisha Gurung",
    program: "MBA",
    country: "United Kingdom",
    status: "Counseling Scheduled",
    counselor: "Anisha KC",
    documents: "3/8",
    updated: "May 22, 2026",
  },
];

const adminRoles = [
  {
    role: "Super Admin",
    access: "All modules, users, permissions, settings, billing exports",
  },
  {
    role: "Counselor",
    access: "Students, inquiries, applications, notes, assigned documents",
  },
  {
    role: "Content Editor",
    access: "Countries, blogs, services, gallery, testimonials, SEO drafts",
  },
  {
    role: "Reception/Admin Staff",
    access: "Contact forms, quick lead entry, schedules, resolved status",
  },
];

const databaseTables = [
  "users",
  "students",
  "inquiries",
  "counseling_services",
  "countries",
  "testimonials",
  "services",
  "applications",
  "blogs",
  "universities",
  "gallery",
  "team_members",
  "settings",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function statusClass(status: string) {
  if (["Completed", "Published", "Active", "Approved", "Resolved"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (["New", "Draft", "Needs review"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (["Rejected", "Overdue"].includes(status)) {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-700";
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${statusClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function IconButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#087ec3]/40 hover:text-[#087ec3]"
    >
      <Icon size={16} />
    </button>
  );
}

function AdminSection({
  id,
  icon: Icon,
  title,
  description,
  action,
  onAction,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#087ec3]/10 text-[#087ec3]">
            <Icon size={20} />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>
        {action ? (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087ec3]"
          >
            <Plus size={16} />
            {action}
          </button>
        ) : null}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
      {label}
      <input
        className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
        defaultValue={value}
      />
    </label>
  );
}

function TextArea({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
      {label}
      <textarea
        className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal leading-6 text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
        defaultValue={value}
      />
    </label>
  );
}

function Toolbar({ placeholder = "Search records" }: { placeholder?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <label className="relative max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-[#087ec3] focus:bg-white"
          placeholder={placeholder}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <Filter size={16} />
          Filter
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}

function EmptyAdminCopy({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
      {text}
    </div>
  );
}

function isPreviewableImage(value: string) {
  const source = value.trim();

  return (
    source.startsWith("/") ||
    source.startsWith("blob:") ||
    source.startsWith("data:image") ||
    source.startsWith("http://") ||
    source.startsWith("https://")
  );
}

function imageBackground(value: string) {
  return `url("${value.replace(/"/g, '\\"')}")`;
}

function MediaPreview({
  src,
  title,
  compact = false,
}: {
  src: string;
  title: string;
  compact?: boolean;
}) {
  if (!isPreviewableImage(src)) {
    return (
      <div
        className={`grid place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-center text-sm text-slate-500 ${
          compact ? "h-36" : "h-48"
        }`}
      >
        <div>
          <Images className="mx-auto text-[#087ec3]" size={24} />
          <p className="mt-2 font-semibold text-slate-700">Photo preview</p>
          <p className="mt-1 text-xs text-slate-400">Choose an image or paste an image path.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label={`${title} preview`}
      className={`relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center shadow-sm ${
        compact ? "h-36" : "h-48"
      }`}
      style={{ backgroundImage: imageBackground(src) }}
    >
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/72 to-transparent p-3 text-xs font-semibold text-white">
        {title}
      </div>
    </div>
  );
}

function buildInquiryRows(inquiries: InquiryRecord[]) {
  if (inquiries.length > 0) {
    return inquiries.slice(0, 6).map((inquiry, index) => ({
      name: inquiry.full_name,
      email: inquiry.email,
      phone: inquiry.phone,
      country: inquiry.destination,
      status: inquiryStatuses[index % inquiryStatuses.length],
      counselor: index % 2 === 0 ? "Anisha KC" : "Prabin Rai",
      note: inquiry.message,
      date: formatDate(inquiry.created_at),
      mode: inquiry.counseling_mode,
    }));
  }

  return [
    {
      name: "Aarati Poudel",
      email: "aarati@example.com",
      phone: "+977 9800000001",
      country: "Australia",
      status: "New",
      counselor: "Unassigned",
      note: "Interested in nursing programs with July intake.",
      date: "May 30, 2026",
      mode: "Office visit",
    },
    {
      name: "Bibek Lama",
      email: "bibek@example.com",
      phone: "+977 9800000002",
      country: "Canada",
      status: "Contacted",
      counselor: "Anisha KC",
      note: "Needs budget review and college shortlist.",
      date: "May 29, 2026",
      mode: "Online",
    },
  ];
}

function makeEditor(
  kind: EditorKind,
  mode: "add" | "edit",
  title: string,
  fields: Record<string, string>,
  index?: number,
): EditorState {
  return { kind, mode, title, fields, index };
}

function updateField(fields: Record<string, string>, name: string, value: string) {
  return { ...fields, [name]: value };
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinLines(items: string[]) {
  return items.filter(Boolean).join("\n");
}

const serviceIcons = [GraduationCap, FileText, ShieldCheck, Star, Globe2, ClipboardList];

function toPublishedCountry(country: EditableCountry): DestinationDetail {
  return {
    slug: country.slug,
    country: country.country,
    city: country.city,
    code: country.code,
    accent: country.accent,
    programs: country.programs,
    visa: country.visa,
    intake: country.intake,
    hero: country.hero,
    whyStudy: country.whyStudy,
    colleges: country.colleges,
    work: country.work,
    pathway: country.pathway,
    living: country.living,
  };
}

function toPublishedReview(review: EditableReview): Testimonial {
  return {
    name: review.name,
    destination: review.destination,
    quote: review.quote,
    result: review.result,
  };
}

function toPublishedPost(post: EditableBlogPost): BlogPost {
  return {
    title: post.title,
    category: post.category,
    readTime: post.readTime,
    excerpt: post.excerpt,
  };
}

export function AdminDashboardClient({
  activeSection,
  users,
  inquiries,
  destinationDetails,
  services,
  timeline,
  testimonials,
  blogPosts,
  universities,
  initialGalleryItems,
  teamMembers,
  websiteSettings,
  pageSections,
}: {
  activeSection: AdminSectionKey;
  users: AppUser[];
  inquiries: InquiryRecord[];
  destinationDetails: DestinationDetail[];
  services: EditableService[];
  timeline: TimelineStep[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  universities: UniversityProfile[];
  initialGalleryItems: GalleryItem[];
  teamMembers: TeamMember[];
  websiteSettings: WebsiteSettings;
  pageSections: PageSectionContent;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentInquiries, setStudentInquiries] = useState<InquiryRow[]>(() =>
    buildInquiryRows(inquiries),
  );
  const [counselingServices, setCounselingServices] = useState<EditableService[]>(() =>
    services.slice(0, 4).map((service, index) => ({
      ...service,
      image: "Uploaded",
      status: index === 3 ? "Draft" : "Active",
    })),
  );
  const [countries, setCountries] = useState<EditableCountry[]>(() =>
    destinationDetails.map((country, index) => ({
      ...country,
      flagImage: "/flags/destination.svg",
      tuitionFees:
        index === 0
          ? "AUD 25k-52k"
          : index === 1
            ? "CAD 16k-35k"
            : index === 2
              ? "GBP 14k-25k"
              : "Profile-based estimate",
      livingCosts: country.living,
      featured: index < 2,
    })),
  );
  const [studentReviews, setStudentReviews] = useState<EditableReview[]>(() =>
    testimonials.map((review, index) => ({
      ...review,
      photo: "/student-photo.jpg",
      rating: "5",
      status: index === 2 ? "Needs review" : "Approved",
    })),
  );
  const [whyReasons, setWhyReasons] = useState<EditableReason[]>([
    ...pageSections.whyReasons.map((reason) => ({
      title: reason.title,
      description: reason.description,
      icon: reason.icon,
      order: reason.order,
    })),
  ]);
  const [websiteServices, setWebsiteServices] = useState<EditableService[]>(() =>
    services.slice(0, 6).map((service, index) => ({
      ...service,
      image: "/service-image.jpg",
      status: "Active",
      featured: index < 2,
    })),
  );
  const [applications, setApplications] = useState<EditableApplication[]>(() =>
    applicationRows.map((application) => ({
      ...application,
      comments: "Recent update added by counselor.",
    })),
  );
  const [contacts, setContacts] = useState<EditableContact[]>(() =>
    inquiries.length > 0
      ? inquiries.slice(0, 4).map((inquiry, index) => ({
          name: inquiry.full_name,
          email: inquiry.email,
          phone: inquiry.phone,
          message: inquiry.message,
          status: index % 2 === 0 ? "New" : "Resolved",
          replyStatus: index % 2 === 0 ? "Not replied" : "Replied",
        }))
      : [],
  );
  const [articles, setArticles] = useState<EditableBlogPost[]>(() =>
    blogPosts.map((post, index) => ({
      ...post,
      image: "/blog-feature.jpg",
      seoTitle: post.title,
      seoDescription: post.excerpt,
      status: index === 1 ? "Draft" : "Published",
    })),
  );
  const [universityList, setUniversityList] = useState<EditableUniversity[]>(universities);
  const [galleryItems, setGalleryItems] = useState<EditableGalleryItem[]>(() =>
    initialGalleryItems.map((item) => ({
      title: item.title,
      description: item.description ?? "",
      photo: item.photo ?? item.image ?? "",
      photos: item.photos?.length ? item.photos : [item.photo ?? item.image ?? ""].filter(Boolean),
      items: item.items,
      format: item.format,
      status: item.status ?? "Published",
    })),
  );
  const [staffMembers, setStaffMembers] = useState<EditableTeamMember[]>(() =>
    teamMembers.map((member) => ({
      name: member.name,
      role: member.role,
      photo: member.photo ?? "",
      social: member.social,
      status: member.status,
    })),
  );
  const [processSteps, setProcessSteps] = useState<TimelineStep[]>(timeline);
  const [websiteSettingValues, setWebsiteSettings] = useState<EditableWebsiteSettings>(websiteSettings);
  const [pageSectionValues, setPageSectionValues] = useState<PageSectionContent>(pageSections);
  const [publishStatus, setPublishStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [seoSettings, setSeoSettings] = useState<EditableSeoSettings>({
    metaTitle: "Vanguard Consulting | Study Abroad from Nepal",
    keywords: "study abroad Nepal, education consultancy, student visa",
    metaDescription:
      "A premium Nepal-based abroad study consultancy for Australia, Canada, the UK, USA, India, Bangladesh, and Europe.",
    openGraphImage: "/og-vanguard.jpg",
    sitemapSettings: "Auto-generate public pages weekly",
  });
  const [adminAccounts, setAdminAccounts] = useState<EditableAdminAccount[]>(() =>
    users.map((account) => ({
      fullName: account.full_name,
      email: account.email,
      role: account.role === "admin" ? "Super Admin" : "Student",
      status: "Active",
    })),
  );
  const [notificationRules, setNotificationRules] = useState<EditableNotificationRule[]>([
    {
      title: "New inquiry alerts",
      detail: "Email + dashboard",
      channel: "Email, Dashboard",
      status: "Enabled",
    },
    {
      title: "Application status updates",
      detail: "Student + counselor",
      channel: "Email, Dashboard",
      status: "Enabled",
    },
    {
      title: "Email notifications",
      detail: "SMTP configured",
      channel: "Email",
      status: "Enabled",
    },
    {
      title: "WhatsApp integration",
      detail: "Optional, not connected",
      channel: "WhatsApp",
      status: "Disabled",
    },
  ]);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [adminCodeMasked, setAdminCodeMasked] = useState<string>("••••••••••••");
  const [newAdminCode, setNewAdminCode] = useState("");
  const [confirmAdminCode, setConfirmAdminCode] = useState("");
  const [showNewCode, setShowNewCode] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [adminCodeStatus, setAdminCodeStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");
  const [adminCodeFeedback, setAdminCodeFeedback] = useState("");
  const didMountRef = useRef(false);
  const adminCodeFetchedRef = useRef(false);

  // Fetch masked admin code when settings section is first viewed
  useEffect(() => {
    if (activeSection !== "settings" || adminCodeFetchedRef.current) return;
    adminCodeFetchedRef.current = true;
    fetch("/api/admin/admin-code")
      .then((res) => res.json())
      .then((data: { maskedCode?: string }) => {
        if (data.maskedCode) setAdminCodeMasked(data.maskedCode);
      })
      .catch(() => {});
  }, [activeSection]);

  const handleAdminCodeSave = async () => {
    if (newAdminCode.length < 6) {
      setAdminCodeStatus("error");
      setAdminCodeFeedback("Code must be at least 6 characters.");
      return;
    }
    if (newAdminCode !== confirmAdminCode) {
      setAdminCodeStatus("error");
      setAdminCodeFeedback("Codes do not match. Please re-enter.");
      return;
    }
    setAdminCodeStatus("loading");
    setAdminCodeFeedback("");
    try {
      const res = await fetch("/api/admin/admin-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCode: newAdminCode, confirmCode: confirmAdminCode }),
      });
      const data: { ok?: boolean; maskedCode?: string; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setAdminCodeStatus("error");
        setAdminCodeFeedback(data.error ?? "Failed to update code.");
      } else {
        setAdminCodeStatus("saved");
        setAdminCodeFeedback("");
        if (data.maskedCode) setAdminCodeMasked(data.maskedCode);
        setNewAdminCode("");
        setConfirmAdminCode("");
      }
    } catch {
      setAdminCodeStatus("error");
      setAdminCodeFeedback("Network error. Please try again.");
    }
  };

  const activeApplications = applications.filter((row) => row.status !== "Completed").length;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const publishTimer = window.setTimeout(async () => {
      const publishedPageSections: PageSectionContent = {
        ...pageSectionValues,
        whyReasons: whyReasons.map((reason, index) => ({
          title: reason.title,
          description: reason.description,
          icon: reason.icon,
          accent: pageSectionValues.whyReasons[index]?.accent ?? "#087ec3",
          stat: pageSectionValues.whyReasons[index]?.stat,
          order: reason.order,
        })),
      };
      const payload: SiteContent = {
        destinationDetails: countries.map(toPublishedCountry),
        services: websiteServices,
        timeline: processSteps,
        testimonials: studentReviews
          .filter((review) => review.status !== "Rejected")
          .map(toPublishedReview),
        blogPosts: articles
          .filter((post) => post.status !== "Draft")
          .map(toPublishedPost),
        universities: universityList,
        galleryItems: galleryItems.map((item) => ({
          title: item.title,
          description: item.description,
          image: item.photo,
          photo: item.photo,
          photos: item.photos.length > 0 ? item.photos : [item.photo].filter(Boolean),
          items: item.items,
          format: item.format,
          status: item.status,
        })),
        teamMembers: staffMembers.map((member) => ({
          name: member.name,
          role: member.role,
          focus: member.role,
          initials: member.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 3)
            .toUpperCase(),
          social: member.social,
          status: member.status,
          photo: member.photo,
        })),
        websiteSettings: websiteSettingValues,
        pageSections: publishedPageSections,
      };

      setPublishStatus("saving");

      try {
        const response = await fetch("/api/admin/site-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        setPublishStatus(response.ok ? "saved" : "error");
      } catch {
        setPublishStatus("error");
      }
    }, 500);

    return () => window.clearTimeout(publishTimer);
  }, [
    articles,
    countries,
    galleryItems,
    pageSectionValues,
    processSteps,
    staffMembers,
    studentReviews,
    universityList,
    websiteServices,
    websiteSettingValues,
    whyReasons,
  ]);

  const openInquiryEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : studentInquiries[index];

    setEditor(
      makeEditor(
        "inquiry",
        mode,
        mode === "add" ? "Add Student Inquiry" : "Edit Student Inquiry",
        {
          name: item?.name ?? "",
          email: item?.email ?? "",
          phone: item?.phone ?? "",
          country: item?.country ?? "",
          status: item?.status ?? "New",
          counselor: item?.counselor ?? "Unassigned",
          note: item?.note ?? "",
          mode: item?.mode ?? "Office visit",
        },
        index,
      ),
    );
  };

  const openServiceEditor = (kind: "counseling" | "websiteService", mode: "add" | "edit", index?: number) => {
    const source = kind === "counseling" ? counselingServices : websiteServices;
    const item = index === undefined ? undefined : source[index];

    setEditor(
      makeEditor(
        kind,
        mode,
        mode === "add"
          ? kind === "counseling"
            ? "Add Counseling Service"
            : "Add Website Service"
          : kind === "counseling"
            ? "Edit Counseling Service"
            : "Edit Website Service",
        {
          title: item?.title ?? "",
          description: item?.description ?? "",
          image: item?.image ?? "",
          status: item?.status ?? "Active",
          featured: item?.featured ? "Yes" : "No",
        },
        index,
      ),
    );
  };

  const openCountryEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : countries[index];

    setEditor(
      makeEditor(
        "country",
        mode,
        mode === "add" ? "Add Country" : "Edit Country",
        {
          country: item?.country ?? "",
          city: item?.city ?? "",
          code: item?.code ?? "",
          flagImage: item?.flagImage ?? "",
          description: item?.hero ?? "",
          studyOpportunities: item?.whyStudy.join("\n") ?? "",
          requirements: item ? [item.visa, ...item.pathway].join("\n") : "",
          tuitionFees: item?.tuitionFees ?? "",
          livingCosts: item?.livingCosts ?? "",
          universities: item?.colleges.join("\n") ?? "",
          featured: item?.featured ? "Yes" : "No",
        },
        index,
      ),
    );
  };

  const openReviewEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : studentReviews[index];

    setEditor(
      makeEditor(
        "review",
        mode,
        mode === "add" ? "Add Student Review" : "Edit Student Review",
        {
          name: item?.name ?? "",
          photo: item?.photo ?? "",
          destination: item?.destination ?? "",
          quote: item?.quote ?? "",
          result: item?.result ?? "",
          rating: item?.rating ?? "5",
          status: item?.status ?? "Needs review",
        },
        index,
      ),
    );
  };

  const openReasonEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : whyReasons[index];

    setEditor(
      makeEditor(
        "reason",
        mode,
        mode === "add" ? "Add Why Choose Us Reason" : "Edit Why Choose Us Reason",
        {
          title: item?.title ?? "",
          icon: item?.icon ?? "",
          description: item?.description ?? "",
          order: item?.order ?? String(whyReasons.length + 1),
        },
        index,
      ),
    );
  };

  const openPageSectionsEditor = () => {
    setEditor(
      makeEditor("pageSections", "edit", "Edit Public Page Sections", {
        heroTitle: pageSectionValues.heroTitle,
        heroHighlight: pageSectionValues.heroHighlight,
        heroDescription: pageSectionValues.heroDescription,
        heroPrimaryCta: pageSectionValues.heroPrimaryCta,
        heroSecondaryCta: pageSectionValues.heroSecondaryCta,
        heroBadgeOne: pageSectionValues.heroBadgeOne,
        heroBadgeTwo: pageSectionValues.heroBadgeTwo,
        heroImage: pageSectionValues.heroImage,
        whyEyebrow: pageSectionValues.whyEyebrow,
        whyTitle: pageSectionValues.whyTitle,
        whyHighlight: pageSectionValues.whyHighlight,
        whyDescription: pageSectionValues.whyDescription,
        whyPoints: pageSectionValues.whyPoints.join("\n"),
        personalEyebrow: pageSectionValues.personalEyebrow,
        personalTitle: pageSectionValues.personalTitle,
        personalDescription: pageSectionValues.personalDescription,
        journeyEyebrow: pageSectionValues.journeyEyebrow,
        journeyTitle: pageSectionValues.journeyTitle,
        journeyDescription: pageSectionValues.journeyDescription,
        journeyStepsJson: JSON.stringify(pageSectionValues.journeySteps, null, 2),
        journeyCtaTitle: pageSectionValues.journeyCtaTitle,
        journeyCtaDescription: pageSectionValues.journeyCtaDescription,
        journeyCtaLabel: pageSectionValues.journeyCtaLabel,
        servicesEyebrow: pageSectionValues.servicesEyebrow,
        servicesTitle: pageSectionValues.servicesTitle,
        servicesDescription: pageSectionValues.servicesDescription,
        servicesCtaEyebrow: pageSectionValues.servicesCtaEyebrow,
        servicesCtaTitle: pageSectionValues.servicesCtaTitle,
        servicesCtaDescription: pageSectionValues.servicesCtaDescription,
        servicesCtaLabel: pageSectionValues.servicesCtaLabel,
        testPrepEyebrow: pageSectionValues.testPrepEyebrow,
        testPrepTitle: pageSectionValues.testPrepTitle,
        testPrepDescription: pageSectionValues.testPrepDescription,
        testPrepCtaLabel: pageSectionValues.testPrepCtaLabel,
        testPrepClassesJson: JSON.stringify(pageSectionValues.testPrepClasses, null, 2),
        destinationsEyebrow: pageSectionValues.destinationsEyebrow,
        destinationsTitle: pageSectionValues.destinationsTitle,
        destinationsDescription: pageSectionValues.destinationsDescription,
        universitiesEyebrow: pageSectionValues.universitiesEyebrow,
        universitiesTitle: pageSectionValues.universitiesTitle,
        universitiesDescription: pageSectionValues.universitiesDescription,
        universitiesNote: pageSectionValues.universitiesNote,
        processEyebrow: pageSectionValues.processEyebrow,
        processTitle: pageSectionValues.processTitle,
        processDescription: pageSectionValues.processDescription,
        applicationEyebrow: pageSectionValues.applicationEyebrow,
        applicationTitle: pageSectionValues.applicationTitle,
        applicationDescription: pageSectionValues.applicationDescription,
        applicationCtaLabel: pageSectionValues.applicationCtaLabel,
        applicationStepsJson: JSON.stringify(pageSectionValues.applicationSteps, null, 2),
        testimonialsEyebrow: pageSectionValues.testimonialsEyebrow,
        testimonialsTitle: pageSectionValues.testimonialsTitle,
        testimonialsDescription: pageSectionValues.testimonialsDescription,
        blogEyebrow: pageSectionValues.blogEyebrow,
        blogTitle: pageSectionValues.blogTitle,
        blogDescription: pageSectionValues.blogDescription,
        blogFeatureTitle: pageSectionValues.blogFeatureTitle,
        blogFeatureDescription: pageSectionValues.blogFeatureDescription,
        galleryEyebrow: pageSectionValues.galleryEyebrow,
        galleryTitle: pageSectionValues.galleryTitle,
        galleryDescription: pageSectionValues.galleryDescription,
        teamEyebrow: pageSectionValues.teamEyebrow,
        teamTitle: pageSectionValues.teamTitle,
        teamDescription: pageSectionValues.teamDescription,
        contactEyebrow: pageSectionValues.contactEyebrow,
        contactTitle: pageSectionValues.contactTitle,
        contactDescription: pageSectionValues.contactDescription,
        contactDestinationSummary: pageSectionValues.contactDestinationSummary,
        footerBrand: pageSectionValues.footerBrand,
        footerDescription: pageSectionValues.footerDescription,
        footerCopyright: pageSectionValues.footerCopyright,
        footerTagline: pageSectionValues.footerTagline,
      }),
    );
  };

  const openTestPrepEditor = () => {
    setEditor(
      makeEditor("testPrep", "edit", "Edit Classes", {
        testPrepEyebrow: pageSectionValues.testPrepEyebrow,
        testPrepTitle: pageSectionValues.testPrepTitle,
        testPrepDescription: pageSectionValues.testPrepDescription,
        testPrepCtaLabel: pageSectionValues.testPrepCtaLabel,
        testPrepClassesJson: JSON.stringify(pageSectionValues.testPrepClasses, null, 2),
      }),
    );
  };

  const openTestPrepClassEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : pageSectionValues.testPrepClasses[index];

    setEditor(
      makeEditor(
        "testPrepClass",
        mode,
        mode === "add" ? "Add Class" : "Edit Class",
        {
          title: item?.title ?? "",
          description: item?.description ?? "",
          detail: item?.detail ?? "",
          icon: item?.icon ?? "BookOpen",
        },
        index,
      ),
    );
  };

  const openProcessEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : processSteps[index];

    setEditor(
      makeEditor(
        "processStep",
        mode,
        mode === "add" ? "Add Process Step" : "Edit Process Step",
        {
          phase: item?.phase ?? String(processSteps.length + 1).padStart(2, "0"),
          title: item?.title ?? "",
          description: item?.description ?? "",
        },
        index,
      ),
    );
  };

  const openApplicationEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : applications[index];

    setEditor(
      makeEditor(
        "application",
        mode,
        mode === "add" ? "Create Application" : "Edit Application",
        {
          student: item?.student ?? "",
          program: item?.program ?? "",
          country: item?.country ?? "",
          documents: item?.documents ?? "0/0",
          counselor: item?.counselor ?? "Unassigned",
          status: item?.status ?? "Counseling Scheduled",
          comments: item?.comments ?? "",
        },
        index,
      ),
    );
  };

  const openContactEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : contacts[index];

    setEditor(
      makeEditor(
        "contact",
        mode,
        mode === "add" ? "Manual Contact Entry" : "Edit Contact Submission",
        {
          name: item?.name ?? "",
          email: item?.email ?? "",
          phone: item?.phone ?? "",
          message: item?.message ?? "",
          status: item?.status ?? "New",
          replyStatus: item?.replyStatus ?? "Not replied",
        },
        index,
      ),
    );
  };

  const openBlogEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : articles[index];

    setEditor(
      makeEditor(
        "blog",
        mode,
        mode === "add" ? "Create Article" : "Edit Article",
        {
          title: item?.title ?? "",
          category: item?.category ?? "",
          readTime: item?.readTime ?? "5 min",
          excerpt: item?.excerpt ?? "",
          image: item?.image ?? "/blog-feature.jpg",
          seoTitle: item?.seoTitle ?? "",
          seoDescription: item?.seoDescription ?? "",
          status: item?.status ?? "Draft",
        },
        index,
      ),
    );
  };

  const openUniversityEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : universityList[index];

    setEditor(
      makeEditor(
        "university",
        mode,
        mode === "add" ? "Add University" : "Edit University",
        {
          name: item?.name ?? "",
          country: item?.country ?? "",
          ranking: item?.ranking ?? "",
          tuition: item?.tuition ?? "",
          intake: item?.intake ?? "",
          requirements: item?.requirements ?? "",
        },
        index,
      ),
    );
  };

  const openGalleryEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : galleryItems[index];

    setEditor(
      makeEditor(
        "gallery",
        mode,
        mode === "add" ? "Upload Media / Add Photo" : "Edit Gallery Media",
        {
          title: item?.title ?? "",
          description: item?.description ?? "",
          photo: item?.photo ?? "",
          photos: item?.photos.join("\n") ?? "",
          items: item?.items ?? "1",
          format: item?.format ?? "Image",
          status: item?.status ?? "Published",
        },
        index,
      ),
    );
  };

  const openTeamEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : staffMembers[index];

    setEditor(
      makeEditor(
        "team",
        mode,
        mode === "add" ? "Add Team Member" : "Edit Team Member",
        {
          name: item?.name ?? "",
          role: item?.role ?? "",
          photo: item?.photo ?? "",
          social: item?.social ?? "",
          status: item?.status ?? "Active",
        },
        index,
      ),
    );
  };

  const openSettingsEditor = () => {
    setEditor(
      makeEditor("settings", "edit", "Edit Website Settings", {
        logo: websiteSettingValues.logo,
        favicon: websiteSettingValues.favicon,
        contactPhone: websiteSettingValues.contactPhone,
        contactEmail: websiteSettingValues.contactEmail,
        officeAddress: websiteSettingValues.officeAddress,
        officeHours: websiteSettingValues.officeHours,
        socialMediaLinks: websiteSettingValues.socialMediaLinks,
        emailSender: websiteSettingValues.emailSender,
        emailReplyTo: websiteSettingValues.emailReplyTo,
        googleMapsEmbed: websiteSettingValues.googleMapsEmbed,
      }),
    );
  };

  const openSeoEditor = () => {
    setEditor(
      makeEditor("seo", "edit", "Edit SEO Settings", {
        metaTitle: seoSettings.metaTitle,
        keywords: seoSettings.keywords,
        metaDescription: seoSettings.metaDescription,
        openGraphImage: seoSettings.openGraphImage,
        sitemapSettings: seoSettings.sitemapSettings,
      }),
    );
  };

  const openInviteEditor = () => {
    setEditor(
      makeEditor("invite", "add", "Invite User", {
        fullName: "",
        email: "",
        role: "Counselor",
        status: "Invited",
      }),
    );
  };

  const openNotificationEditor = (mode: "add" | "edit", index?: number) => {
    const item = index === undefined ? undefined : notificationRules[index];

    setEditor(
      makeEditor(
        "notification",
        mode,
        mode === "add" ? "Add Notification Rule" : "Edit Notification Rule",
        {
          title: item?.title ?? "",
          detail: item?.detail ?? "",
          channel: item?.channel ?? "Email",
          status: item?.status ?? "Enabled",
        },
        index,
      ),
    );
  };

  const saveEditor = () => {
    if (!editor) {
      return;
    }

    const { fields, index, mode, kind } = editor;
    const applyRecord = <T extends EditableRecord>(
      setter: Dispatch<SetStateAction<T[]>>,
      record: T,
    ) => {
      setter((items) =>
        mode === "edit" && index !== undefined
          ? items.map((item, itemIndex) => (itemIndex === index ? record : item))
          : [record, ...items],
      );
    };

    if (kind === "inquiry") {
      applyRecord(setStudentInquiries, {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        country: fields.country,
        status: fields.status,
        counselor: fields.counselor,
        note: fields.note,
        mode: fields.mode,
        date: mode === "edit" && index !== undefined ? studentInquiries[index].date : "Today",
      });
    }

    if (kind === "counseling" || kind === "websiteService") {
      applyRecord<EditableService>(kind === "counseling" ? setCounselingServices : setWebsiteServices, {
        title: fields.title,
        description: fields.description,
        image: fields.image,
        status: fields.status,
        featured: fields.featured === "Yes",
      });
    }

    if (kind === "country") {
      applyRecord<EditableCountry>(setCountries, {
        slug: fields.country.toLowerCase().replaceAll(" ", "-") || "new-country",
        country: fields.country,
        city: fields.city,
        code: fields.code,
        accent: "#087ec3",
        programs: splitLines(fields.studyOpportunities)[0] ?? "",
        visa: splitLines(fields.requirements)[0] ?? "",
        intake: "Jan / May / Sep",
        hero: fields.description,
        whyStudy: splitLines(fields.studyOpportunities),
        colleges: splitLines(fields.universities),
        work: ["Work details can be edited in the country content workflow."],
        pathway: splitLines(fields.requirements).slice(1),
        living: fields.livingCosts,
        flagImage: fields.flagImage,
        tuitionFees: fields.tuitionFees,
        livingCosts: fields.livingCosts,
        featured: fields.featured === "Yes",
      });
    }

    if (kind === "review") {
      applyRecord<EditableReview>(setStudentReviews, {
        name: fields.name,
        photo: fields.photo,
        destination: fields.destination,
        quote: fields.quote,
        result: fields.result,
        rating: fields.rating,
        status: fields.status,
      });
    }

    if (kind === "reason") {
      applyRecord(setWhyReasons, {
        title: fields.title,
        icon: fields.icon,
        description: fields.description,
        order: fields.order,
      });
    }

    if (kind === "pageSections") {
      const {
        journeyStepsJson,
        applicationStepsJson,
        testPrepClassesJson,
        whyPoints,
        ...sectionFields
      } = fields;
      let journeySteps = pageSectionValues.journeySteps;
      let applicationSteps = pageSectionValues.applicationSteps;
      let testPrepClasses = pageSectionValues.testPrepClasses;

      try {
        journeySteps = JSON.parse(journeyStepsJson);
      } catch {
        journeySteps = pageSectionValues.journeySteps;
      }

      try {
        applicationSteps = JSON.parse(applicationStepsJson);
      } catch {
        applicationSteps = pageSectionValues.applicationSteps;
      }

      try {
        testPrepClasses = JSON.parse(testPrepClassesJson);
      } catch {
        testPrepClasses = pageSectionValues.testPrepClasses;
      }

      setPageSectionValues({
        ...pageSectionValues,
        ...sectionFields,
        whyPoints: splitLines(whyPoints),
        journeySteps,
        applicationSteps,
        testPrepClasses,
      });
    }

    if (kind === "testPrep") {
      let testPrepClasses = pageSectionValues.testPrepClasses;

      try {
        testPrepClasses = JSON.parse(fields.testPrepClassesJson);
      } catch {
        testPrepClasses = pageSectionValues.testPrepClasses;
      }

      setPageSectionValues({
        ...pageSectionValues,
        testPrepEyebrow: fields.testPrepEyebrow,
        testPrepTitle: fields.testPrepTitle,
        testPrepDescription: fields.testPrepDescription,
        testPrepCtaLabel: fields.testPrepCtaLabel,
        testPrepClasses,
      });
    }

    if (kind === "testPrepClass") {
      const record: TestPreparationClass = {
        title: fields.title,
        description: fields.description,
        detail: fields.detail,
        icon: fields.icon,
      };

      setPageSectionValues((current) => ({
        ...current,
        testPrepClasses:
          mode === "edit" && index !== undefined
            ? current.testPrepClasses.map((item, itemIndex) =>
                itemIndex === index ? record : item,
              )
            : [record, ...current.testPrepClasses],
      }));
    }

    if (kind === "processStep") {
      applyRecord<TimelineStep>(setProcessSteps, {
        phase: fields.phase,
        title: fields.title,
        description: fields.description,
      });
    }

    if (kind === "application") {
      applyRecord<EditableApplication>(setApplications, {
        student: fields.student,
        program: fields.program,
        country: fields.country,
        status: fields.status,
        counselor: fields.counselor,
        documents: fields.documents,
        comments: fields.comments,
        updated: mode === "edit" && index !== undefined ? applications[index].updated : "Today",
      });
    }

    if (kind === "contact") {
      applyRecord<EditableContact>(setContacts, {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        message: fields.message,
        status: fields.status,
        replyStatus: fields.replyStatus,
      });
    }

    if (kind === "blog") {
      applyRecord<EditableBlogPost>(setArticles, {
        title: fields.title,
        category: fields.category,
        readTime: fields.readTime,
        excerpt: fields.excerpt,
        image: fields.image,
        seoTitle: fields.seoTitle,
        seoDescription: fields.seoDescription,
        status: fields.status,
      });
    }

    if (kind === "university") {
      applyRecord<EditableUniversity>(setUniversityList, {
        name: fields.name,
        country: fields.country,
        ranking: fields.ranking,
        tuition: fields.tuition,
        intake: fields.intake,
        requirements: fields.requirements,
      });
    }

    if (kind === "gallery") {
      const photos = splitLines(fields.photos);
      const coverPhoto = fields.photo || photos[0] || "";

      applyRecord<EditableGalleryItem>(setGalleryItems, {
        title: fields.title,
        description: fields.description,
        photo: coverPhoto,
        photos: photos.length > 0 ? photos : [coverPhoto].filter(Boolean),
        items: String((photos.length > 0 ? photos : [coverPhoto].filter(Boolean)).length),
        format: fields.format,
        status: fields.status,
      });
    }

    if (kind === "team") {
      applyRecord<EditableTeamMember>(setStaffMembers, {
        name: fields.name,
        role: fields.role,
        photo: fields.photo,
        social: fields.social,
        status: fields.status,
      });
    }

    if (kind === "settings") {
      setWebsiteSettings({
        logo: fields.logo,
        favicon: fields.favicon,
        contactPhone: fields.contactPhone,
        contactEmail: fields.contactEmail,
        officeAddress: fields.officeAddress,
        officeHours: fields.officeHours,
        socialMediaLinks: fields.socialMediaLinks,
        emailSender: fields.emailSender,
        emailReplyTo: fields.emailReplyTo,
        googleMapsEmbed: fields.googleMapsEmbed,
      });
    }

    if (kind === "seo") {
      setSeoSettings({
        metaTitle: fields.metaTitle,
        keywords: fields.keywords,
        metaDescription: fields.metaDescription,
        openGraphImage: fields.openGraphImage,
        sitemapSettings: fields.sitemapSettings,
      });
    }

    if (kind === "invite") {
      applyRecord<EditableAdminAccount>(setAdminAccounts, {
        fullName: fields.fullName,
        email: fields.email,
        role: fields.role,
        status: fields.status,
      });
    }

    if (kind === "notification") {
      applyRecord<EditableNotificationRule>(setNotificationRules, {
        title: fields.title,
        detail: fields.detail,
        channel: fields.channel,
        status: fields.status,
      });
    }

    setEditor(null);
  };

  const dashboardStats = [
    { label: "New inquiries/leads", value: String(studentInquiries.length || 24), detail: "6 awaiting first contact", icon: Inbox },
    { label: "Applications in progress", value: String(activeApplications), detail: "2 visa-stage files", icon: ClipboardList },
    { label: "Countries", value: String(countries.length), detail: "4 featured destinations", icon: Globe2 },
    { label: "Reviews", value: String(studentReviews.length), detail: "3 approved, 1 pending", icon: Star },
    { label: "Counselors", value: "6", detail: "4 accepting assignments", icon: UsersRound },
    { label: "Blog posts", value: String(articles.length), detail: "2 draft ideas queued", icon: BookOpen },
    { label: "Registered users", value: String(users.length), detail: "Role-based access ready", icon: UserCog },
  ];

  const navModules: { label: string; section: AdminSectionKey; href: string }[] = [
    { label: "Dashboard", section: "dashboard", href: "/admin/dashboard" },
    { label: "Blog / News", section: "blog", href: "/admin/dashboard/blog" },
    { label: "Student Inquiry CRM", section: "inquiries", href: "/admin/dashboard/inquiries" },
    { label: "Counseling", section: "counseling", href: "/admin/dashboard/counseling" },
    { label: "Countries", section: "countries", href: "/admin/dashboard/countries" },
    { label: "Testimonials", section: "testimonials", href: "/admin/dashboard/testimonials" },
    { label: "Why Choose Us", section: "why-choose-us", href: "/admin/dashboard/why-choose-us" },
    { label: "Page Sections", section: "page-sections", href: "/admin/dashboard/page-sections" },
    { label: "Services", section: "services", href: "/admin/dashboard/services" },
    { label: "Classes", section: "test-prep", href: "/admin/dashboard/test-prep" },
    { label: "Applications", section: "applications", href: "/admin/dashboard/applications" },
    { label: "Contact Forms", section: "contact-forms", href: "/admin/dashboard/contact-forms" },
    { label: "Universities", section: "universities", href: "/admin/dashboard/universities" },
    { label: "Gallery", section: "gallery", href: "/admin/dashboard/gallery" },
    { label: "Team", section: "team", href: "/admin/dashboard/team" },
    { label: "Settings", section: "settings", href: "/admin/dashboard/settings" },
    { label: "SEO", section: "seo", href: "/admin/dashboard/seo" },
    { label: "Users & Roles", section: "roles", href: "/admin/dashboard/roles" },
    { label: "Analytics", section: "analytics", href: "/admin/dashboard/analytics" },
    { label: "Notifications", section: "notifications", href: "/admin/dashboard/notifications" },
    { label: "Database", section: "database", href: "/admin/dashboard/database" },
  ];

  return (
    <main className="relative min-h-screen bg-slate-50 px-4 py-6 text-slate-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Header Bar */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:hidden">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Open website home">
            <Image
              src="/logo.png"
              alt="Company logo"
              width={80}
              height={45}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <span className="font-display text-lg font-bold text-slate-950">Admin Panel</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-6 xl:grid-cols-[280px_1fr]">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)] xl:w-auto xl:translate-x-0 xl:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm xl:border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div className="flex flex-col">
                <Link href="/" className="inline-flex" aria-label="Open website home">
                  <Image
                    src="/logo.png"
                    alt="Company logo"
                    width={148}
                    height={84}
                    className="h-16 w-auto object-contain"
                    priority
                  />
                </Link>
                <h1 className="mt-2 font-display text-2xl font-bold text-slate-950">
                  Admin Panel
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950 xl:hidden"
                aria-label="Close sidebar menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto p-3">
              {navModules.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex h-10 items-center rounded-lg px-3 text-sm font-bold transition ${
                    activeSection === item.section
                      ? "bg-[#087ec3] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="grid gap-2 border-t border-slate-100 p-3">
              <Link
                href="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm"
              >
                User Dashboard
              </Link>
              <LogoutButton />
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {activeSection === "dashboard" ? (
          <header
            id="dashboard"
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#f75b20]/10 px-3 py-1.5 text-sm font-semibold text-[#b53b0e]">
                  <LayoutDashboard size={16} />
                  Admin command center
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 md:text-4xl">
                  Content and operations console
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                  Built for admissions teams to update every visible website section, track students from first inquiry to completion, and coordinate content, SEO, analytics, notifications, and staff access in one place.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => openInquiryEditor("add")} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#087ec3] px-4 text-sm font-semibold text-white shadow-sm">
                  <Plus size={16} />
                  New lead
                </button>
                <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm">
                  <Eye size={16} />
                  Preview site
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat) => (
                <article key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <stat.icon className="text-[#087ec3]" size={20} />
                  <p className="mt-4 text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{stat.detail}</p>
                </article>
              ))}
            </div>
          </header>
          ) : null}

          {activeSection === "inquiries" ? (
          <AdminSection
            id="inquiries"
            icon={Inbox}
            title="Student Inquiry Management"
            description="Track all inquiries, student contact details, country interest, current status, counselor notes, and searchable lead filters."
            action="Add inquiry"
            onAction={() => openInquiryEditor("add")}
          >
            <Toolbar placeholder="Search students by name, email, phone, country, or status" />
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr_1.4fr_120px] bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <span>Student</span>
                  <span>Phone</span>
                  <span>Country</span>
                  <span>Status</span>
                  <span>Counselor</span>
                  <span>Notes</span>
                  <span>Actions</span>
                </div>
                {studentInquiries.map((row, index) => (
                  <article key={`${row.email}-${row.date}`} className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr_1.4fr_120px] items-center gap-3 border-t border-slate-200 px-4 py-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-950">{row.name}</p>
                      <p className="mt-1 text-slate-500">{row.email}</p>
                    </div>
                    <span className="text-slate-600">{row.phone}</span>
                    <span className="font-medium text-slate-700">{row.country}</span>
                    <StatusPill status={row.status} />
                    <span className="text-slate-600">{row.counselor}</span>
                    <div>
                      <p className="line-clamp-2 text-slate-600">{row.note}</p>
                      <p className="mt-1 text-xs text-slate-400">{row.date} / {row.mode}</p>
                    </div>
                    <div className="flex gap-2">
                      <IconButton icon={Edit3} label="Edit inquiry" onClick={() => openInquiryEditor("edit", index)} />
                      <IconButton icon={MessageSquare} label="Add note" onClick={() => openInquiryEditor("edit", index)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "counseling" ? (
          <AdminSection
            id="counseling"
            icon={GraduationCap}
            title="Counseling Management"
            description="Add, edit, delete, sort, and publish counseling services with title, description, icon or image, display order, and active state."
            action="Add service"
            onAction={() => openServiceEditor("counseling", "add")}
          >
            <div className="grid gap-3 lg:grid-cols-2">
              {counselingServices.map((service, index) => (
                <article key={service.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <GripVertical className="mt-1 text-slate-400" size={18} />
                      <div>
                        <p className="font-semibold text-slate-950">{service.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{service.description}</p>
                      </div>
                    </div>
                    <StatusPill status={service.status ?? "Active"} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <Field label="Display order" value={String(index + 1)} />
                    <Field label="Icon/Image" value={service.image ?? "Uploaded"} />
                    <Field label="Visibility" value={service.status ?? "Active"} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <IconButton icon={Edit3} label="Edit counseling service" onClick={() => openServiceEditor("counseling", "edit", index)} />
                    <IconButton icon={Trash2} label="Delete counseling service" onClick={() => setCounselingServices((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "countries" ? (
          <AdminSection
            id="countries"
            icon={Flag}
            title="Countries Management"
            description="Manage destination pages with flags, descriptions, study opportunities, requirements, tuition, living costs, university lists, and featured placement."
            action="Add country"
            onAction={() => openCountryEditor("add")}
          >
            <div className="grid gap-4">
              {countries.map((country, index) => (
                <article key={country.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-slate-950">{country.country}</h3>
                        <StatusPill status={country.featured ? "Featured" : "Active"} />
                      </div>
                      <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{country.hero}</p>
                    </div>
                    <div className="flex gap-2">
                      <IconButton icon={Upload} label="Upload flag" />
                      <IconButton icon={Edit3} label="Edit country" onClick={() => openCountryEditor("edit", index)} />
                      <IconButton icon={Trash2} label="Delete country" onClick={() => setCountries((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-4">
                    <TextArea label="Study opportunities" value={country.whyStudy.join("\n")} />
                    <TextArea label="Requirements" value={`${country.visa}\n${country.pathway.join("\n")}`} />
                    <Field label="Tuition fees" value={country.tuitionFees ?? ""} />
                    <Field label="Living costs" value={country.livingCosts ?? country.living} />
                  </div>
                  <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
                    <span className="font-semibold text-slate-950">Universities:</span> {country.colleges.join(", ")}
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "testimonials" ? (
          <AdminSection
            id="testimonials"
            icon={Star}
            title="Student Reviews / Testimonials"
            description="Moderate student reviews with names, photos, destination studied, review text, rating, and approval decisions."
            action="Add review"
            onAction={() => openReviewEditor("add")}
          >
            <div className="grid gap-3 lg:grid-cols-2">
              {studentReviews.map((review, index) => (
                <article key={review.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{review.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{review.destination}</p>
                    </div>
                    <StatusPill status={review.status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{review.quote}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex text-amber-500">
                      {Array.from({ length: Number(review.rating) || 5 }).map((_, starIndex) => (
                        <Star key={starIndex} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <IconButton icon={CheckCircle2} label="Approve review" onClick={() => setStudentReviews((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, status: "Approved" } : item))} />
                      <IconButton icon={XCircle} label="Reject review" onClick={() => setStudentReviews((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, status: "Rejected" } : item))} />
                      <IconButton icon={Edit3} label="Edit review" onClick={() => openReviewEditor("edit", index)} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "why-choose-us" ? (
          <AdminSection
            id="why-choose-us"
            icon={ShieldCheck}
            title="Why Choose Us Section"
            description="Edit reasons, upload icons, update titles and descriptions, and reorder website value propositions."
            action="Add reason"
            onAction={() => openReasonEditor("add")}
          >
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {whyReasons.map((reason, index) => (
                <article key={`${reason.title}-${reason.order}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <GripVertical className="text-slate-400" size={18} />
                  <Field label="Title" value={reason.title} />
                  <Field label="Icon upload" value={reason.icon} />
                  <TextArea label="Description" value={reason.description} />
                  <Field label="Order" value={reason.order} />
                  <div className="mt-4 flex gap-2">
                    <IconButton icon={Edit3} label="Edit reason" onClick={() => openReasonEditor("edit", index)} />
                    <IconButton icon={Trash2} label="Delete reason" onClick={() => setWhyReasons((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "page-sections" ? (
          <AdminSection
            id="page-sections"
            icon={LayoutDashboard}
            title="Public Website Page Sections"
            description="Edit homepage hero copy, section headings, CTAs, contact/footer text, journey cards, application cards, and the process timeline."
            action="Edit page copy"
            onAction={openPageSectionsEditor}
          >
            {/* ── Hero Poster ── */}
            <div className="rounded-lg border border-[#087ec3]/25 bg-gradient-to-br from-[#087ec3]/6 via-white to-[#f75b20]/4 p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[#087ec3]/10 px-3 py-1.5 text-xs font-semibold text-[#087ec3]">
                    <Images size={14} />
                    Hero Section
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-slate-950">Hero Poster Image</h3>
                  <p className="mt-1 text-sm text-slate-600">This is the large promotional poster displayed in the right panel of the homepage hero section. Upload a new image or paste a URL to replace it. Changes save automatically.</p>
                </div>
                <StatusPill
                  status={
                    publishStatus === "saving"
                      ? "Saving"
                      : publishStatus === "saved"
                        ? "Published"
                        : publishStatus === "error"
                          ? "Save failed"
                          : "Ready"
                  }
                />
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.5fr]">
                {/* Live preview */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm" style={{ minHeight: "220px" }}>
                  {isPreviewableImage(pageSectionValues.heroImage) ? (
                    <div
                      className="absolute inset-0 rounded-2xl bg-cover bg-center"
                      style={{ backgroundImage: imageBackground(pageSectionValues.heroImage) }}
                      aria-label="Hero poster preview"
                    />
                  ) : (
                    <div className="grid min-h-[220px] place-items-center text-center">
                      <div>
                        <Images className="mx-auto text-slate-300" size={36} />
                        <p className="mt-3 text-sm font-semibold text-slate-500">No poster set</p>
                        <p className="mt-1 text-xs text-slate-400">Upload an image below to preview it here.</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-slate-950/60 to-transparent px-3 py-2 text-xs font-semibold text-white">
                    Live preview
                  </div>
                </div>
                {/* Upload controls */}
                <div className="grid content-start gap-4">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Upload new poster image
                    <input
                      id="hero-poster-upload"
                      className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-[#087ec3] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:border-[#087ec3]/40 focus:border-[#087ec3] focus:bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                          const url = typeof reader.result === "string" ? reader.result : "";
                          if (!url) return;
                          setPageSectionValues((current) => ({ ...current, heroImage: url }));
                        });
                        reader.readAsDataURL(file);
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Or enter image path / URL
                    <div className="flex gap-2">
                      <input
                        className="h-11 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-slate-700 outline-none transition hover:border-[#087ec3]/40 focus:border-[#087ec3] focus:bg-white"
                        type="text"
                        placeholder="e.g. /poster.jpeg or https://..."
                        value={pageSectionValues.heroImage}
                        onChange={(event) =>
                          setPageSectionValues((current) => ({ ...current, heroImage: event.target.value }))
                        }
                      />
                      {pageSectionValues.heroImage && (
                        <button
                          type="button"
                          title="Clear poster"
                          aria-label="Clear poster image"
                          onClick={() => setPageSectionValues((current) => ({ ...current, heroImage: "" }))}
                          className="inline-flex size-11 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-500 transition hover:bg-rose-50"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                    <span className="font-semibold text-slate-700">Tips: </span>
                    Use JPEG or PNG for best quality. Recommended size: 800&times;600 px or larger. The image is displayed in the rounded card on the right side of the homepage hero section.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-950">
                    Publish status
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Changes save automatically after you press Save changes in any editor.
                  </p>
                </div>
                <StatusPill
                  status={
                    publishStatus === "saving"
                      ? "Saving"
                      : publishStatus === "saved"
                        ? "Published"
                        : publishStatus === "error"
                          ? "Save failed"
                          : "Ready"
                  }
                />
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {[
                ["Hero", pageSectionValues.heroTitle, pageSectionValues.heroDescription],
                ["Why Choose Us", pageSectionValues.whyTitle, pageSectionValues.whyDescription],
                ["Services", pageSectionValues.servicesTitle, pageSectionValues.servicesDescription],
                ["Classes", pageSectionValues.testPrepTitle, pageSectionValues.testPrepDescription],
                ["Destinations", pageSectionValues.destinationsTitle, pageSectionValues.destinationsDescription],
                ["Universities", pageSectionValues.universitiesTitle, pageSectionValues.universitiesDescription],
                ["Applications", pageSectionValues.applicationTitle, pageSectionValues.applicationDescription],
                ["Testimonials", pageSectionValues.testimonialsTitle, pageSectionValues.testimonialsDescription],
                ["Blog", pageSectionValues.blogTitle, pageSectionValues.blogDescription],
                ["Gallery", pageSectionValues.galleryTitle, pageSectionValues.galleryDescription],
                ["Team", pageSectionValues.teamTitle, pageSectionValues.teamDescription],
                ["Contact", pageSectionValues.contactTitle, pageSectionValues.contactDescription],
                ["Footer", pageSectionValues.footerBrand, pageSectionValues.footerDescription],
              ].map(([label, title, description]) => (
                <article key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <Field label={label} value={title} />
                  <TextArea label="Public text" value={description} />
                </article>
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-950">Process timeline</h3>
                  <p className="mt-1 text-sm text-slate-600">These steps power the public Process section.</p>
                </div>
                <button
                  type="button"
                  onClick={() => openProcessEditor("add")}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#087ec3] px-4 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add step
                </button>
              </div>
              <div className="mt-4 grid gap-3">
                {processSteps.map((step, index) => (
                  <article key={`${step.phase}-${step.title}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#087ec3]">{step.phase}</p>
                        <p className="mt-1 font-semibold text-slate-950">{step.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <IconButton icon={Edit3} label="Edit process step" onClick={() => openProcessEditor("edit", index)} />
                        <IconButton icon={Trash2} label="Delete process step" onClick={() => setProcessSteps((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "services" ? (
          <AdminSection
            id="services"
            icon={FileText}
            title="Services / What We Provide"
            description="Create website service cards with service image, title, description, and featured service toggle."
            action="Add website service"
            onAction={() => openServiceEditor("websiteService", "add")}
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {websiteServices.map((service, index) => {
                const ServiceIcon = serviceIcons[index % serviceIcons.length];

                return (
                <article key={service.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <ServiceIcon className="text-[#087ec3]" size={22} />
                    <StatusPill status={service.featured ? "Featured" : service.status ?? "Active"} />
                  </div>
                  <Field label="Service title" value={service.title} />
                  <TextArea label="Description" value={service.description} />
                  <Field label="Service image" value={service.image ?? "/service-image.jpg"} />
                  <div className="mt-4 flex gap-2">
                    <IconButton icon={Edit3} label="Edit website service" onClick={() => openServiceEditor("websiteService", "edit", index)} />
                    <IconButton icon={Trash2} label="Delete website service" onClick={() => setWebsiteServices((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                </article>
                );
              })}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "test-prep" ? (
          <AdminSection
            id="test-prep"
            icon={BookOpen}
            title="Classes"
            description="Edit the public classes section, including heading copy, CTA text, and class cards shown on the homepage."
            action="Add class"
            onAction={() => openTestPrepClassEditor("add")}
          >
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <Field label="Eyebrow" value={pageSectionValues.testPrepEyebrow} />
                <Field label="Section title" value={pageSectionValues.testPrepTitle} />
                <TextArea label="Description" value={pageSectionValues.testPrepDescription} />
                <Field label="CTA label" value={pageSectionValues.testPrepCtaLabel} />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <StatusPill status={publishStatus === "saving" ? "Saving" : publishStatus === "error" ? "Save failed" : "Editable"} />
                  <button
                    type="button"
                    onClick={openTestPrepEditor}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#087ec3]/40 hover:text-[#087ec3]"
                  >
                    <Edit3 size={16} />
                    Edit section copy
                  </button>
                </div>
              </article>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openTestPrepClassEditor("add")}
                  className="flex min-h-52 items-center justify-center gap-2 rounded-lg border border-dashed border-[#087ec3]/45 bg-[#087ec3]/5 p-4 text-sm font-semibold text-[#087ec3] transition hover:bg-[#087ec3]/10"
                >
                  <Plus size={18} />
                  Add class card
                </button>
                {pageSectionValues.testPrepClasses.map((classItem, index) => (
                  <article key={`${classItem.title}-${index}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-[#087ec3]/10 text-[#087ec3]">
                        <GraduationCap size={20} />
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status={classItem.icon} />
                        <IconButton icon={Edit3} label="Edit class card" onClick={() => openTestPrepClassEditor("edit", index)} />
                        <IconButton
                          icon={Trash2}
                          label="Delete class card"
                          onClick={() =>
                            setPageSectionValues((current) => ({
                              ...current,
                              testPrepClasses: current.testPrepClasses.filter(
                                (_, itemIndex) => itemIndex !== index,
                              ),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-slate-950">
                      {classItem.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {classItem.description}
                    </p>
                    <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                      {classItem.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-display text-lg font-semibold text-slate-950">How to edit class cards</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use Add class card for new classes, or use the edit and delete buttons on each class card.
              </p>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "applications" ? (
          <AdminSection
            id="applications"
            icon={ClipboardList}
            title="Applications Management"
            description="Track student application lists, document uploads, statuses, counselor assignment, comments, and history."
            action="Create application"
            onAction={() => openApplicationEditor("add")}
          >
            <Toolbar placeholder="Search applications by student, program, country, or counselor" />
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Program</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Documents</th>
                    <th className="px-4 py-3">Counselor</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">History</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
                    <tr key={application.student} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-semibold text-slate-950">{application.student}</td>
                      <td className="px-4 py-3 text-slate-600">{application.program}</td>
                      <td className="px-4 py-3 text-slate-600">{application.country}</td>
                      <td className="px-4 py-3 text-slate-600">{application.documents}</td>
                      <td className="px-4 py-3 text-slate-600">{application.counselor}</td>
                      <td className="px-4 py-3"><StatusPill status={application.status} /></td>
                      <td className="px-4 py-3 text-slate-500">
                        <div className="flex items-center justify-between gap-3">
                          <span>{application.updated}</span>
                          <IconButton icon={Edit3} label="Edit application" onClick={() => openApplicationEditor("edit", index)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "contact-forms" ? (
          <AdminSection
            id="contact-forms"
            icon={Mail}
            title="Contact Form Management"
            description="View submissions, track reply status, mark records as resolved, and export contact inquiries for follow-up."
            action="Manual entry"
            onAction={() => openContactEditor("add")}
          >
            {contacts.length === 0 ? (
              <EmptyAdminCopy text="Contact form submissions will appear here with reply status, resolved state, export controls, and the full student message." />
            ) : (
              <div className="grid gap-3">
                {contacts.map((contact, index) => (
                  <article key={`${contact.email}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-slate-950">{contact.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{contact.email} / {contact.phone}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{contact.message}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{contact.replyStatus}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status={contact.status} />
                        <IconButton icon={Send} label="Mark replied" onClick={() => setContacts((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, replyStatus: "Replied", status: "Resolved" } : item))} />
                        <IconButton icon={Edit3} label="Edit contact submission" onClick={() => openContactEditor("edit", index)} />
                        <IconButton icon={Download} label="Export inquiry" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </AdminSection>
          ) : null}

          {activeSection === "blog" ? (
          <AdminSection
            id="blog"
            icon={BookOpen}
            title="Blog / News Management"
            description="Create and edit articles with categories, featured images, SEO settings, and publish or draft status."
            action="Create article"
            onAction={() => openBlogEditor("add")}
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {articles.map((post, index) => (
                <article key={post.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <StatusPill status={post.status} />
                    <div className="flex gap-2">
                      <IconButton icon={Edit3} label="Edit article" onClick={() => openBlogEditor("edit", index)} />
                      <IconButton icon={Trash2} label="Delete article" onClick={() => setArticles((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                    </div>
                  </div>
                  <Field label="Article title" value={post.title} />
                  <Field label="Category" value={post.category} />
                  <TextArea label="SEO excerpt" value={post.excerpt} />
                  <Field label="Featured image" value={post.image} />
                  <Field label="SEO title" value={post.seoTitle} />
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "universities" ? (
          <AdminSection
            id="universities"
            icon={Building2}
            title="University Management"
            description="Maintain university profiles with country, ranking, tuition fees, intake dates, and admission requirements."
            action="Add university"
            onAction={() => openUniversityEditor("add")}
          >
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">University</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Ranking</th>
                    <th className="px-4 py-3">Tuition</th>
                    <th className="px-4 py-3">Intakes</th>
                    <th className="px-4 py-3">Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  {universityList.map((university, index) => (
                    <tr key={university.name} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-semibold text-slate-950">{university.name}</td>
                      <td className="px-4 py-3 text-slate-600">{university.country}</td>
                      <td className="px-4 py-3 text-slate-600">{university.ranking}</td>
                      <td className="px-4 py-3 text-slate-600">{university.tuition}</td>
                      <td className="px-4 py-3 text-slate-600">{university.intake}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <div className="flex items-center justify-between gap-3">
                          <span>{university.requirements}</span>
                          <IconButton icon={Edit3} label="Edit university" onClick={() => openUniversityEditor("edit", index)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "gallery" ? (
          <AdminSection
            id="gallery"
            icon={Images}
            title="Gallery Management"
            description="Organize success story images, office photos, event photos, and video assets for the public website."
            action="Upload media"
            onAction={() => openGalleryEditor("add")}
          >
            <div className="grid gap-3 md:grid-cols-3">
              {galleryItems.map((group, index) => (
                <article key={group.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <MediaPreview src={group.photo} title={group.title} compact />
                  <div className="p-4">
                  <Images className="text-[#087ec3]" size={22} />
                  <p className="mt-4 font-semibold text-slate-950">{group.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{group.photos.length} photos / {group.format}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{group.description}</p>
                  <p className="mt-1 truncate text-xs text-slate-400">{group.photo}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <StatusPill status={group.status} />
                    <div className="flex gap-2">
                      <IconButton icon={Upload} label="Manage media" onClick={() => openGalleryEditor("edit", index)} />
                      <IconButton icon={Trash2} label="Delete media" onClick={() => setGalleryItems((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                    </div>
                  </div>
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "team" ? (
          <AdminSection
            id="team"
            icon={UsersRound}
            title="Team Management"
            description="Manage counselor and staff profiles with photos, designations, biographies, and social links."
            action="Add team member"
            onAction={() => openTeamEditor("add")}
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {staffMembers.map((member, index) => (
                <article key={member.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    {isPreviewableImage(member.photo) ? (
                      <div
                        aria-label={`${member.name} photo`}
                        className="size-14 rounded-lg border border-slate-200 bg-white bg-cover bg-center"
                        style={{ backgroundImage: imageBackground(member.photo) }}
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-lg bg-[#087ec3]/10 font-display text-lg font-semibold text-[#087ec3]">
                        {member.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                    )}
                    <StatusPill status={member.status} />
                  </div>
                  <Field label="Name" value={member.name} />
                  <Field label="Designation" value={member.role} />
                  <Field label="Photo" value={member.photo} />
                  <Field label="Social links" value={member.social} />
                  <div className="mt-4 flex gap-2">
                    <IconButton icon={Edit3} label="Edit team member" onClick={() => openTeamEditor("edit", index)} />
                    <IconButton icon={Trash2} label="Delete team member" onClick={() => setStaffMembers((items) => items.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "settings" ? (
          <>
          <AdminSection
            id="settings"
            icon={Settings}
            title="Website Settings"
            description="Update brand assets, contact details, office address, social media links, email settings, and Google Maps embed."
            action="Save settings"
            onAction={openSettingsEditor}
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <Field label="Logo" value={websiteSettingValues.logo} />
              <Field label="Favicon" value={websiteSettingValues.favicon} />
              <Field label="Contact phone" value={websiteSettingValues.contactPhone} />
              <Field label="Contact email" value={websiteSettingValues.contactEmail} />
              <Field label="Office address" value={websiteSettingValues.officeAddress} />
              <Field label="Office hours" value={websiteSettingValues.officeHours} />
              <Field label="Social media links" value={websiteSettingValues.socialMediaLinks} />
              <Field label="Email sender" value={websiteSettingValues.emailSender} />
              <Field label="Email reply-to" value={websiteSettingValues.emailReplyTo} />
              <Field label="Google Maps embed" value={websiteSettingValues.googleMapsEmbed} />
            </div>
          </AdminSection>

          {/* Admin Signup Code Card */}
          <AdminSection
            id="admin-code"
            icon={KeyRound}
            title="Admin Signup Code"
            description="Change the secret code required when registering new admin accounts. Keep this private — anyone with this code can create an admin account."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Current code display */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Current code</p>
                <p className="mt-3 font-mono text-2xl font-semibold tracking-widest text-slate-950">
                  {adminCodeMasked}
                </p>
                <p className="mt-2 text-xs text-slate-500">Masked for security. Set a new code below to change it.</p>
              </div>

              {/* Change code form */}
              <div className="grid gap-4">
                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  New admin code
                  <div className="relative">
                    <input
                      id="new-admin-code"
                      type={showNewCode ? "text" : "password"}
                      value={newAdminCode}
                      onChange={(e) => { setNewAdminCode(e.target.value); setAdminCodeStatus("idle"); }}
                      placeholder="Min. 6 characters"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm font-normal text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                    />
                    <button
                      type="button"
                      aria-label={showNewCode ? "Hide code" : "Show code"}
                      onClick={() => setShowNewCode((v) => !v)}
                      className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-slate-400 hover:text-slate-700"
                    >
                      {showNewCode ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Confirm new code
                  <div className="relative">
                    <input
                      id="confirm-admin-code"
                      type={showConfirmCode ? "text" : "password"}
                      value={confirmAdminCode}
                      onChange={(e) => { setConfirmAdminCode(e.target.value); setAdminCodeStatus("idle"); }}
                      placeholder="Re-enter new code"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm font-normal text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                    />
                    <button
                      type="button"
                      aria-label={showConfirmCode ? "Hide confirm code" : "Show confirm code"}
                      onClick={() => setShowConfirmCode((v) => !v)}
                      className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmCode ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    id="save-admin-code-btn"
                    disabled={adminCodeStatus === "loading" || !newAdminCode || !confirmAdminCode}
                    onClick={handleAdminCodeSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087ec3] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <KeyRound size={15} />
                    {adminCodeStatus === "loading" ? "Saving…" : "Update code"}
                  </button>
                  {adminCodeStatus === "saved" && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                      <CheckCircle2 size={15} /> Code updated!
                    </span>
                  )}
                  {adminCodeStatus === "error" && adminCodeFeedback && (
                    <span className="text-sm text-rose-600">{adminCodeFeedback}</span>
                  )}
                </div>
              </div>
            </div>
          </AdminSection>
          </>
          ) : null}

          {activeSection === "seo" ? (
          <AdminSection
            id="seo"
            icon={Globe2}
            title="SEO Management"
            description="Control meta title, meta description, keywords, Open Graph image, and sitemap settings for core pages."
            action="Save SEO"
            onAction={openSeoEditor}
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Meta title" value={seoSettings.metaTitle} />
              <Field label="Keywords" value={seoSettings.keywords} />
              <TextArea label="Meta description" value={seoSettings.metaDescription} />
              <div className="grid gap-3">
                <Field label="Open Graph image" value={seoSettings.openGraphImage} />
                <Field label="Sitemap settings" value={seoSettings.sitemapSettings} />
              </div>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "roles" ? (
          <AdminSection
            id="roles"
            icon={KeyRound}
            title="User & Admin Management"
            description="Assign super admin, counselor, content editor, and reception/admin staff roles with role-based permissions."
            action="Invite user"
            onAction={openInviteEditor}
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-display text-lg font-semibold text-slate-950">Registered accounts</h3>
                <div className="mt-4 grid gap-3">
                  {adminAccounts.length === 0 ? (
                    <EmptyAdminCopy text="Admin and staff accounts will appear here after sign-up." />
                  ) : (
                    adminAccounts.map((account, index) => (
                      <article key={`${account.email}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3">
                        <div>
                          <p className="font-semibold text-slate-950">{account.fullName}</p>
                          <p className="text-sm text-slate-500">{account.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusPill status={account.role} />
                          <StatusPill status={account.status} />
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                {adminRoles.map((role) => (
                  <article key={role.role} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 text-[#087ec3]" size={18} />
                      <div>
                        <p className="font-semibold text-slate-950">{role.role}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{role.access}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "analytics" ? (
          <AdminSection
            id="analytics"
            icon={BarChart3}
            title="Analytics"
            description="Review most viewed countries, lead conversion rate, and inquiry source tracking."
          >
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Most viewed countries", "Canada", "28% of destination traffic"],
                ["Lead conversion rate", "7.8%", "Inquiry follow-up"],
                ["Inquiry sources", "Instagram", "Top acquisition source"],
              ].map(([label, value, detail]) => (
                <article key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-slate-950">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </article>
              ))}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "notifications" ? (
          <AdminSection
            id="notifications"
            icon={BellRing}
            title="Notifications"
            description="Configure new inquiry alerts, application status updates, email notifications, and optional WhatsApp integration."
            action="Save notification rules"
            onAction={() => openNotificationEditor("add")}
          >
            <div className="grid gap-3 lg:grid-cols-4">
              {notificationRules.map((rule, index) => {
                const Icon = index === 1 ? Clock3 : index === 2 ? Mail : index === 3 ? MessageCircle : BellRing;

                return (
                <article key={rule.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <Icon className="text-[#087ec3]" size={20} />
                  <p className="mt-4 font-semibold text-slate-950">{rule.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{rule.detail}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{rule.channel}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className={`flex items-center gap-2 text-sm font-semibold ${rule.status === "Enabled" ? "text-emerald-700" : "text-slate-500"}`}>
                      <ToggleRight size={18} />
                      {rule.status}
                    </div>
                    <IconButton icon={Edit3} label="Edit notification rule" onClick={() => openNotificationEditor("edit", index)} />
                  </div>
                </article>
                );
              })}
            </div>
          </AdminSection>
          ) : null}

          {activeSection === "database" ? (
          <AdminSection
            id="database"
            icon={Building2}
            title="Database Tables"
            description="Minimum data model for powering the complete admin panel and public website content without code edits."
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {databaseTables.map((table) => (
                <div key={table} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700">
                  {table}
                </div>
              ))}
            </div>
          </AdminSection>
          ) : null}
        </div>
      </div>
      {editor ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/45 px-4 py-8 backdrop-blur-sm">
          <form
            className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-2xl"
            onSubmit={(event) => {
              event.preventDefault();
              saveEditor();
            }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#087ec3]">
                  {editor.mode === "add" ? "Create record" : "Update record"}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">
                  {editor.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close editor"
                onClick={() => setEditor(null)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:text-rose-600"
              >
                <XCircle size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {Object.entries(editor.fields).map(([name, value]) => {
                const isLongField = [
                  "note",
                  "description",
                  "studyOpportunities",
                  "requirements",
                  "universities",
                  "quote",
                  "message",
                  "comments",
                  "excerpt",
                  "seoDescription",
                  "photos",
                  "detail",
                ].includes(name) || name.toLowerCase().includes("description") || name.toLowerCase().includes("json") || name === "whyPoints";
                const isMediaField = ["photo", "image", "heroImage"].includes(name);
                const label = name
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (letter) => letter.toUpperCase());
                const photoList = name === "photos" ? splitLines(value) : [];

                return (
                  <label
                    key={name}
                    className={`grid gap-1.5 text-sm font-medium text-slate-700 ${
                      isLongField || isMediaField ? "md:col-span-2" : ""
                    }`}
                  >
                    {label}
                    {name === "photos" ? (
                      <div className="grid gap-3">
                        <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                          {photoList.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {photoList.map((photo, photoIndex) => (
                                <div key={`${photo}-${photoIndex}`} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                                  <MediaPreview src={photo} title={`Album photo ${photoIndex + 1}`} compact />
                                  <div className="flex items-center justify-between gap-2 p-2">
                                    <span className="truncate text-xs font-normal text-slate-500">
                                      Photo {photoIndex + 1}
                                    </span>
                                    <button
                                      type="button"
                                      className="rounded-md border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                                      onClick={() =>
                                        setEditor((current) => {
                                          if (!current) {
                                            return current;
                                          }

                                          const nextPhotos = splitLines(current.fields[name]).filter(
                                            (_, index) => index !== photoIndex,
                                          );

                                          return {
                                            ...current,
                                            fields: updateField(current.fields, name, joinLines(nextPhotos)),
                                          };
                                        })
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm font-normal text-slate-500">
                              No album photos yet. Upload images or paste image paths below.
                            </div>
                          )}

                          <input
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-[#087ec3] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white focus:border-[#087ec3]"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                              const files = Array.from(event.target.files ?? []);

                              if (files.length === 0) {
                                return;
                              }

                              Promise.all(
                                files.map(
                                  (file) =>
                                    new Promise<string>((resolve) => {
                                      const reader = new FileReader();

                                      reader.addEventListener("load", () => {
                                        resolve(typeof reader.result === "string" ? reader.result : "");
                                      });

                                      reader.readAsDataURL(file);
                                    }),
                                ),
                              ).then((uploadedPhotos) => {
                                setEditor((current) => {
                                  if (!current) {
                                    return current;
                                  }

                                  const nextPhotos = [
                                    ...splitLines(current.fields[name]),
                                    ...uploadedPhotos.filter(Boolean),
                                  ];
                                  const nextFields = updateField(
                                    current.fields,
                                    name,
                                    joinLines(nextPhotos),
                                  );

                                  return {
                                    ...current,
                                    fields: current.fields.photo
                                      ? nextFields
                                      : updateField(nextFields, "photo", nextPhotos[0] ?? ""),
                                  };
                                });
                              });

                              event.currentTarget.value = "";
                            }}
                          />
                        </div>
                        <textarea
                          className="min-h-32 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal leading-6 text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                          value={value}
                          placeholder="Paste one image path or URL per line. You can add unlimited photos."
                          onChange={(event) =>
                            setEditor((current) =>
                              current
                                ? {
                                    ...current,
                                    fields: updateField(current.fields, name, event.target.value),
                                  }
                                : current,
                            )
                          }
                        />
                      </div>
                    ) : isMediaField ? (
                      <div className="grid gap-2">
                        <MediaPreview src={value} title={`${label} preview`} />
                        <input
                          className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-[#087ec3] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white focus:border-[#087ec3] focus:bg-white"
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0];

                            if (!file) {
                              return;
                            }

                            const reader = new FileReader();

                            reader.addEventListener("load", () => {
                              const previewUrl =
                                typeof reader.result === "string" ? reader.result : "";

                              if (!previewUrl) {
                                return;
                              }

                              setEditor((current) =>
                                current
                                  ? {
                                      ...current,
                                      fields: updateField(current.fields, name, previewUrl),
                                    }
                                  : current,
                              );
                            });

                            reader.readAsDataURL(file);
                          }}
                        />
                        <input
                          className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                          placeholder="Paste an image path or URL"
                          value={value}
                          onChange={(event) =>
                            setEditor((current) =>
                              current
                                ? {
                                    ...current,
                                    fields: updateField(current.fields, name, event.target.value),
                                  }
                                : current,
                            )
                          }
                        />
                      </div>
                    ) : isLongField ? (
                      <textarea
                        className="min-h-28 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal leading-6 text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                        value={value}
                        onChange={(event) =>
                          setEditor((current) =>
                            current
                              ? {
                                  ...current,
                                  fields: updateField(current.fields, name, event.target.value),
                                }
                              : current,
                          )
                        }
                      />
                    ) : (
                      <input
                        className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#087ec3] focus:bg-white"
                        value={value}
                        onChange={(event) =>
                          setEditor((current) =>
                            current
                              ? {
                                  ...current,
                                  fields: updateField(current.fields, name, event.target.value),
                                }
                              : current,
                          )
                        }
                      />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#087ec3] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-950"
              >
                <CheckCircle2 size={16} />
                Save changes
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
