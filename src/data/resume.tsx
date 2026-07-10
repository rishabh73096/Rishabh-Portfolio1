
export const DATA = {

  name: "Rishabh Tiwari",
  initials: "RT",
  url: "https://rishabh-portfolio1-ten.vercel.app",
  location: "Delhi, India",
  locationLink: "https://www.google.com/maps/place/Delhi",
  description:
    "Full Stack Developer specializing in scalable SaaS platforms and real-time systems. Expert in MERN stack, PostgreSQL, Docker, CI/CD, and test-driven development. Delivered 9 production applications serving 300+ users with high-reliability architecture.",
  summary:
    "Full Stack Developer with expertise in building scalable SaaS platforms and production-ready web applications. Strong technical foundation in MERN stack with growing proficiency in PostgreSQL, Docker, and CI/CD pipelines. Delivered 9 live applications serving 300+ users, processing 100+ transactions reliably. Core competencies: Next.js, React.js, Node.js, Express.js, MongoDB, PostgreSQL, JWT authentication, role-based access control, Stripe/Postmark integrations, and test-driven development. Passionate about clean architecture, performance optimization, and shipping high-quality features in agile environments.",

  avatarUrl: "/me.jpeg",
  resumeLink: "https://drive.google.com/file/d/1FAoUklRT1ESkVprO1Ux6IlQnUJnLRlyv/view?usp=sharing",

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
    { href: "/blog", label: "Blog" },
  ],

  contact: {
    email: "rishabhtiwari73096@gmail.com",
    tel: "+917309651657",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rishabh-tiwari",
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rishabh-tiwari",
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
      title: "Clee — Full-Stack SaaS Platform for Beauty & Wellness Businesses",
      href: "https://app.clee.co/",
      dates: "Aug 2024 - Present (6 months)",
      active: true,
      shortDescription:
        "Multi-tenant SaaS platform for beauty/wellness businesses. Technical challenge: managing concurrent booking updates across 4+ role types with real-time state sync. Solution: Redis-backed slot locking + Redux optimistic updates. Processing 100+ monthly transactions with 99.8% reliability.",
      description:
        "Architected 3-tier SaaS platform from scratch: admin dashboard, customer marketplace, + REST API backend. Key technical decisions: Multi-tenant architecture using tenant ID isolation in MongoDB queries; Redis distributed locks for concurrent booking slot management (prevents overbooking); Redux state management with async thunks for real-time cart/booking synchronization. Built dynamic loyalty rewards engine with React formula builder UI allowing merchants to create fixed/percentage discounts with live preview. Implemented Postmark email infrastructure with templated transactional emails + marketing automation flows. Payment flow: Stripe payment intent + confirmation, Redux state management, Express async handlers for idempotent transactions. Database optimization: compound indexes on (tenantId, businessId, dateRange) for slot queries, reducing query time from 850ms → 120ms. Shipped 15+ business modules: real-time slot availability, staff scheduling (timesheets/leave), gift vouchers, promo codes, analytics dashboards. Reliably processing 100+ monthly transactions with 0 double-charges.",
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
      links: [],
      image: "/images/Clee.png",
      video: "",
    },
    {
      title: "Grocery Pickup Store",
      href: "https://www.bachhoahouston.com/",
      dates: "Oct 2024 - Present (5 months)",
      active: true,
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
      image: "/images/image1.png",
      video: "",
    },
    {
      title: "Forma Construction",
      href: "https://forma-web-seven.vercel.app/",
      dates: "Nov 2024 - Present (4 months)",
      active: true,
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
      dates: "Sep 2024 - Present (6 months)",
      active: true,
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
      image: "/images/image3.png",
      video: "",
    },
    {
      title: "Hariir - Job Portal",
      href: "https://hariir-web.vercel.app/",
      dates: "2024",
      active: true,
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
      image: "/images/image4.png",
      video: "",
    },
    {
      title: "Double Bay Website",
      href: "https://double-bay-website.vercel.app/",
      dates: "2024",
      active: true,
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
      dates: "2024",
      active: true,
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
      dates: "2024",
      active: true,
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
      dates: "2024",
      active: true,
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

  ],





} as const;
