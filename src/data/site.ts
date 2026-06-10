import {
  BadgeCheck,
  BriefcaseBusiness,
  FileSearch,
  GraduationCap,
  Landmark,
  PlaneTakeoff,
  Radar,
  Sparkles,
} from "lucide-react";
import type {
  BlogPost,
  Destination,
  DestinationDetail,
  GalleryItem,
  PageSectionContent,
  Service,
  SiteContent,
  Stat,
  TeamMember,
  Testimonial,
  TimelineStep,
  UniversityProfile,
  WebsiteSettings,
} from "@/types";

export const destinations: Destination[] = [
  {
    slug: "australia",
    country: "Australia",
    city: "Sydney",
    code: "AUS",
    accent: "#087ec3",
    programs: "Nursing, IT, Business",
    visa: "Subclass 500",
    intake: "Feb / Jul / Nov",
  },
  {
    slug: "canada",
    country: "Canada",
    city: "Toronto",
    code: "CAN",
    accent: "#ed1c24",
    programs: "Data, Health, MBA",
    visa: "Study Permit",
    intake: "Jan / May / Sep",
  },
  {
    slug: "united-kingdom",
    country: "United Kingdom",
    city: "London",
    code: "UK",
    accent: "#e52772",
    programs: "Law, Finance, AI",
    visa: "Student Route",
    intake: "Jan / Sep",
  },
  {
    slug: "united-states",
    country: "United States",
    city: "Boston",
    code: "USA",
    accent: "#f75b20",
    programs: "STEM, Research, MBA",
    visa: "F-1 Visa",
    intake: "Spring / Fall",
  },
  {
    slug: "india",
    country: "India",
    city: "Bengaluru",
    code: "IND",
    accent: "#087ec3",
    programs: "Medicine, IT, Management",
    visa: "Student Visa",
    intake: "Jan / Jul",
  },
  {
    slug: "bangladesh",
    country: "Bangladesh",
    city: "Dhaka",
    code: "BGD",
    accent: "#ed1c24",
    programs: "MBBS, Dental, Pharmacy",
    visa: "Student Visa",
    intake: "Jan / Sep",
  },
  {
    slug: "europe",
    country: "Europe",
    city: "Berlin",
    code: "EUR",
    accent: "#f75b20",
    programs: "Engineering, Hospitality, Business",
    visa: "Schengen / National",
    intake: "Spring / Fall",
  },
];

export const countryDestinations = destinations.slice(0, 6);

