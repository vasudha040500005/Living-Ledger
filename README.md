# De`Sign — Premium Interior Design Portfolio

A full-stack interior design portfolio website with vendor management and user authentication.

## Features

- **Beautiful Home Page** — Hero section with full-screen furniture photography, services, testimonials, stats
- **Portfolio Gallery** — Filterable project showcase with detail pages
- **About Page** — Designer story, values, timeline, process
- **Contact Page** — Contact form with details (address, phone, email, social)
- **User Authentication** — Register/login to view projects
- **Vendor Dashboard** — Hidden admin portal to add, edit, delete, and feature projects
- **Contact Messages** — Vendor can view all contact form submissions

## Tech Stack

- **Frontend/Backend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom design system
- **Auth:** NextAuth.js (separate user + vendor credentials)
- **Database:** Prisma ORM + SQLite (local) / PostgreSQL (Vercel)
- **Images:** Unsplash integration via Next.js Image

---

## Getting Started (Local)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

Required variables:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
VENDOR_EMAIL="your@email.com"
VENDOR_PASSWORD="YourPassword"
```

### 3. Set up database
```bash
npm run db:push
```

### 4. Generate Prisma client
```bash
npm run db:generate
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, services, featured projects |
| `/portfolio` | All projects gallery |
| `/portfolio/[id]` | Individual project detail |
| `/about` | About the designer |
| `/contact` | Contact form + details |
| `/login` | User login |
| `/register` | User registration |
| `/vendor-access` | **Hidden** vendor login (not in navbar) |
| `/dashboard` | Vendor dashboard (protected) |
| `/dashboard/add-project` | Add new project |
| `/dashboard/edit-project/[id]` | Edit existing project |

---

## Vendor Access

The vendor login is intentionally hidden from the navigation. Access it directly at:
```
/vendor-access
```

Credentials are set in your `.env.local` file via `VENDOR_EMAIL` and `VENDOR_PASSWORD`.

---

## Deploying to Vercel

### 1. Set up a PostgreSQL database
Use [Neon](https://neon.tech) (free tier) or Vercel Postgres:
- Create a new project
- Copy the connection string

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### 3. Add environment variables in Vercel Dashboard:
```
DATABASE_URL=postgresql://your-connection-string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
VENDOR_EMAIL=vendor@yourdomain.com
VENDOR_PASSWORD=YourSecurePassword
```

### 4. Update Prisma for PostgreSQL
In `prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "postgresql"   # Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 5. Run database migration
```bash
DATABASE_URL="your-postgres-url" npx prisma db push
```

---

## Customization

### Contact Details
Update contact information in:
- `components/Footer.tsx` — phone, email, address, social links
- `app/contact/page.tsx` — contact details section

### Brand Name
Replace "Interiors by Vasu" in:
- `app/layout.tsx` — metadata title
- `components/Navbar.tsx` — logo text
- `components/Footer.tsx` — footer brand

### Colors
The custom color palette is in `tailwind.config.ts`:
- `cream` — warm background tones
- `walnut` — primary dark brown tones
- `sage` — accent green tones

---

## Security Notes

- The vendor login route (`/vendor-access`) is not linked anywhere in the public UI
- Dashboard routes are protected by both middleware and client-side session checks
- Vendor credentials are stored only in environment variables (never in the database)
- User passwords are hashed with bcrypt (12 rounds)
