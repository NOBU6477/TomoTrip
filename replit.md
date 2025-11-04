# TomoTrip - Local Guide Recruitment Platform

## Overview

TomoTrip (旅友) is a conversion-optimized landing page designed to recruit local guides for a travel companion matching platform. The project features a dual modal system: LINE registration with user type selection (guide/tourist/sponsor) and video selection with type-specific content. The campaign emphasizes first 50 people bonuses, perpetual dividend system for sponsor referrals, and contribution-based rank system. Built with Vite, vanilla JavaScript, and Tailwind CSS (no React/TypeScript), the application emphasizes mobile-first design and high conversion rates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Core Technology Stack:**
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Vanilla JavaScript (no React) - static landing page with minimal dependencies
- **Styling**: Pure CSS with custom design tokens, no component library
- **State Management**: Plain JavaScript DOM manipulation
- **Routing**: Single page with smooth scroll navigation

**Design System:**
- Custom CSS variables for consistent theming (color palette centered on #00A3C4 accent)
- Mobile-first responsive design with 360px minimum width
- Japanese-optimized typography using Noto Sans JP and Inter fonts
- Accessibility-focused with ARIA attributes, keyboard navigation, and skip links
- Component library based on Radix UI primitives with custom styling

**Key Architectural Decisions:**
- **Mobile-Dominant Approach**: All interactions optimized for touch (44px+ tap targets), with mobile performance as primary metric
- **Conversion Optimization**: Dual modal system for LINE registration (guide/tourist/sponsor selection) and video content (type-specific videos), fixed bottom CTA bar, and segmented audience tabs to maximize conversions
- **Modal System**: Three interconnected modals - LINE registration modal, video selection modal, and video player modal with keyboard navigation (Escape key) and focus management
- **Progressive Enhancement**: Static landing page with lazy-loaded assets, structured data for SEO, and PWA manifest for mobile installation
- **Analytics Integration**: Comprehensive tracking with `window.ttTrack()` function for modal interactions, video plays, and CTA clicks

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Vite middleware integration for development HMR (Hot Module Replacement)
- Session management ready with `connect-pg-simple`

**API Structure:**
- RESTful API endpoints prefixed with `/api`
- Modular route registration system in `server/routes.ts`
- Request logging middleware with JSON response capture

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based design (`IStorage`) for easy transition to database
- Drizzle ORM configured for PostgreSQL migrations

**Key Architectural Decisions:**
- **Separation of Concerns**: Client and server code clearly separated in `client/` and `server/` directories
- **Development Ergonomics**: Vite middleware enables unified dev server on port 5173 with both static assets and API routes
- **Production Ready**: Build outputs to `dist/public/` with static serving capability

### Data Storage

**Database Configuration:**
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon serverless PostgreSQL via `@neondatabase/serverless`
- **Schema Location**: `shared/schema.ts` for type sharing between client and server
- **Migration Strategy**: Schema changes tracked in `migrations/` directory via `drizzle-kit`

**Current Schema:**
- Users table with UUID primary keys, username/password authentication
- Zod validation schemas derived from Drizzle schemas via `drizzle-zod`

**Key Architectural Decisions:**
- **Environment-Based**: Database URL required via `DATABASE_URL` environment variable
- **Shared Types**: Schema definitions exported to both client and server for type consistency
- **Development Flexibility**: In-memory storage fallback allows development without database

### Authentication & Authorization

**Current Implementation:**
- Basic user schema with username/password fields
- Session support configured via `connect-pg-simple`
- Cookie-based session management

**Planned Integration:**
- LINE Login integration for guide recruitment (URLs placeholders in landing page)
- Server-side session validation for protected routes

### External Dependencies

**Third-Party Services:**
- **LINE Messaging API**: Primary conversion target for guide registration (placeholder URL: `https://lin.ee/yourline`)
- **YouTube**: Video content embedding for "30-second explanation" modal (placeholder video ID)
- **Google Fonts**: Noto Sans JP and Inter font families via CDN

**Database & Infrastructure:**
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Replit Platform**: Development and deployment environment with specific host allowances

**UI Component Libraries:**
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, etc.)
- **shadcn/ui**: Pre-styled component system built on Radix UI
- **Embla Carousel**: Touch-friendly carousel component
- **React Hook Form**: Form validation with Zod resolver integration
- **date-fns**: Date manipulation and formatting

**Development Tools:**
- **Vite Plugins**: Runtime error overlay, development banner, and cartographer (Replit-specific)
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TypeScript**: Type checking across entire codebase

**Analytics Placeholder:**
- Tracking function (`window.ttTrack`) prepared for Google Analytics 4, Google Tag Manager, or custom analytics platform integration

**Key Integration Points:**
- SEO optimized with Open Graph, Twitter Cards, and JSON-LD structured data
- PWA manifest for mobile app-like installation
- Lazy loading for images and video embeds to optimize Lighthouse scores (target 90+)
- i18n ready with `data-i18n` attributes for future multi-language support