export const destinationDetails: DestinationDetail[] = [
  {
    ...destinations[0],
    hero:
      "Australia is one of the most popular destinations for Nepali students — offering globally respected universities, flexible study options, and clear pathways for nursing, IT, business, and hospitality.",
    whyStudy: [
      "Home to 43 universities, including world-ranked institutions in medicine, engineering, and business.",
      "Generous post-study work rights of 2–6 years depending on your degree and study location.",
      "Nepali students have a strong track record of visa approvals when documentation is properly prepared.",
    ],
    colleges: [
      "University of Sydney",
      "Monash University",
      "Deakin University",
      "RMIT University",
      "University of Technology Sydney",
      "Griffith University",
    ],
    work: [
      "Student visa holders can work up to 48 hours per fortnight during semester and unlimited hours during breaks.",
      "Popular part-time roles include hospitality, retail, aged care, tutoring, and warehouse work.",
      "Casual wages in Australia are among the highest in the world — great for covering day-to-day living costs.",
      "Your counselor will help you understand work-hour conditions specific to your visa subclass.",
    ],
    pathway: [
      "Profile and budget assessment with your Vanguard counselor",
      "University shortlist, course selection, and GTE/GS statement preparation",
      "Offer letter, COE, and student visa application",
      "Pre-departure briefing and arrival support",
    ],
    living:
      "Living costs vary by city — Sydney and Melbourne are more expensive, while Brisbane, Adelaide, and regional areas offer more affordable options. Plan for AUD 1,800–2,500 per month.",
  },
  {
    ...destinations[1],
    hero:
      "Canada is a top choice for Nepali students seeking world-class education, multicultural cities, and long-term settlement options. Programs in technology, health, business, and engineering are especially strong.",
    whyStudy: [
      "Canada's Post-Graduation Work Permit (PGWP) lets graduates work for up to 3 years after completing their studies.",
      "Affordable college diplomas and university degrees across Alberta, Ontario, British Columbia, and the Maritimes.",
      "Co-op and work-integrated programs help you gain Canadian work experience while still studying.",
    ],
    colleges: [
      "University of Toronto",
      "University of British Columbia",
      "Centennial College",
      "Seneca Polytechnic",
      "Conestoga College",
      "Humber College",
    ],
    work: [
      "Full-time study permit holders can work up to 24 hours per week off-campus during semesters.",
      "Campus jobs — library, student services, dining, research assistance — are widely available.",
      "Co-op placements, internships, and employer partnerships provide structured Canadian experience.",
      "Always check current IRCC rules before starting work, as permit conditions can change.",
    ],
    pathway: [
      "Academic and language profile review",
      "Province, program, and institution shortlisting",
      "Financial documentation and study plan preparation",
      "Offer letter, student permit, and pre-departure checklist",
    ],
    living:
      "Monthly living costs in Canada range from CAD 1,500 to 2,500 depending on city. Toronto and Vancouver are costlier; Winnipeg, Hamilton, and Halifax offer better value for students on tight budgets.",
  },
  {
    ...destinations[2],
    hero:
      "The United Kingdom offers some of the world's most prestigious degrees in compressed timeframes — a one-year master's is common, reducing both cost and time away from home.",
    whyStudy: [
      "Top universities in law, finance, public health, AI, and creative fields with globally recognized qualifications.",
      "The Graduate Route visa lets most international graduates stay and work in the UK for 2 years after graduation.",
      "Shorter course duration compared to other English-speaking countries means lower total tuition costs.",
    ],
    colleges: [
      "University of Manchester",
      "University of Birmingham",
      "University of Greenwich",
      "Coventry University",
      "University of Hertfordshire",
      "University of West London",
    ],
    work: [
      "Student visa holders can work up to 20 hours per week during term time and full-time during official holidays.",
      "Popular student jobs include retail, hospitality, campus work, care work, and tutoring.",
      "Placement years and internships are built into many UK undergraduate degrees — excellent for career building.",
      "Your counselor will help you balance part-time hours with attendance requirements and visa conditions.",
    ],
    pathway: [
      "Course and institution strategy based on your academic background",
      "SOP, academic transcript, and financial document preparation",
      "CAS letter and UK student visa application",
      "Accommodation search and arrival planning",
    ],
    living:
      "London is expensive — budget £1,200–1,800 per month. Other UK cities like Manchester, Birmingham, and Coventry are significantly more affordable at £900–1,300 per month.",
  },
  {
    ...destinations[3],
    hero:
      "The United States hosts the largest university system in the world, with exceptional options in STEM, research, business, and the arts. Competition is strong, but the right preparation makes a real difference.",
    whyStudy: [
      "Over 4,000 accredited universities, including some of the world's top-ranked research institutions.",
      "Strong scholarship opportunities through merit-based and institutional awards.",
      "OPT and STEM-OPT let qualifying graduates work in the US for 1–3 years after completing their degree.",
    ],
    colleges: [
      "Arizona State University",
      "University of Cincinnati",
      "University of South Florida",
      "Northeastern University",
      "Pace University",
      "Illinois Institute of Technology",
    ],
    work: [
      "F-1 visa holders can work on-campus up to 20 hours per week — dining halls, libraries, research labs, and admin offices.",
      "CPT (Curricular Practical Training) and OPT (Optional Practical Training) unlock off-campus opportunities.",
      "Career centers, networking events, and campus recruiting are essential tools for US job placement.",
      "Your counselor will help you understand SEVIS compliance, work authorization rules, and OPT applications.",
    ],
    pathway: [
      "Profile review, test score planning, and scholarship strategy",
      "University shortlist and application calendar management",
      "I-20, SEVIS fee, and F-1 visa interview preparation",
      "Interview coaching and pre-departure orientation",
    ],
    living:
      "Monthly living costs in the US vary widely — $1,200–2,500 depending on city and lifestyle. Early financial planning is essential, as US visa documentation requires clear proof of sufficient funds.",
  },
  {
    ...destinations[4],
    hero:
      "India is the most accessible international study destination for Nepali students — close to home, affordable, and offering strong programs in medicine, engineering, management, and pharmacy.",
    whyStudy: [
      "Geographic proximity makes travel simple and family connections easier to maintain.",
      "Wide range of affordable institutions across Bengaluru, Delhi, Pune, Chennai, and Hyderabad.",
      "MBBS, BDS, B.Pharma, BTech, and MBA programs with globally transferable degrees.",
    ],
    colleges: [
      "Christ University",
      "Manipal Academy of Higher Education",
      "SRM Institute of Science and Technology",
      "Lovely Professional University",
      "Amity University",
      "KIIT University",
    ],
    work: [
      "Part-time employment opportunities exist in tutoring, content creation, retail, and campus roles.",
      "Internships and industry projects are commonly built into Indian engineering and business programs.",
      "IT, design, digital marketing, and freelance work can help students build portfolios and extra income.",
      "Check your institution's rules and Indian visa conditions before taking paid work.",
    ],
    pathway: [
      "Course, city, and institution selection",
      "Admission eligibility and entrance requirement review",
      "Application, admission letter, and document submission",
      "Travel, hostel arrangement, and enrollment support",
    ],
    living:
      "India is the most cost-effective option for Nepali students. Monthly living expenses range from NPR 25,000–50,000 depending on city, hostel, and lifestyle. Always check the institution's placement record and hospital affiliation before enrolling.",
  },
  {
    ...destinations[5],
    hero:
      "Bangladesh is a strong regional option for Nepali students, particularly those pursuing MBBS, dental, or pharmacy degrees. Cultural and geographic proximity make the transition smoother.",
    whyStudy: [
      "Highly popular among Nepali students for MBBS and BDS — recognized by Nepal Medical Council.",
      "Affordable tuition and living costs compared to most other international destinations.",
      "Regional familiarity, shared food culture, and easy travel reduce adjustment challenges.",
    ],
    colleges: [
      "Dhaka Medical College",
      "Bangladesh Medical College",
      "Jahurul Islam Medical College",
      "Kumudini Women's Medical College",
      "Community Based Medical College",
      "East West Medical College",
    ],
    work: [
      "Medical and dental students should prioritize clinical training, hospital rounds, and licensing preparation.",
      "Paid work is limited for international students — financial planning before enrollment is critical.",
      "Tutoring, student representative roles, and campus volunteering may be available.",
      "Confirm college recognition with Nepal Medical Council and NMC licensing conditions before applying.",
    ],
    pathway: [
      "Eligibility check and academic background review",
      "NMC-recognized college shortlist and seat availability",
      "Application, admission letter, and document preparation",
      "Travel, hostel arrangements, and enrollment support",
    ],
    living:
      "Monthly costs in Bangladesh are among the lowest of any international destination — typically BDT 25,000–40,000 per month. Verify college hospital affiliation, accommodation quality, and NMC recognition status before committing.",
  },
];

