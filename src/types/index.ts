import type { LucideIcon } from "lucide-react";

export type Destination = {
  slug: string;
  country: string;
  city: string;
  code: string;
  accent: string;
  programs: string;
  visa: string;
  intake: string;
};

export type DestinationDetail = Destination & {
  hero: string;
  whyStudy: string[];
  colleges: string[];
  work: string[];
  pathway: string[];
  living: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type EditableServiceContent = {
  title: string;
  description: string;
  image?: string;
  status?: string;
  featured?: boolean;
};

export type TimelineStep = {
  phase: string;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  destination: string;
  quote: string;
  result: string;
};

export type BlogPost = {
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
};

export type UniversityProfile = {
  name: string;
  country: string;
  ranking: string;
  tuition: string;
  intake: string;
  requirements: string;
};

export type GalleryItem = {
  title: string;
  description?: string;
  image?: string;
  photo?: string;
  photos?: string[];
  items: string;
  format: string;
  status?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  initials: string;
  social: string;
  status: string;
  photo?: string;
};

export type WebsiteSettings = {
  logo: string;
  favicon: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  socialMediaLinks: string;
  emailSender: string;
  emailReplyTo: string;
  googleMapsEmbed: string;
};

export type WhyReason = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  stat?: string;
  order: string;
};

export type JourneyStep = {
  title: string;
  description: string;
  icon: string;
  accent: string;
};

export type ApplicationStep = {
  title: string;
  description: string;
  icon: string;
};

export type TestPreparationClass = {
  title: string;
  description: string;
  detail: string;
  icon: string;
};

export type PageSectionContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroBadgeOne: string;
  heroBadgeTwo: string;
  heroImage: string;
  whyEyebrow: string;
  whyTitle: string;
  whyHighlight: string;
  whyDescription: string;
  whyPoints: string[];
  whyReasons: WhyReason[];
  personalEyebrow: string;
  personalTitle: string;
  personalDescription: string;
  journeyEyebrow: string;
  journeyTitle: string;
  journeyDescription: string;
  journeySteps: JourneyStep[];
  journeyCtaTitle: string;
  journeyCtaDescription: string;
  journeyCtaLabel: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  servicesCtaEyebrow: string;
  servicesCtaTitle: string;
  servicesCtaDescription: string;
  servicesCtaLabel: string;
  testPrepEyebrow: string;
  testPrepTitle: string;
  testPrepDescription: string;
  testPrepCtaLabel: string;
  testPrepClasses: TestPreparationClass[];
  destinationsEyebrow: string;
  destinationsTitle: string;
  destinationsDescription: string;
  universitiesEyebrow: string;
  universitiesTitle: string;
  universitiesDescription: string;
  universitiesNote: string;
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  applicationEyebrow: string;
  applicationTitle: string;
  applicationDescription: string;
  applicationCtaLabel: string;
  applicationSteps: ApplicationStep[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
  blogEyebrow: string;
  blogTitle: string;
  blogDescription: string;
  blogFeatureTitle: string;
  blogFeatureDescription: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryDescription: string;
  teamEyebrow: string;
  teamTitle: string;
  teamDescription: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  contactDestinationSummary: string;
  footerBrand: string;
  footerDescription: string;
  footerCopyright: string;
  footerTagline: string;
};

export type SiteContent = {
  destinationDetails: DestinationDetail[];
  services: EditableServiceContent[];
  timeline: TimelineStep[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  universities: UniversityProfile[];
  galleryItems: GalleryItem[];
  teamMembers: TeamMember[];
  websiteSettings: WebsiteSettings;
  pageSections: PageSectionContent;
};

export type InquiryPayload = {
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  preferred_date: string;
  preferred_time: string;
  counseling_mode: string;
  message: string;
};

export type UserRole = "user" | "admin";

export type AppUser = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
};

export type InquiryRecord = InquiryPayload & {
  id: string;
  created_at: string;
};
