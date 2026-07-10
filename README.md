# Rishabh Tiwari - Full Stack Developer Portfolio

> Production-ready portfolio showcasing real-world MERN stack projects and technical expertise

**Portfolio URL:** [rishabh-portfolio1-ten.vercel.app](https://rishabh-portfolio1-ten.vercel.app)

**Resume:** [Google Drive](https://drive.google.com/file/d/1FAoUklRT1ESkVprO1Ux6IlQnUJnLRlyv/view?usp=sharing)

---

## 🚀 About Me

Full Stack Developer specializing in scalable SaaS platforms and real-time systems. I've shipped **9 production applications** serving 300+ users, processing 100+ transactions reliably with a focus on performance optimization and clean architecture.

**Key Achievements:**
- Built multi-tenant SaaS platform (Clee) with Redis distributed locks preventing overbooking
- Optimized MongoDB queries from 2100ms → 280ms using aggregation pipelines
- Achieved 99.2% transaction success rate in e-commerce platforms
- Implemented hierarchical RBAC across 4 role levels with document-level permissions

**Education:**
- Master of Computer Applications (MCA) - Babu Banarasi Das University, Lucknow (CGPA: 8.9/10) | 2022-2024
- Bachelor of Computer Applications (BCA) - Prof. Rajendra Singh Rajju Bhaiya University, Prayagraj (75.47%) | 2019-2022

---

## 💼 Professional Experience

**Full Stack Developer (MERN) @ 2DigitInnovations**
- *Sep 2024 - Present* | Remote, India
- Built and deployed 9 production-ready full-stack applications
- Architected 3-tier SaaS platform: admin dashboard, customer marketplace, REST API
- Implemented multi-tenant architecture with tenant ID isolation in MongoDB
- Used Redis distributed locks to prevent concurrent booking conflicts
- Processed 100+ monthly transactions with 0 double-charges via Stripe payments
- Optimized page load times 40% through lazy loading and code splitting
- Collaborated across full product lifecycle with designers, PMs, stakeholders

---

## 🎯 Featured Projects

### 1. **Clee** — Full-Stack SaaS Platform for Beauty & Wellness
**Live:** https://app.clee.co/ | **Duration:** Aug 2024 - Present (6 months)

Multi-tenant SaaS platform serving beauty/wellness businesses with real-time booking management.

**Technical Highlights:**
- **Multi-tenancy:** Tenant ID isolation in MongoDB queries with compound indexing
- **Concurrency:** Redis distributed locks for slot management (prevents overbooking)
- **Performance:** Query optimization 850ms → 120ms via indexes
- **Payments:** Stripe integration with idempotent transactions (0 double-charges)
- **State:** Redux optimistic updates + real-time cart/booking sync
- **Database:** MongoDB with aggregation pipelines for analytics
- **Email:** Postmark templated transactional emails
- **Features:** 15+ business modules including loyalty rewards, promo codes, staff scheduling

**Tech Stack:** Next.js, React, Redux Toolkit, Node.js, Express, MongoDB, Redis, Stripe, Postmark, Tailwind CSS

---

### 2. **Forma Construction** — B2B Project Management Platform
**Live:** https://forma-web-seven.vercel.app/ | **Duration:** Nov 2024 - Present (4 months)

Production platform serving 200+ users across 50+ projects with hierarchical permissions.

**Technical Highlights:**
- **RBAC:** 4-level hierarchy (Admin → Manager → Lead → Member) with document permissions
- **Performance:** N+1 query problem solved via MongoDB aggregation pipelines (2100ms → 280ms)
- **Storage:** AWS S3 integration with signed URLs for secure document access
- **Payments:** 100+ monthly plan upgrades via payment gateway with webhooks
- **Features:** Real-time project updates, comment threads, team collaboration

**Tech Stack:** Next.js, React, Node.js, Express, MongoDB, Mongoose, AWS S3, JWT Auth, Tailwind CSS

---

### 3. **Grocery Pickup Store** — E-Commerce Platform
**Live:** https://www.bachhoahouston.com/ | **Duration:** Oct 2024 - Present (5 months)

Live grocery e-commerce processing customer orders with real-time inventory management.

**Technical Highlights:**
- **Inventory:** Optimistic updates + server validation + Redis cache (99.2% accuracy)
- **Cart:** Redux state + localStorage persistence + server backup in MongoDB
- **Performance:** Image lazy-loading reduced page load 3.2s → 890ms
- **Checkout:** Complex flow with location selection, time-slot reservation, payment
- **Features:** Wishlist with sorting, admin dashboard, order management

**Tech Stack:** Next.js 14, React 18, Redux Toolkit, Node.js, Express, MongoDB, Redis, Stripe, Vercel

---

### 4. **My Lodge** — Rental Marketplace
**Live:** https://www.mylodge.cloud/ | **Duration:** Sep 2024 - Present (6 months)

Dual-dashboard rental marketplace with 50+ properties and real-time availability tracking.

**Technical Highlights:**
- **Calendar Algorithm:** Bitmap storage (32-bit integers) for efficient date range queries
- **Performance:** 100x faster than individual day records via algorithm optimization
- **Dual Dashboards:** Guest (search, favorites, history) + Host (pricing, blocking)
- **Booking:** Real-time price calculation, secure payment, confirmation emails
- **Reviews:** Rating aggregation system with Lighthouse-style scoring

**Tech Stack:** Next.js, React, Node.js, Express, MongoDB, JWT, Tailwind CSS

---

### Additional Production Projects

**Hariir Job Portal** | [Live](https://hariir-web.vercel.app/)
- Professional social platform for job seekers, companies, recruiters
- Features: profiles, job listings, networking with RBAC

**Double Bay Website** | [Live](https://double-bay-website.vercel.app/)
- E-commerce for beauty products and salon services
- Integrated Stripe payments and real-time booking

**Canada Halal Platform** | [Live](https://caneda-halal-register.vercel.app/)
- Halal product registration and certification management
- Vendor management with audit trails

**Alagare Bus Booking** | [Live](https://alagare-landingpage.vercel.app/)
- Professional landing page with integrated booking system

**Bok A Korning** | [Live](https://www.bokakorning.online/)
- Booking platform with real-time availability and conversion optimization

---

## 📝 Technical Blog

**12 MERN Stack Articles** — Practical guides covering real production challenges:

1. [Multi-Tenant SaaS with MongoDB](/blog/multi-tenant-mongodb-saas) — Tenant isolation & indexing
2. [Redis Distributed Locks](/blog/redis-locks-booking) — Preventing overbooking
3. [Loyalty Rewards Engine](/blog/loyalty-rewards-engine) — React + Node.js
4. [MongoDB Aggregation Pipelines](/blog/mongodb-aggregation-pipelines) — Solving N+1 queries
5. [Stripe Payments in Node.js](/blog/stripe-payments-nodejs) — Full integration guide
6. [RBAC in Express.js](/blog/rbac-express-middleware) — Hierarchical permissions
7. [Real-Time Socket.io](/blog/socket-io-realtime) — Live updates in Node.js
8. [JWT Authentication](/blog/jwt-auth-mern) — Tokens & refresh strategy
9. [MongoDB Indexing](/blog/mongodb-indexing-performance) — Speed up queries 10x
10. [Express Error Handling](/blog/express-error-handling) — Centralized middleware
11. [API Testing with Jest](/blog/nodejs-api-testing) — Unit & integration tests
12. [Responsive React Design](/blog/responsive-react-tailwind) — Mobile-first with Tailwind

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router, SSR, SSG)
- **UI Library:** React 18 with TypeScript
- **State:** Redux Toolkit with async thunks
- **Styling:** Tailwind CSS + custom CSS
- **Animations:** Framer Motion
- **Components:** Shadcn UI, Magic UI

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **API:** REST with JWT authentication
- **Testing:** Jest + Supertest

### Database & Caching
- **Database:** MongoDB with Mongoose ODM
- **Caching:** Redis (locks, sessions, inventory)
- **Query:** MongoDB Aggregation Pipelines

### Payment & Email
- **Payments:** Stripe API with webhook confirmation
- **Email:** Postmark with templated emails

### DevOps & Deployment
- **Frontend Hosting:** Vercel (auto SSL, CDN, backups)
- **Backend:** Railway / Render (PostgreSQL compatible)
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions workflows
- **Cloud Storage:** AWS S3 for files
- **Monitoring:** Performance tracking via Lighthouse

---

## 📊 Skills

### Frontend Development
React.js 18, Next.js (SSR/SSG/App Router), TypeScript, JavaScript (ES6+), Redux Toolkit, Tailwind CSS, HTML5 & CSS3, Responsive Design, Web Accessibility, React Testing Library

### Backend Development
Node.js, Express.js, REST API Design, JWT Authentication, Role-Based Access Control (RBAC), API Documentation (Swagger/OpenAPI)

### Database & Performance
MongoDB (Mongoose), MySQL, PostgreSQL, Redis (Caching & Sessions), Database Optimization, Query Performance Analysis, MongoDB Aggregation Pipelines

### Testing
Jest (Unit Testing), React Testing Library, API Testing, Test-Driven Development (TDD), Supertest

### DevOps & Cloud
Docker & Containerization, GitHub Actions (CI/CD), AWS (S3, EC2, RDS), Vercel Deployment, Environment Management

### Integrations
Stripe Payment Gateway, Postmark Email Service, Payment Webhooks, OAuth

### Tools & Practices
Git & GitHub, Agile/Scrum, Clean Architecture, Code Review & Collaboration, VS Code, Figma

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Redis (optional, for caching features)

### Installation

```bash
# Clone repository
git clone https://github.com/rishabh73096/Rishabh-Portfolio1.git
cd Rishabh-Portfolio1

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── projects/             # Projects listing & details
│   │   ├── blog/                 # Blog listing & articles
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── ui/                   # Shadcn UI components
│   │   ├── magicui/              # Magic UI animations
│   │   └── [components]          # Custom components
│   ├── data/
│   │   ├── resume.tsx            # Resume data
│   │   ├── projects.tsx          # Projects data
│   │   └── blogs.tsx             # Blog articles
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/
│   └── images/                   # Project images
├── .github/
│   └── workflows/                # CI/CD pipelines
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## 🌟 Features

- ✅ **Responsive Design** — Mobile-first approach, works on all devices
- ✅ **Dark Mode** — Seamless light/dark theme switching
- ✅ **SEO Optimized** — Meta tags, structured data, sitemap
- ✅ **Performance** — Optimized images, code splitting, lazy loading
- ✅ **Blog System** — 12 MERN stack articles with code examples
- ✅ **Project Details** — Deep dive into technical challenges solved
- ✅ **Resume Link** — Quick access to latest CV
- ✅ **Contact Links** — GitHub, LinkedIn, Email, Twitter

---

## 📈 Performance

**Lighthouse Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Build Metrics:**
- Build time: ~30s
- Bundle size: 151 KB (home) | 189 KB (projects)
- Static pages: 19 (all blog articles pre-rendered)

---

## 🔗 Links

- **Portfolio:** [rishabh-portfolio1-ten.vercel.app](https://rishabh-portfolio1-ten.vercel.app)
- **GitHub:** [github.com/rishabh-tiwari](https://github.com/rishabh-tiwari)
- **LinkedIn:** [linkedin.com/in/rishabh-tiwari](https://www.linkedin.com/in/rishabh-tiwari)
- **Twitter:** [@Rishabh__73](https://x.com/Rishabh__73)
- **Email:** [rishabhtiwari73096@gmail.com](mailto:rishabhtiwari73096@gmail.com)

---

## 📞 Contact

**Email:** rishabhtiwari73096@gmail.com  
**Phone:** +91 7309 651 657  
**Location:** Delhi, India

---

## 📄 License

This portfolio is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Next.js** — React framework for production
- **Vercel** — Hosting and deployment
- **Shadcn UI** — Beautiful components
- **Tailwind CSS** — Utility-first styling
- **MongoDB** — Document database
- **Stripe** — Payment processing

---

**Last Updated:** July 10, 2026

*Built with ❤️ using MERN Stack*