export function getDestinationDetail(slug: string) {
  return destinationDetails.find((destination) => destination.slug === slug);
}

export const stats: Stat[] = [
  { value: 98, suffix: "%", label: "visa advisory success rate" },
  { value: 50, suffix: "+", label: "partner universities globally" },
  { value: 7, suffix: "", label: "study destinations covered" },
  { value: 2000, suffix: "+", label: "students successfully guided" },
];

export const services: Service[] = [
  {
    title: "Career & Course Counseling",
    description:
      "One-to-one sessions where we understand your academic background, career goals, and family situation before recommending any destination or course.",
    icon: Radar,
  },
  {
    title: "University Shortlisting",
    description:
      "We build a personalized list of universities and colleges that match your grades, budget, English scores, and post-study goals.",
    icon: GraduationCap,
  },
  {
    title: "Application & Documentation",
    description:
      "We prepare and submit your applications with complete document checklists, deadline tracking, and follow-up with universities on your behalf.",
    icon: FileSearch,
  },
  {
    title: "Visa Guidance & Interview Prep",
    description:
      "Country-specific visa filing support, evidence review, mock visa interviews, and GTE/SOP coaching to strengthen your application.",
    icon: BadgeCheck,
  },
  {
    title: "Scholarship Assistance",
    description:
      "We identify merit-based, need-based, and institution-specific scholarships that match your academic profile and destination.",
    icon: Sparkles,
  },
  {
    title: "Pre-Departure & Arrival Support",
    description:
      "Accommodation search, travel insurance, bank account guidance, travel booking tips, and a full pre-departure briefing before you fly.",
    icon: PlaneTakeoff,
  },
  {
    title: "SOP & Essay Writing Support",
    description:
      "We help you write a compelling Statement of Purpose that honestly represents your background, goals, and reasons for choosing your destination.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Financial Planning Guidance",
    description:
      "We help you understand total costs — tuition, living, insurance, travel — and structure your sponsor documents and bank statements correctly.",
    icon: Landmark,
  },
  {
    title: "IELTS & PTE Classes",
    description:
      "Structured preparation classes for IELTS and PTE with mock tests, writing feedback, speaking practice, and score improvement planning.",
    icon: GraduationCap,
  },
  {
    title: "Family Consultation",
    description:
      "We involve parents and guardians in key decisions — cost planning, destination safety, career outcomes, and timeline — so no one is left in the dark.",
    icon: Radar,
  },
  {
    title: "Post-Arrival Check-Ins",
    description:
      "We stay in touch after you land — helping with enrollment queries, early settling-in questions, and connecting you with other Nepali students abroad.",
    icon: BadgeCheck,
  },
  {
    title: "Gap & Background Explanation",
    description:
      "We help students with academic gaps, lower grades, or unusual backgrounds build honest, credible applications that still get results.",
    icon: FileSearch,
  },
];

