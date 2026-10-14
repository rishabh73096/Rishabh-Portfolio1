import { LayoutDashboardIcon, UsersIcon } from "lucide-react";

export const DATA = {

  name: "Rishabh Tiwari",
  initials: "RT",
  url: "https://rishabh-portfolio1-ten.vercel.app",
  location: "Delhi, India",
  locationLink: "https://www.google.com/maps/place/Delhi",
  description:
    "Full Stack Developer specializing in scalable SaaS platforms and real-time systems. Expert in MERN stack, PostgreSQL, Docker, CI/CD, and test-driven development. Delivered 9 production applications serving 300+ users with high-reliability architecture.",
  summary:
    "Full Stack Developer with 2+ years of experience building scalable SaaS platforms and production-ready web applications. Strong technical foundation in MERN stack with growing proficiency in PostgreSQL, Docker, and CI/CD pipelines. Delivered 9 live applications serving 300+ users, processing 100+ transactions reliably. Core competencies: Next.js, React.js, Node.js, Express.js, MongoDB, PostgreSQL, JWT authentication, role-based access control, Stripe/Postmark integrations, and test-driven development. Passionate about clean architecture, performance optimization, and shipping high-quality features in agile environments.",

  avatarUrl: "/me.jpeg",
  resumeLink: "https://drive.google.com/file/d/1hFz-PKViLS-nFVTR4PdOKxk6xgCIaPcK/view?usp=sharing",

  skills: [
    // Frontend
    "React.js 18",
    "Next.js (SSR/SSG/App Router)",
    "TypeScript",
    "JavaScript (ES6+)",
    "Redux Toolkit",
    "Tailwind CSS",
    "HTML5 & CSS3",
    "Responsive Design",
    "Web Accessibility",

    // Backend
    "Node.js",
    "Express.js",
    "REST API Design",
    "JWT Authentication",
    "Role-Based Access Control (RBAC)",
    "API Documentation (Swagger/OpenAPI)",

    // Database & Caching
    "MongoDB (Mongoose)",
    "MySQL",
    "PostgreSQL",
    "Redis (Caching & Sessions)",
    "Database Optimization",
    "Query Performance Analysis",

    // Testing (NEW)
    "Jest (Unit Testing)",
    "React Testing Library",
    "API Testing",
    "Test-Driven Development (TDD)",

    // DevOps & Cloud
    "Docker & Containerization",
    "GitHub Actions (CI/CD)",
    "AWS (S3, EC2, RDS)",
    "Vercel Deployment",
    "Environment Management",

    // Payment & Email
    "Stripe Integration",
    "Postmark Email Service",

    // Tools & Practices
    "Git & GitHub",
    "Agile/Scrum",
    "Clean Architecture",
    "Code Review & Collaboration",
    "VS Code",
    "Figma",
  ],

  navbar: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
  ],

  contact: {
    email: "rishabhtiwari73096@gmail.com",
    tel: "+917309651657",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rishabh73096",
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rishabhtiwari73/",
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:rishabhtiwari73096@gmail.com",
        navbar: true,
      },
      X: { name: "X", url: "https://x.com/Rishabh__73", navbar: true },
    },
  },

  work: [
    {
      company: "2DigitInnovations Pvt. Ltd.",
      href: "https://2digitinnovations.com",
      badges: ["Full Stack", "SaaS", "Production"],
      location: "Remote, India",
      title: "Full Stack Developer (MERN)",
      logoUrl: "/2digit.png",
      start: "Sep 2024",
      end: "Present",
      description:
        "Built and deployed 9 production-ready full-stack applications serving 300+ active users. Key achievement: Clee SaaS platform — architected 3-tier system (admin dashboard, customer marketplace, REST API) with JWT auth, multi-tenant RBAC, Stripe payments, Postmark email infrastructure, processing 100+ transactions reliably. Additional projects: Forma Construction (200+ users, 50+ projects), Grocery e-commerce (real-time inventory), My Lodge rental platform (real-time availability). Technical impact: Optimized page load times 40% through lazy loading, code splitting, MongoDB indexing. Implemented Redis caching strategies. Used Stripe for secure payment processing. Shipped features in 2-week sprints using Git + GitHub. Collaborated with cross-functional teams (designers, PMs, stakeholders) across full product lifecycle.",
    },
  ],

  education: [
    {
      school: "Babu Banarasi Das University, Lucknow",
      href: "#",
      degree: "Master of Computer Applications (MCA) | CGPA: 8.9 / 10",
      logoUrl: "/bbdu.png",
      start: "2022",
      end: "2024",
    },
    {
      school: "Prof. Rajendra Singh Rajju Bhaiya University, Prayagraj",
      href: "#",
      degree: "Bachelor of Computer Applications (BCA) | Aggregate: 75.47%",
      logoUrl: "/prsu.png",
      start: "2019",
      end: "2022",
    },
  ],

  projects: [
    {
      title: "Grocery Pickup Store",
      href: "https://www.bachhoahouston.com/",
      dates: "Sep 2024 - Oct 2024",
      active: false,
      shortDescription:
        "E-commerce platform processing live customer orders. Challenge: inventory consistency across cart/checkout (prevent overselling). Solution: Optimistic updates + server validation + Redis stock cache. Achieved 99.2% transaction success rate.",
      description:
        "Built full-featured e-commerce platform for live grocery operations. Key technical challenge: inventory consistency — prevent customers from purchasing out-of-stock items when multiple users add items simultaneously. Solution: Redux Optimistic Updates on frontend (immediate cart feedback), server-side validation at checkout (query MongoDB, check actual stock), Redis cache for frequent items (sub-100ms stock lookups). Implemented cart persistence using browser localStorage + server backup in MongoDB. Wishlist feature with sorting/filtering across 500+ products. Admin dashboard: real-time inventory updates, order management, user analytics. Payment flow: secure payment gateway integration with order confirmation webhooks. Complex checkout: pickup location selection, time-slot reservation, payment processing, email confirmation. Performance: Lazy-loaded product images with Next.js Image component, reducing initial page load 3.2s → 890ms. Deployed live on Vercel with automatic SSL, CDN caching.",
      technologies: [
        "Next.js 14 (App Router)",
        "React.js 18",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis (Inventory cache)",
        "Stripe/Payment Gateway",
        "Tailwind CSS",
        "REST APIs",
        "Vercel",
      ],
      links: [],
      image: "/images/grocery-pickup-store.png",
      video: "",
    },
    {
      title: "Forma Construction",
      href: "https://forma-web-seven.vercel.app/",
      dates: "Nov 2024 - Dec 2024",
      active: false,
      shortDescription:
        "B2B construction platform serving 200+ users across 50+ active projects. Challenge: hierarchical RBAC (Admin > Organization Manager > Project Lead > Member) with document-level permissions. Reduced list API response time from 2.1s → 280ms via aggregation pipeline.",
      description:
        "Built production-ready construction platform serving 10+ organizations, 200+ users managing 50+ concurrent projects. Complex feature: hierarchical role-based access control (Admin → Org Manager → Project Lead → Member) with document-level permissions, enforced at API middleware + database query level. Architecture: Express middleware validates JWT + role, queries filtered by (userId, role, projectId) triplet. Implemented document management system with S3 storage, generating signed URLs for secure access. Payment system: Processing 100+ monthly plan upgrades via payment gateway with webhook-based confirmation for async processing. Performance optimization: Replaced N+1 document queries with MongoDB aggregation pipelines, reduced API response time 2100ms → 280ms. Built team collaboration features: real-time project updates, comment threads, status tracking. Deployed with automated backup strategy for document recovery.",
      technologies: [
        "Next.js 14",
        "React.js 18",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT Auth",
        "AWS S3",
        "Payment Gateway",
        "Tailwind CSS",
        "REST APIs",
      ],
      links: [],
      image: "/images/forma.png",
      video: "",
    },
    {
      title: "My Lodge",
      href: "https://www.mylodge.cloud/",
      dates: "Dec 2024 - Jan 2025",
      active: false,
      shortDescription:
        "Rental marketplace with dual-user experience (guests/hosts). Challenge: real-time booking availability across distributed system. Solution: Calendar bitmap algorithm + MongoDB TTL indexes for efficient date range queries. Supporting 50+ properties with 99.5% uptime.",
      description:
        "Built production rental marketplace connecting 50+ property hosts with guest users. Key technical challenge: real-time availability tracking across date ranges — efficiently determining which properties are available for a given date range when handling concurrent bookings. Solution: Calendar bitmap storage (32-bit integers representing month availability) + MongoDB TTL indexes for automatic cleanup of past bookings. Dual dashboard architecture: Guest dashboard with advanced search filters (price range, amenities, ratings), booking history, saved favorites; Host dashboard with calendar blocking, pricing management, guest communication. Booking flow: Guest selects dates → real-time price calculation → secure payment → confirmation email. Payment confirmation via webhook updates booking status. Reviews system with rating aggregation (Lighthouse-style scoring). Mobile-optimized responsive design with touch-friendly date picker. Deployed on custom domain with automatic backups.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Auth",
        "Tailwind CSS",
        "REST APIs",
        "Calendar algorithms",
      ],
      links: [],
      image: "/images/my-lodge-rental-platform.png",
      video: "",
    },
    {
      title: "Hariir - Job Portal",
      href: "https://hariir-web.vercel.app/",
      dates: "Jan 2025 - Feb 2025",
      active: false,
      shortDescription:
        "Professional social platform connecting job seekers, companies, and recruiters. Features profile management, job listings, company profiles, and networking capabilities. Built with role-based access control for seamless job discovery and hiring workflows with secure authentication.",
      description:
        "A professional social platform connecting job seekers, companies, and recruiters. Features include profile management, job listings, company profiles, and networking capabilities. Built with role-based access control for seamless job discovery and hiring workflows.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
      ],
      links: [],
      image: "/images/hariir-job-portal.png",
      video: "",
    },
    {
      title: "Double Bay Website",
      href: "https://double-bay-website.vercel.app/",
      dates: "Feb 2025 - Mar 2025",
      active: false,
      shortDescription:
        "E-commerce platform for beauty products and salon services with integrated Stripe payments. Implemented JWT authentication, role-based access control, and real-time service booking system for seamless customer experience.",
      description:
        "Built comprehensive e-commerce platform for beauty products and professional salon services. Integrated Stripe payment gateway for secure transactions and implemented JWT-based authentication with role-based access control. Features include service booking, product catalog, customer reviews, and admin dashboard for service and inventory management.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Stripe",
        "JWT Authentication",
      ],
      links: [],
      image: "/images/doulebay.png",
      video: "",
    },
    {
      title: "Canada Halal Website",
      href: "https://caneda-halal-register.vercel.app/",
      dates: "Mar 2025 - Apr 2025",
      active: false,
      shortDescription:
        "Specialized halal product registration and management platform for Canadian market. Built with secure user authentication and role-based access for vendors, certifiers, and consumers.",
      description:
        "Developed dedicated platform for halal product registration and certification in the Canadian market. Features vendor management, product verification workflows, certification tracking, and consumer lookup system. Implemented secure authentication, document management, and audit trails for compliance and transparency.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],
      links: [],
      image: "/images/CHMP.png",
      video: "",
    },
    {
      title: "Alagare - Bus Booking Landing Page",
      href: "https://alagare-landingpage.vercel.app/",
      dates: "Apr 2025 - May 2025",
      active: false,
      shortDescription:
        "Professional landing page for bus booking service with integrated reservation system. Features responsive design, service showcase, and direct booking integration.",
      description:
        "Created high-converting landing page for Alagare bus booking service. Showcases available routes, pricing, and booking features with responsive design optimized for mobile users. Integrated booking system and customer testimonials to drive conversions.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
      links: [],
      image: "/images/busbooking.png",
      video: "",
    },
    {
      title: "Bok A Korning - Booking Platform Landing",
      href: "https://www.bokakorning.online/",
      dates: "May 2025 - Jun 2025",
      active: false,
      shortDescription:
        "Professional booking platform landing page with service discovery and instant reservation capabilities. Optimized for user engagement and conversion with modern design.",
      description:
        "Built responsive landing page for Bok A Korning booking platform. Features service categorization, real-time availability display, seamless booking flow, and customer testimonials. Optimized for performance and mobile experience to maximize conversion rates.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
      links: [],
      image: "/images/boakkorning.png",
      video: "",
    },
    {
      title: "Clee — Full-Stack SaaS Platform for Beauty & Wellness Businesses",
      href: "https://cleverclee-for-consumer.vercel.app/",
      dates: "Apr 2026 - Present",
      active: true,
      shortDescription:
        "Multi-tenant SaaS platform for beauty/wellness businesses, shipped as 3 live surfaces — consumer website, customer booking app, and admin dashboard. Technical challenge: managing concurrent booking updates across 4+ role types with real-time state sync. Solution: Redis-backed slot locking + Redux optimistic updates. Processing 100+ monthly transactions with 99.8% reliability.",
      description:
        "Architected 3-tier SaaS platform from scratch, deployed as three separate live applications: a consumer-facing website, a customer booking app, and an admin dashboard, all backed by one REST API. Key technical decisions: Multi-tenant architecture using tenant ID isolation in MongoDB queries; Redis distributed locks for concurrent booking slot management (prevents overbooking); Redux state management with async thunks for real-time cart/booking synchronization. Built dynamic loyalty rewards engine with React formula builder UI allowing merchants to create fixed/percentage discounts with live preview. Implemented Postmark email infrastructure with templated transactional emails + marketing automation flows. Payment flow: Stripe payment intent + confirmation, Redux state management, Express async handlers for idempotent transactions. Database optimization: compound indexes on (tenantId, businessId, dateRange) for slot queries, reducing query time from 850ms → 120ms. Shipped 15+ business modules: real-time slot availability, staff scheduling (timesheets/leave), gift vouchers, promo codes, analytics dashboards. Reliably processing 100+ monthly transactions with 0 double-charges.",
      technologies: [
        "Next.js (App Router)",
        "React.js",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis (Distributed locks)",
        "Stripe API",
        "Postmark",
        "Tailwind CSS",
        "JWT",
        "Mongoose",
      ],
      links: [
        {
          icon: <UsersIcon className="size-3" />,
          type: "Booking App",
          href: "https://clee-booking-web.vercel.app/",
        },
        {
          icon: <LayoutDashboardIcon className="size-3" />,
          type: "Admin Panel",
          href: "https://clee-web-5k71.vercel.app/",
        },
      ],
      image: "/images/Clee.png",
      video: "",
    },
    {
      title: "Tobaline — Sustainable Luxury Fashion E-Commerce",
      href: "https://www.tobaline.com/",
      dates: "Jun 2026 - Aug 2026",
      active: false,
      shortDescription:
        "Multi-language (AR/EN) e-commerce platform for a sustainable silk & textile brand. Statically-exported Next.js storefront with collection browsing, cart, and order history, built for a Middle-East-facing audience with full RTL-ready localization.",
      description:
        "Built a statically-exported Next.js storefront for Tobaline, a sustainable luxury textile brand centered on ethically-sourced, chemical-free certified silk. Implemented a responsive, mobile-first shop with category-driven collection navigation (Shop/Collection mega-menus), cart and account icons in the header, and dedicated informational routes (About, Sustainability, FAQ, Shipping, Returns & Exchanges, Terms). Added AR/EN language switching in the header to serve a bilingual Middle-East audience, keeping copy and layout localization-ready. Optimized all product and hero imagery with next/image responsive srcSets for fast first paint on mobile. Structured the site as a static export (SSG) for cheap, fast hosting while keeping order-history and account routes (My Order, History) ready to wire into a backend API. Styled entirely with Tailwind CSS utility classes and Lucide icons for a clean, editorial, luxury-brand aesthetic.",
      technologies: [
        "Next.js (Static Export)",
        "React.js",
        "Tailwind CSS",
        "Lucide Icons",
        "i18n (AR/EN)",
        "Responsive Design",
        "next/image Optimization",
      ],
      links: [],
      image: "/images/tobaline.png",
      video: "",
    },
    {
      title: "LeadRescue AI — Lead Follow-up SaaS for Service Businesses",
      href: "https://lead-rescue-ai-two.vercel.app/",
      dates: "Oct 2026 - Present",
      active: true,
      shortDescription:
        "SaaS that helps cleaning companies and small service teams track every lead, get AI-drafted replies in English and Hindi, and see exactly who needs a follow-up today. Includes a live dashboard with pipeline stages, follow-up reminders, and lead import. Drafts and reminders only — the user stays in control of every message.",
      description:
        "Built and launched LeadRescue AI, a SaaS product that stops small service businesses from losing enquiries to slow follow-ups. Features a marketing landing site and an authenticated app with a dashboard (open leads, needs-attention count, open pipeline value, win rate), new-leads trend chart, pipeline-by-stage and value-by-stage views, lead-source breakdown, and an upcoming follow-ups list. Dedicated modules for Leads, Pipeline, Follow-ups, AI Replies, Import Leads, and Settings. AI generates draft replies in English and Hindi for human review before sending, so nothing goes out automatically. Includes owner/team roles, global page search, in-app notifications, and a support flow. Deployed on Vercel.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "AI Reply Generation (LLM)",
        "Data Visualization",
        "Authentication",
        "Vercel",
      ],
      links: [],
      image: "/images/leadrescue-ai.png",
      imageFit: "contain",
      video: "",
    },

    {
      title: "Smithridge — E-commerce CRM & Admin Dashboard",
      href: "https://smith-ecom-admin.vercel.app/",
      dates: "Sep 2026 - Oct 2026",
      active: false,
      shortDescription:
        "Full-stack e-commerce CRM and admin dashboard for managing orders, shipping, products, inventory, customers, subscribers, discounts and customer queries — with revenue, order and customer KPIs, sales overview charts and orders-by-status breakdown.",
      description:
        "Built the admin CRM for Smithridge, an e-commerce store. The dashboard surfaces revenue, orders, customers and average order value with trend sparklines, plus operational counters for orders to fulfil, open customer queries, low-stock products and newsletter subscribers. Includes monthly/yearly sales overview charts, orders-by-status donut, and dedicated modules for Orders, Shipping, Products, Collections, Inventory, Purchase orders, Customers, Subscribers, Customer Query, Discounts, Content and Legal pages.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CRM",
        "E-commerce",
        "Admin Dashboard",
        "Data Visualization",
        "Authentication",
      ],
      links: [],
      image: "/images/smithridge-admin.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "LeadRescue CRM — Lead & Pipeline Management Dashboard",
      href: "https://lead-rescue-ai-two.vercel.app/",
      dates: "Oct 2026 - Present",
      active: true,
      shortDescription:
        "Lead-tracking CRM dashboard for service businesses: open leads, needs-attention count, pipeline value, win rate, new-leads trend, pipeline-by-stage, follow-ups and AI-drafted replies, with owner/team roles.",
      description:
        "The authenticated CRM side of LeadRescue AI — a dashboard with KPI cards, 14-day new-leads chart, pipeline and value by stage, lead-source breakdown and upcoming follow-ups, plus Leads, Pipeline, Follow-ups, AI Replies, Import Leads and Settings modules, global page search, notifications and a support flow.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "CRM",
        "SaaS",
        "Admin Dashboard",
        "Data Visualization",
        "Authentication",
      ],
      links: [],
      image: "/images/leadrescue-dashboard.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "USAMarket.AI — AI-Powered Multi-Category Marketplace",
      href: "https://usa-market-ai-website.vercel.app/",
      dates: "Oct 2026 - Present",
      active: true,
      shortDescription:
        "OLX-style multi-category marketplace for vehicles, properties, businesses, products, parts and financing, with single-seller and multi-seller support. Features Amy, an AI chatbot assistant that understands natural-language requests and suggests matching listings.",
      description:
        "Built USAMarket.AI, a multi-category classifieds marketplace in the style of OLX, connecting buyers with vehicles, properties, businesses, products, parts & accessories and financial solutions in one place. Supports both single-seller and multi-seller listings, global search with trending searches, favorites, multi-language (EN) switching, and login/sign-up flows. Includes Amy, a personal AI assistant that takes plain-language requests (e.g. 'Find me a 4-bedroom home near Dallas under $450,000') and returns AI-suggested listings via an 'Amy Suggestion' section. Deployed on Vercel.",
      technologies: [
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "AI Chatbot (LLM)",
        "E-commerce",
        "Multi-vendor Marketplace",
        "Authentication",
        "Vercel",
      ],
      links: [],
      image: "/images/usamarket-ai.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "Bitinda Express — Delivery Platform CRM & Admin Dashboard",
      href: "https://main.d1po7jvexd3dol.amplifyapp.com/",
      dates: "Oct 2026 - Present",
      active: true,
      shortDescription:
        "Delivery platform CRM and admin dashboard for sending packages from one location to another, tying together a customer booking app, a driver app and an admin panel with shipment tracking, rates, payments and driver payouts.",
      description:
        "Built the admin CRM for Bitinda Express, a package delivery platform where customers book shipments from one location to another. The dashboard shows active shipments, monthly revenue, delivered count and on-time rate, a live recent-activity feed (bookings from the customer app, payments, driver claims and deliveries) and a system-health/API status monitor with today's pickups. Modules include Shipments, Customers, Drivers, Rates, Fleet Settings, Plans, Payments, Driver Payouts, Support, Activity and Content, with tracking-number search and light/dark mode. Deployed on AWS Amplify.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CRM",
        "SaaS",
        "Admin Dashboard",
        "Payment Gateway",
        "Data Visualization",
        "Authentication",
        "AWS Amplify",
      ],
      links: [],
      image: "/images/bitinda-express-admin.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "Lotusss Infra — Real Estate CMS & Enquiry CRM Admin Panel",
      href: "https://admin.lotusssinfra.com/",
      dates: "Jul 2026 - Oct 2026",
      active: false,
      shortDescription:
        "Admin panel and enquiry CRM for a real-estate developer's website: manage residential and commercial projects, gallery, blog, hero banners and site content, and track contact enquiries by type and status.",
      description:
        "Built the admin panel for Lotusss Infra, a real-estate developer. The dashboard shows contacts (with unread count), projects, blog posts and gallery stats, a projects breakdown (residential, commercial, under construction, ready to move) and a recent-contacts table with enquiry type, subject and New/Read status. Modules include Projects, Gallery, Blog, Contact Enquiries, Hero Banners, Site Settings, About Page, Policy Pages and Property Types, with global page search and authenticated admin access.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CRM",
        "Admin Dashboard",
        "Authentication",
      ],
      links: [],
      image: "/images/lotusss-admin.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "Double Bay — E-commerce Admin CRM Dashboard",
      href: "https://double-bay-admin.vercel.app/",
      dates: "May 2026 - Aug 2026",
      active: false,
      shortDescription:
        "Full-stack e-commerce admin CRM for Double Bay Cosmeceuticals: orders, products, inventory, purchase orders, customers, queries, marketing, discounts and revenue analytics in one dashboard.",
      description:
        "Built the admin CRM for Double Bay, a cosmeceuticals e-commerce brand. The dashboard tracks active users, total orders, revenue with month-over-month change and open customer queries, plus a monthly/yearly revenue analytics chart. Modules include Orders, Products, Product Categories, Collections, Inventory, Purchase Orders, Transfers, Gift Cards, Shop Concerns, Customers, Customer Query, Marketing, Discounts, Content, Legal Pages, Learn, Markets, Finance, Analytics and Sales Channels, with global search and notifications.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CRM",
        "E-commerce",
        "Admin Dashboard",
        "Data Visualization",
        "Authentication",
      ],
      links: [],
      image: "/images/double-bay-admin.png",
      imageFit: "contain",
      video: "",
    },
    {
      title: "BokaKorning — Driving School Admin CRM Dashboard",
      href: "https://admin.bokakorning.online/",
      dates: "Jan 2026 - Oct 2026",
      active: true,
      shortDescription:
        "Admin CRM for a driving-school booking platform: manage students, instructors, lesson bookings, courses, combo packages and wallet balances with live operations and weekly booking analytics.",
      description:
        "Built the admin CRM for BokaKorning, a driving-school booking platform. The dashboard shows total students, instructors, active bookings, completed and cancelled lessons, a bookings-this-week chart and last-7-days user and instructor sign-up charts, with quick Add Student / Add Instructor actions. Modules include Live Operations, Schedule Booking, Bookings, Students, Instructors, Wallet Balance, Content, Courses, Course Bookings, Combo Packages and Combo Bookings.",
      technologies: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CRM",
        "Admin Dashboard",
        "Data Visualization",
        "Authentication",
      ],
      links: [],
      image: "/images/bokakorning-admin.png",
      imageFit: "contain",
      video: "",
    },
  ],





} as const;
