# YANSB – Yet Another Next.js SaaS Boilerplate

A feature-rich, modern SaaS boilerplate built with **Next.js** and packed with everything you need to launch your SaaS product quickly.

***

## 🚀 Overview

This project was made with:

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

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:randysim/yansb.git
cd yansb
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure `.env` File

Copy the example below and fill in your secrets:

Command to generate secrets:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

.env

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

Install Postgres + PSQL. 

```
sudo -u postgres psql
CREATE DATABASE <database_name>; # need to have a semicolon at the end of this.
```

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
| `src/types/`                    | Custom TypeScript type definitions      |
| `public/`                       | Static assets and images                |
| `.env`                          | Environment variables/secrets           |
| `package.json`                  | Project meta and scripts                |
| `drizzle.config.ts`             | Drizzle ORM config                      |
| `tailwind.config.js`            | TailwindCSS config                      |
| `components.json`               | shadcn/ui configuration                 |

***

### 5. Google oAuth Setup

Javascript Origins: [your-domain-url]

Authorized redirect URI: [your-domain-url]/api/auth/callback/google

### 6. Supabase Setup

Create a Database on Supabase. On the top bar, click on "connect" and make sure to select transaction pooler instead of direct connection since Vercel uses serverless architecture. Make sure to update database password in the url.

### 7. Vercel Setup

Set .env variables + set build command to ``pnpm db:migrate && next build``

## 📚 Scripts

- `pnpm dev` — Start development mode
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm db:push` — Push Drizzle schema migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:generate` - Generate Migration Files
- `pnpm db:migrate` - Migrate Database
- `pnpm format` — Format code with Prettier

***

## 📝 Notes

- **Use pnpm!** (Install with: `npm i -g pnpm`)
- Customization is easy: tweak components, pages, and config files as needed.
- Google OAuth are ready for your credentials.
- See `src/db/schema.ts` for how the database is structured.
- Organizes components and code by feature.

## Collaboration

### Branches

- "main" branch triggers CI/CD. Never push to this directly.
- "dev" branch <- merge all PRs into here, code that is reviewed by PMs
- "<feature>" branch <- you can create your own branches and add whatever features you want.

Hence, flow is: (work on feature branch) -> PR to dev -> dev -> PR to main -> main

### Database Migrations and updating.

Multiple times when working on new features, the database schema will have to be updated to support more tables, relations, columns, etc. There are two commands you should be aware of

``pnpm db:push`` will force update the database with the current schema. This should only be done locally for development purposes.

``pnpm db:generate`` will generate a migration file in ./drizzle. The migration file is all the changes in the database since the last migration. You do this when you are ready to merge to dev. **NOTE**: Before running ``pnpm db:generate``, make sure to merge "dev" into your feature branch. That way, your migration is generated on top of whatever database schema already exists. Thus, the responsibility of handling database conflicts is allocated to the developer making the most recent change. ANOTHER (maybe better) solution is to only run ``pnpm db:generate`` on the dev branch and for every other branch, operate using ``pnpm db:push``

``pnpm db:migrate`` This is run by the CI/CD to update the production database using the migration files. You can technically run this locally but not needed.