export const timeline: TimelineStep[] = [
  {
    phase: "01",
    title: "Free Counseling Session",
    description:
      "We begin with a detailed one-to-one consultation to understand your academic background, target destination, budget, timeline, and career goals. No charges, no pressure.",
  },
  {
    phase: "02",
    title: "Your Personalized Study Plan",
    description:
      "Based on your profile, we build a complete study plan — country, university shortlist, program options, language test target, and a clear financial estimate.",
  },
  {
    phase: "03",
    title: "Application & Document Preparation",
    description:
      "We prepare every document in your file — SOP, academic transcripts, financial proof, reference letters — and submit your applications before deadlines.",
  },
  {
    phase: "04",
    title: "Visa Application & Interview",
    description:
      "Your visa file is reviewed, refined, and rehearsed. We coach you for mock visa interviews, review your GTE, and handle every country-specific requirement.",
  },
  {
    phase: "05",
    title: "Pre-Departure & Beyond",
    description:
      "Once your visa is granted, we brief you on arrival, accommodation, local transport, enrollment, and banking — so your first week abroad is calm and prepared.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Shrestha",
    destination: "Melbourne, Australia",
    quote:
      "I had no idea which country to choose. The counselors at Vanguard took time to understand my budget, my grades, and what I actually wanted. Within three sessions, I had a clear plan. Got my Australian visa approved on the first attempt.",
    result: "Deakin University — Bachelor of IT",
  },
  {
    name: "Suhana Karki",
    destination: "Toronto, Canada",
    quote:
      "My SOP was weak and my finances weren't documented properly. Vanguard helped me fix both. They were honest about what needed improvement rather than just saying what I wanted to hear. I got my study permit within 8 weeks.",
    result: "Centennial College — Health Informatics",
  },
  {
    name: "Nimesh Rai",
    destination: "London, United Kingdom",
    quote:
      "I was rejected once before coming to Vanguard. They reviewed my old file, found the gaps, and rebuilt everything from scratch. The new visa application was approved without any issues. I really owe this to their visa team.",
    result: "University of Greenwich — MSc Finance",
  },
  {
    name: "Prakriti Lama",
    destination: "Bengaluru, India",
    quote:
      "Getting into medical college from Nepal requires a lot of coordination. Vanguard managed everything — NMC eligibility check, college shortlisting, application, admission letter, and travel. My parents finally felt at ease.",
    result: "Rajiv Gandhi University of Health Sciences",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Australia vs Canada: Which is Right for Nepali Students in 2026?",
    category: "Destination Guide",
    readTime: "6 min",
    excerpt:
      "A practical side-by-side comparison of tuition costs, visa processing, work rights, post-study options, and real outcomes for students from Nepal.",
  },
  {
    title: "How to Write an SOP That Actually Gets Approved",
    category: "Visa & Documents",
    readTime: "5 min",
    excerpt:
      "Most SOPs fail because they sound like templates. Here is what visa officers and admissions teams actually need to see — and how to write it honestly.",
  },
  {
    title: "IELTS vs PTE: Which Test Should You Choose?",
    category: "Test Preparation",
    readTime: "4 min",
    excerpt:
      "Both tests are accepted by most universities. But your learning style, timeline, and target score all affect which exam gives you the best chance of success.",
  },
];

