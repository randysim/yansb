# YANSB – Yet Another Next.js SaaS Boilerplate

A feature-rich, modern SaaS boilerplate built with **Next.js** and packed with everything you need to launch your SaaS product quickly.

***

## 🚀 Overview

This template comes ready with:

- **Next.js 15** for the core app framework
- **TypeScript** throughout for type safety
- **Drizzle ORM** & **PostgreSQL** for scalable, type-safe databases
- **NextAuth v5** (Auth.js) for authentication (Google OAuth preconfigured)
- **Stripe** integration (subscription billing and webhooks)
- **TailwindCSS** for modern utility-first styling
- **shadcn/ui** & **Radix UI** for beautiful and accessible components
- **Prettier**, **ESLint**, and **pnpm** for best-in-class DX
- Modular structure with dedicated folders for app logic, database, auth, and components

***

## 🛠️ Technologies Used

- **Next.js**
- **TypeScript**
- **Drizzle ORM**
- **NextAuth v5 (Auth.js)**
- **Stripe API & React Stripe.js**
- **PostgreSQL**
- **TailwindCSS**
- **shadcn/ui**, **Radix UI**
- **Prettier**, **ESLint**
- **pnpm** (use this instead of npm or yarn!)

***

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yansb.git
cd yansb
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure `.env` File

Copy the example below and fill in your secrets:

```env
NEXT_PUBLIC_STRIPE_PK=your-stripe-pk
DATABASE_URL=your-database-url
AUTH_SECRET=your-auth-secret
AUTH_GOOGLE_ID=your-google-oauth-id
AUTH_GOOGLE_SECRET=your-google-oauth-secret
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### 4. Database Setup

Update your `DATABASE_URL` and run:

```bash
pnpm db:push
```

***

## 🗂️ Key Files and Folder Structure

| Path                            | Purpose                                 |
|----------------------------------|-----------------------------------------|
| `src/app/`                      | Next.js app directory (routes, layouts) |
| `src/components/`               | Reusable UI components                  |
| `src/db/`                       | Drizzle ORM schema + DB config          |
| `src/db/schema.ts`              | Postgres table definitions (users, subs)|
| `src/auth.ts`                   | Auth.js/NextAuth config                 |
| `src/stripe.ts`                 | Stripe utility functions                |
| `src/types/`                    | Custom TypeScript type definitions      |
| `public/`                       | Static assets and images                |
| `.env`                          | Environment variables/secrets           |
| `package.json`                  | Project meta and scripts                |
| `drizzle.config.ts`             | Drizzle ORM config                      |
| `tailwind.config.js`            | TailwindCSS config                      |
| `components.json`               | shadcn/ui configuration                 |

***

## 📚 Scripts

- `pnpm dev` — Start development mode
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm db:push` — Push Drizzle schema migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm format` — Format code with Prettier

***

## 📝 Notes

- **Use pnpm!** (Install with: `npm i -g pnpm`)
- Customization is easy: tweak components, pages, and config files as needed.
- Stripe and Google OAuth are ready for your credentials.
- See `src/db/schema.ts` for how the database is structured.