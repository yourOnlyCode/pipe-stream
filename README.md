# Pipestream

Visual feedback pipeline for cross-organizational teams. Individual contributors provide confidence levels and feedback that flows up through the hierarchy to directors.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Shadcn/ui** - Component library with glassmorphism styling
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Database via Supabase
- **Supabase** - Auth, database, and storage
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
- `DATABASE_URL` - Your Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

3. **Set up Supabase:**
- Create a new Supabase project
- Enable Email/Password authentication
- For SSO: Configure SAML/OAuth providers in Supabase Auth settings

4. **Initialize database:**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

### Core Functionality
- **Visual Hierarchy**: Create team hierarchies with drag-and-drop
- **Confidence Tracking**: Sliding scale (0-100%) for goal confidence
- **Feedback Pipeline**: Comments flow up through hierarchy
- **Real-time Updates**: Live confidence aggregation
- **SSO Support**: Enterprise authentication via Supabase

### UI/UX
- **Glassmorphism Design**: Apple-inspired clean, crisp interface
- **Floating Animations**: Smooth, beautiful motion effects
- **Responsive Layout**: Works on all devices
- **Dark Theme**: Modern dark mode with gradients

## Database Schema

- **User**: Team members with roles
- **Pipestream**: Individual projects/goals with deadlines
- **HierarchyNode**: Tree structure for team organization
- **Feedback**: Confidence levels and comments

## Next Steps

1. **Authentication**: Implement Supabase auth flow
2. **API Routes**: Create endpoints for CRUD operations
3. **Real-time**: Add Supabase subscriptions for live updates
4. **Hierarchy Builder**: Drag-and-drop interface for team structure
5. **Analytics**: Dashboard for directors with aggregated insights
6. **Notifications**: Alert system for low confidence scores

## Project Structure

```
pipe-stream/
├── app/                    # Next.js app router
│   ├── pipestream/[id]/   # Individual pipestream pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home dashboard
├── components/            # React components
│   ├── ui/               # Shadcn components
│   ├── pipestream-visualization.tsx
│   └── feedback-form.tsx
├── lib/                  # Utilities
│   ├── supabase/        # Supabase client
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Helper functions
└── prisma/              # Database schema
    └── schema.prisma
```