export const universities: UniversityProfile[] = [
  {
    name: "University of Sydney",
    country: "Australia",
    ranking: "Top 20 Global (QS 2025)",
    tuition: "AUD 38,000–52,000/yr",
    intake: "February / July",
    requirements: "IELTS 6.5+, academic transcripts, SOP, references",
  },
  {
    name: "Centennial College",
    country: "Canada",
    ranking: "Leading Ontario College",
    tuition: "CAD 18,000–24,000/yr",
    intake: "January / May / September",
    requirements: "IELTS 6.0+, financial documents, study permit (PAL)",
  },
  {
    name: "University of Greenwich",
    country: "United Kingdom",
    ranking: "Top Modern University — UK",
    tuition: "GBP 15,000–19,000/yr",
    intake: "January / September",
    requirements: "IELTS 6.0+, CAS documents, SOP, academic records",
  },
  {
    name: "Deakin University",
    country: "Australia",
    ranking: "Top 1% Globally (QS 2025)",
    tuition: "AUD 32,000–48,000/yr",
    intake: "February / July / November",
    requirements: "IELTS 6.0+, academic transcripts, GTE statement",
  },
  {
    name: "Conestoga College",
    country: "Canada",
    ranking: "Top Polytechnic — Canada",
    tuition: "CAD 16,000–22,000/yr",
    intake: "January / May / September",
    requirements: "IELTS 6.0+, financial proof, study permit",
  },
  {
    name: "Coventry University",
    country: "United Kingdom",
    ranking: "Top 10 — UK Modern University",
    tuition: "GBP 14,500–18,500/yr",
    intake: "January / September",
    requirements: "IELTS 6.0+, academic records, personal statement",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Visa & Offer Letter Celebrations",
    description: "Students receiving their offer letters and visa approvals — celebrated with their families at our Kathmandu office.",
    image: "/counselling-people.svg",
    photos: ["/counselling-people.svg", "/poster.jpeg", "/logo.png"],
    items: "48",
    format: "Photos",
  },
  {
    title: "Counseling Sessions",
    description: "One-to-one counseling, document review sessions, and family consultations happening at Vanguard every week.",
    image: "/counselling-people.svg",
    photos: ["/counselling-people.svg", "/poster.jpeg", "/logo.png"],
    items: "24",
    format: "Photos",
  },
  {
    title: "Information Sessions & Seminars",
    description: "University education fairs, destination webinars, IELTS orientation sessions, and student departure events.",
    image: "/counselling-people.svg",
    photos: ["/counselling-people.svg", "/poster.jpeg", "/logo.png"],
    items: "16",
    format: "Photos & Videos",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Anisha KC",
    role: "Senior Education Counselor",
    focus: "Specialist in Canada and UK pathways, scholarship planning, and SOP strategy for postgraduate applicants.",
    initials: "AK",
    social: "LinkedIn · Facebook",
    status: "Active",
  },
  {
    name: "Prabin Rai",
    role: "Visa Documentation Lead",
    focus: "Handles Australia and USA visa files, GTE statements, financial evidence, and mock visa interview preparation.",
    initials: "PR",
    social: "LinkedIn",
    status: "Active",
  },
  {
    name: "Mira Shrestha",
    role: "Student Relations Coordinator",
    focus: "Manages student schedules, follow-up communications, office appointments, and pre-departure checklists.",
    initials: "MS",
    social: "Facebook · Instagram",
    status: "Active",
  },
];

