# TomoTrip - Guide Recruitment Landing Page

## Overview

TomoTrip (旅友) is a local guide recruitment platform that connects travelers with local guides in Japan. The platform allows individuals (students, night workers, tourism professionals) to become guides and earn income by showing visitors around their city. The project consists of a mobile-first, conversion-optimized landing page designed to drive LINE registrations, along with a full-stack application infrastructure using React, Express, and PostgreSQL.

The landing page features a video modal, segmented audience tabs (students/night workers/tourism professionals), and a fixed bottom CTA bar optimized for mobile conversion.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite as the build tool

- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for the TomoTrip brand (#00A3C4 primary color)
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

**Design System**:
- Mobile-first responsive design (360px minimum width)
- Japanese and English typography system (Noto Sans JP, Inter)
- Conversion-focused layout with trust-building elements
- Accessibility features (ARIA labels, keyboard navigation, skip links)

**Landing Page Structure** (v2):
1. Hero section with primary CTA (LINE registration) and secondary CTA (video modal)
2. Benefits section (3 cards)
3. How it works (3 steps)
4. Segmented audience tabs (students/night workers/tourism professionals)
5. Compensation and safety information
6. Early adopter program (first 100 users)
7. FAQ section
8. Footer with company info and legal links
9. Fixed bottom CTA bar for mobile

**Key Files**:
- `client/src/` - React application source
- `client/index.html` - Landing page HTML entry point
- `client/src/styles.css` - Custom TomoTrip styles with design tokens
- `client/src/main.js` - Landing page JavaScript (video modal, tab interactions, analytics hooks)

### Backend Architecture

**Framework**: Express.js with TypeScript

- **Server Runtime**: Node.js 20
- **API Structure**: RESTful endpoints prefixed with `/api`
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Development Server**: Vite middleware integration for HMR during development
- **Production Build**: ESBuild bundles the server code

**Request/Response Flow**:
1. Vite dev server handles static assets and HMR in development
2. Express middleware processes API requests
3. Custom logging middleware tracks request duration and JSON responses
4. Server serves the built frontend in production

**Key Files**:
- `server/index.ts` - Express server entry point
- `server/routes.ts` - API route registration
- `server/vite.ts` - Vite integration for development mode
- `server/storage.ts` - In-memory storage interface (can be replaced with database layer)

### Data Storage

**Database**: PostgreSQL via Neon serverless driver

- **ORM**: Drizzle ORM for type-safe database queries
- **Schema Definition**: Drizzle schema files in `shared/schema.ts`
- **Migrations**: Drizzle Kit manages schema migrations in `/migrations` directory
- **Validation**: Drizzle-Zod integration for runtime type validation

**Current Schema**:
- `users` table with id (UUID), username, and password fields
- Shared type definitions between client and server via `@shared/*` path alias

**Storage Interface**:
- `IStorage` interface defines CRUD operations
- `MemStorage` provides in-memory implementation for development/testing
- Designed for easy swapping to database-backed storage

**Key Configuration**:
- `drizzle.config.ts` - Drizzle Kit configuration pointing to PostgreSQL
- Environment variable `DATABASE_URL` required for database connection

### Development Workflow

**Build System**:
- **Development**: `npm run dev` starts Vite dev server on port 5173 with HMR
- **Production Build**: `npm run build` compiles both frontend (Vite) and backend (ESBuild)
- **Type Checking**: `npm run check` runs TypeScript compiler without emitting files
- **Database**: `npm run db:push` pushes schema changes to database

**Environment Setup**:
- Nix package manager provides Node.js 20 runtime
- Replit-specific plugins for error overlay, cartographer, and dev banner in development
- Port 5173 exposed for development server

**Path Aliases**:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Third-Party UI Components
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tooltips, tabs, etc.)
- **Lucide React**: Icon library
- **Vaul**: Drawer component library
- **CMDK**: Command palette component
- **Embla Carousel**: Carousel/slider functionality
- **React Day Picker**: Calendar/date picker component

### Build Tools & Development
- **Vite**: Frontend build tool and dev server
- **ESBuild**: Fast JavaScript bundler for server code
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TSX**: TypeScript execution for development server
- **Replit Vite Plugins**: Runtime error modal, cartographer, dev banner

### Backend Services
- **Neon Database**: Serverless PostgreSQL hosting (via `@neondatabase/serverless` driver)
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connect-pg-simple**: PostgreSQL session store for Express

### Utilities & Validation
- **Zod**: Schema validation library
- **Date-fns**: Date manipulation utilities
- **Class Variance Authority**: Variant-based className utilities
- **clsx & tailwind-merge**: Conditional className composition
- **Nanoid**: Unique ID generation

### Analytics Integration
- Analytics tracking hook (`window.ttTrack`) prepared for GA4/GTM integration
- Event tracking for video views, tab selections, and CTA clicks

### External Assets
- **Google Fonts**: Noto Sans JP and Inter font families
- **LINE Integration**: Registration CTA links to LINE bot (URL placeholder: `https://lin.ee/yourline`)
- **YouTube**: Video modal embeds (placeholder URL provided)

### Development Environment
- **Replit**: Cloud development environment with Nix package management
- **TypeScript**: Type safety across entire stack
- **Node.js 20**: Runtime environment