export const websiteSettings: WebsiteSettings = {
  logo: "/logo.png",
  favicon: "/favicon.ico",
  contactPhone: "+977 9705387380",
  contactEmail: "vanguardnepal@gmail.com",
  officeAddress: "Bagbazar, Opposite Padma Kanya College, Sallyan House, 2nd Floor",
  officeHours: "Sunday to Friday, 9:00 AM to 6:00 PM",
  socialMediaLinks: "Facebook, Instagram, LinkedIn, TikTok",
  emailSender: "Vanguard Consulting Admissions",
  emailReplyTo: "vanguardnepal@gmail.com",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3!2d85.317!3d27.705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzE4LjAiTiA4NcKwMTknMDIuMCJF!5e0!3m2!1sen!2snp!4v1",
};

export const navItems = [
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Universities", href: "/#universities" },
  { label: "Services", href: "/#services" },
  { label: "Test Prep", href: "/#test-prep" },
  { label: "Blog", href: "/blog" },
  { label: "Stories", href: "/#stories" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export const footerLinks = [
  { label: "Bagbazar, Kathmandu", icon: Landmark },
  { label: "Career Guidance", icon: BriefcaseBusiness },
  { label: "Visa Advisory", icon: BadgeCheck },
];

export const pageSections: PageSectionContent = {
  heroEyebrow: "Kathmandu's Trusted Study Abroad Consultancy",
  heroTitle: "Your journey to",
  heroHighlight: "global education starts here.",
  heroDescription:
    "Vanguard Consulting has helped over 2,000 Nepali students find the right university, prepare strong applications, and secure their visas — with honest, one-to-one guidance at every step.",
  heroPrimaryCta: "Book Free Counseling",
  heroSecondaryCta: "Explore Destinations",
  heroBadgeOne: "Admission & visa guidance since 2015",
  heroBadgeTwo: "Australia · Canada · UK · USA · India · Bangladesh",
  heroImage: "/poster.jpeg",

  whyEyebrow: "Why Students Trust Us",
  whyTitle: "Why Nepali Students Choose Vanguard",
  whyHighlight: "Choose Vanguard",
  whyDescription:
    "We do not send students abroad blindly. Every student gets a dedicated counselor, an honest assessment, and a complete plan — from the first session to the day they land.",
  whyPoints: [
    "Dedicated counselor for every student",
    "Visa-ready documentation",
    "Scholarship-focused planning",
    "Honest, no-pressure counseling",
  ],
  whyReasons: [
    {
      title: "Personalized Counseling",
      description: "Every student gets a dedicated counselor who understands their goals, budget, and academic background before recommending anything.",
      icon: "UsersRound",
      accent: "#087ec3",
      order: "1",
    },
    {
      title: "Strong Visa Success Rate",
      description: "Our visa file preparation and mock interview coaching have helped hundreds of students get approved on their first application.",
      icon: "BadgeCheck",
      accent: "#ed1c24",
      stat: "98%",
      order: "2",
    },
    {
      title: "Right University Match",
      description: "We shortlist universities based on your actual grades, English scores, budget, and career plan — not commission incentives.",
      icon: "GraduationCap",
      accent: "#087ec3",
      order: "3",
    },
    {
      title: "Complete Document Support",
      description: "SOP writing, financial documentation, transcripts, reference letters — we prepare and review every document in your file.",
      icon: "FileCheck2",
      accent: "#f75b20",
      order: "4",
    },
    {
      title: "Scholarship Guidance",
      description: "We actively identify merit-based and institutional scholarships that can reduce your total cost of study abroad.",
      icon: "HandCoins",
      accent: "#ed1c24",
      order: "5",
    },
    {
      title: "Support Until You Land",
      description: "We stay with you from your first counseling session all the way to pre-departure and your first week abroad.",
      icon: "Headphones",
      accent: "#087ec3",
      order: "6",
    },
  ],

  personalEyebrow: "Our Approach",
  personalTitle: "Honest counseling before every major decision.",
  personalDescription:
    "We listen first. Before recommending any country, university, or course, we understand your grades, your family's financial situation, your career goals, and your timeline. Only then do we build your plan.",

  journeyEyebrow: "Our Process",
  journeyTitle: "How We Take You from Here to There",
  journeyDescription: "A clear, step-by-step journey — from your first session to your first day on campus.",
  journeySteps: [
    {
      title: "Free Counseling",
      description: "Understand your goals and build the right study abroad plan for your profile.",
      icon: "UsersRound",
      accent: "#087ec3",
    },
    {
      title: "University Selection",
      description: "Shortlist universities that genuinely match your grades, budget, and career.",
      icon: "Search",
      accent: "#087ec3",
    },
    {
      title: "Applications & Docs",
      description: "Complete applications, SOP, transcripts, and document preparation.",
      icon: "FileCheck2",
      accent: "#f75b20",
    },
    {
      title: "Visa Processing",
      description: "Visa file preparation, mock interviews, and GTE/SOP coaching.",
      icon: "BadgeCheck",
      accent: "#ed1c24",
    },
    {
      title: "Pre-Departure",
      description: "Accommodation, banking, travel, insurance, and arrival orientation.",
      icon: "PlaneTakeoff",
      accent: "#f75b20",
    },
  ],
  journeyCtaTitle: "Ready to take the first step?",
  journeyCtaDescription: "Book a free counseling session with a Vanguard advisor — no charges, no obligations.",
  journeyCtaLabel: "Book Free Session",

  servicesEyebrow: "What We Do",
  servicesTitle: "Everything you need, clearly handled.",
  servicesDescription:
    "From your first counseling session to your arrival abroad, Vanguard provides complete support so students and families are never left guessing about the next step.",
  servicesCtaEyebrow: "Need More Help?",
  servicesCtaTitle: "Have a situation that does not fit the standard process?",
  servicesCtaDescription:
    "We also help students with academic gaps, lower grades, previous visa refusals, unusual study backgrounds, and families with complex financial documentation. Talk to us honestly — we have seen it all.",
  servicesCtaLabel: "Talk to a Counselor",

  testPrepEyebrow: "Language Classes",
  testPrepTitle: "IELTS and PTE classes designed around your target score.",
  testPrepDescription:
    "Vanguard runs structured IELTS and PTE preparation classes at our Kathmandu office. Small batch sizes, experienced trainers, regular mock tests, and individual score planning — so your language result supports your visa and admission.",
  testPrepCtaLabel: "Enquire About Classes",
  testPrepClasses: [
    {
      title: "IELTS Preparation",
      description:
        "Focused practice across all four bands — Reading, Writing, Listening, and Speaking — with real exam conditions and weekly performance tracking.",
      detail: "Weekly mock tests · Writing feedback sessions · Speaking practice with trainers · Band-target planning",
      icon: "BookOpen",
    },
    {
      title: "PTE Academic Preparation",
      description:
        "Computer-based practice sessions built around PTE's unique question types, AI scoring logic, and time management under exam conditions.",
      detail: "Question-type drills · Scoring strategy coaching · Timed practice sets · Performance review and feedback",
      icon: "Headphones",
    },
  ],

  destinationsEyebrow: "Study Destinations",
  destinationsTitle: "Seven countries. One team that knows all of them.",
  destinationsDescription:
    "Each destination has a different visa process, admission timeline, financial requirement, and post-study pathway. We help you choose the right one for your specific situation — not the most popular one.",

  universitiesEyebrow: "Partner Universities",
  universitiesTitle: "Shortlists built on fit, not assumptions.",
  universitiesDescription:
    "We work with partner universities across Australia, Canada, UK, USA, India, and Bangladesh. The institutions you see here represent a starting point — your actual shortlist will be customized based on your grades, budget, English scores, and career target.",
  universitiesNote:
    "University options change by intake season, scholarship availability, and visa conditions. Your Vanguard counselor will refine this list with you during your counseling session.",

  processEyebrow: "Our Process",
  processTitle: "From your first call to your first campus morning.",
  processDescription:
    "Every step in our process is tracked, documented, and communicated clearly. You will always know what is happening with your file and what comes next.",

  applicationEyebrow: "Applications",
  applicationTitle: "A transparent application journey from first file to final decision.",
  applicationDescription:
    "Every active student file at Vanguard has a responsible counselor, a clear document checklist, visible milestones, and regular updates. You and your family are kept informed at every stage.",
  applicationCtaLabel: "Start an Application",
  applicationSteps: [
    {
      title: "Document Collection",
      description:
        "Academic records, identity documents, financial statements, SOP drafts, and reference letters — all organized into a complete checklist.",
      icon: "FileUp",
    },
    {
      title: "Application Status Updates",
      description:
        "Your file moves through clear stages: counseling, applied, offer received, visa stage, and completion. No ambiguity.",
      icon: "ClipboardCheck",
    },
    {
      title: "Dedicated Counselor",
      description: "Every student has one dedicated counselor who owns your file, tracks every milestone, and is reachable throughout.",
      icon: "UserRoundCheck",
    },
    {
      title: "Notes & Communication History",
      description:
        "Important decisions, document updates, and call notes are kept on record so you never lose context between sessions.",
      icon: "History",
    },
  ],

  testimonialsEyebrow: "Student Stories",
  testimonialsTitle: "Real students. Real journeys. Real results.",
  testimonialsDescription:
    "These are not marketing quotes. These are students who came to us with questions, doubts, or previous rejections — and left with approved visas and a clear path forward.",

  blogEyebrow: "Student Resources",
  blogTitle: "Practical guides for smarter study abroad decisions.",
  blogDescription:
    "Destination comparisons, visa tips, SOP guidance, and test preparation advice — written for Nepali students who want clear answers, not vague advice.",
  blogFeatureTitle: "2026 Admission Cycle: What Has Changed",
  blogFeatureDescription:
    "Visa processing times have increased, financial documentation is under stricter review, and some popular college programs have changed intake schedules. Here is what Nepali students need to know before applying.",

  galleryEyebrow: "Gallery",
  galleryTitle: "Moments from our students' journeys.",
  galleryDescription:
    "From visa approvals to departure days — these are real moments from students and families who trusted Vanguard with one of the most important decisions of their lives.",

  teamEyebrow: "Our Team",
  teamTitle: "Counselors who stay with you through the entire process.",
  teamDescription:
    "Every member of our team has worked directly with students navigating the real challenges of studying abroad — complex finances, academic gaps, tight timelines, and nervous families. We know what it takes.",

  contactEyebrow: "Get in Touch",
  contactTitle: "Book your free counseling session today.",
  contactDescription:
    "Fill in your details below and tell us which destination you are interested in. A Vanguard counselor will confirm your booking and reach out to set up your first session — at our Kathmandu office or online.",
  contactDestinationSummary: "Australia · Canada · UK · USA · India · Bangladesh · Europe",

  footerBrand: "Vanguard Consulting",
  footerDescription:
    "Kathmandu's trusted study abroad consultancy — helping Nepali students find the right university, build strong applications, and secure their visas since 2015.",
  footerCopyright: "2026 Vanguard Consulting. All rights reserved.",
  footerTagline: "Bagbazar, Kathmandu · Nepal",
};

export const defaultSiteContent: SiteContent = {
  destinationDetails,
  services: services.map((service, index) => ({
    title: service.title,
    description: service.description,
    status: "Active",
    featured: index < 2,
  })),
  timeline,
  testimonials,
  blogPosts,
  universities,
  galleryItems,
  teamMembers,
  websiteSettings,
  pageSections,
};
