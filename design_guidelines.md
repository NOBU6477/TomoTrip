# TomoTrip Guide Recruitment Landing Page - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern Japanese service platforms (LINE, Mercari) combined with Western conversion-optimized landing pages (Airbnb job boards, Uber driver recruitment). Mobile-first design with trust-building elements and clear conversion pathways.

## Core Design Principles
1. **Trust & Credibility**: Professional yet approachable aesthetic that builds confidence in the platform
2. **Conversion-Focused**: Every element guides users toward LINE registration
3. **Mobile-Dominant**: 360px minimum width, touch-friendly interactions (44px+ tap targets)
4. **Clarity Over Cleverness**: Clean, readable layouts that communicate value instantly

## Typography System

### Font Families
- Primary: System font stack optimized for Japanese/Latin readability
  - `'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif`
- Accent/Numbers: `'Inter', -apple-system, sans-serif` for statistics and pricing

### Type Scale
- **Hero Title**: 2.5rem (mobile) / 4rem (desktop), bold (700), tight line-height (1.1)
- **Hero Subtitle**: 1.125rem (mobile) / 1.5rem (desktop), regular (400), relaxed line-height (1.6)
- **Section Headers**: 2rem (mobile) / 3rem (desktop), bold (700)
- **Card Titles**: 1.25rem, semibold (600)
- **Body Text**: 1rem, regular (400), line-height 1.7 for readability
- **Small Text/Badges**: 0.875rem, medium (500)

## Layout System

### Spacing Primitives
Use Tailwind spacing units: **4, 6, 8, 12, 16, 20** for consistent rhythm
- Component internal padding: `p-6` (mobile) / `p-8` (desktop)
- Section vertical spacing: `py-16` (mobile) / `py-24` (desktop)
- Card gaps: `gap-8` (mobile) / `gap-12` (desktop)
- Element margins: `mb-4`, `mt-6`, `space-y-8`

### Container Strategy
- Hero: Full-width with inner `max-w-7xl mx-auto px-4`
- Content sections: `max-w-6xl mx-auto px-4`
- Text content: `max-w-3xl` for optimal readability
- Fixed bottom CTA bar: Full-width, `h-16`, elevated with shadow

### Grid Patterns
- Benefits (3 cards): `grid-cols-1 md:grid-cols-3 gap-8`
- How It Works (3 steps): `grid-cols-1 md:grid-cols-3 gap-6`
- Audience tabs content: Single column, `max-w-2xl mx-auto`

## Color System

### Primary Palette
- **Accent/CTA**: #00A3C4 (vibrant cyan - trust, technology, movement)
- **Background**: #FFFFFF (white base for clean, professional feel)
- **Surface**: #F8F9FA (light gray for cards and sections)
- **Text Primary**: #1A1A1A (near-black for readability)
- **Text Secondary**: #6B7280 (medium gray for supporting text)
- **Border**: #E5E7EB (subtle separation)

### Interactive States
- CTA Hover: #008BA8 (darker accent)
- CTA Active: #00738A (even darker)
- Focus Ring: #00A3C4 with 0.3 opacity, 3px width
- Tab Active: #00A3C4 with 2px bottom border
- Tab Inactive: #9CA3AF text with transparent border

## Component Library

### Primary CTA Button
- Background: #00A3C4 with 20% opacity blur overlay when on images
- Text: White, 1rem, bold (600)
- Padding: `px-8 py-4` (generous touch target)
- Border-radius: `rounded-lg` (8px)
- Shadow: `shadow-lg` for elevation
- Full-width on mobile, inline on desktop

### Ghost/Secondary Button
- Border: 2px solid #00A3C4
- Text: #00A3C4, 1rem, semibold (600)
- Background: transparent (white/10% on images)
- Padding: `px-6 py-3`
- Border-radius: `rounded-lg`

### Tab Navigation
- Container: `border-b-2 border-gray-200`, horizontal scroll on mobile
- Individual tabs: `px-6 py-4`, minimum 120px width
- Active state: #00A3C4 text, 2px bottom border #00A3C4
- Inactive state: #6B7280 text, transparent border
- Smooth transition: 200ms ease for all states

### Cards (Benefits, Steps)
- Background: white
- Border: 1px solid #E5E7EB
- Border-radius: `rounded-xl` (12px)
- Padding: `p-8`
- Shadow: `shadow-md` on hover (subtle lift effect)
- Icon container: 48px circle, #00A3C4/10 background

### Video Modal
- Overlay: Black with 80% opacity
- Modal container: `max-w-4xl`, centered, `rounded-2xl`
- Video aspect ratio: 16:9, full container width
- Close button: Top-right, white X on #1A1A1A/50 circle, 40px size

### Fixed Bottom CTA Bar (Mobile)
- Height: 64px, white background
- Shadow: `shadow-2xl` (strong elevation)
- Padding: `px-4 py-3`
- Button: Full-width minus padding, standard primary CTA styling
- Appears below 768px viewport width

## Images & Visual Assets

### Hero Section
- **Large Hero Image**: Modern, aspirational lifestyle image showing diverse guides in local settings
- Image treatment: 60% opacity overlay with gradient (top-to-bottom: #1A1A1A/40 to transparent) to ensure text readability
- Dimensions: 1920×1080 (desktop) / 750×1000 (mobile portrait-oriented)
- Position: Cover the entire hero section background
- Placement: `/assets/images/hero.jpg`

### Step Icons (How It Works)
- SVG illustrations for each step (step1.svg, step2.svg, step3.svg)
- Style: Simple line art with #00A3C4 accent color
- Size: 80×80px display size
- Placement in card tops, centered

### Benefit Icons
- Use icon library (Heroicons) for consistent style
- Icons: Clock (flexibility), Map (local knowledge), Heart (community)
- Size: 32×32px, #00A3C4 color

### OG/Social Image
- Dimensions: 1200×630px
- Contains: Logo, tagline "あなたの街が仕事場になる", key benefit points
- Placement: `/assets/images/og.jpg`

### Image Loading
- All images: `loading="lazy"`
- Aspect-ratio containers to prevent CLS
- WebP format with JPG fallback

## Section-Specific Layouts

### Hero Section
- Full viewport height (`min-h-screen`) with centered content
- Content container: `max-w-3xl mx-auto text-center`
- CTA button group: Stacked on mobile, horizontal on desktop with `gap-4`
- Badges row below CTAs: Small pills with check icons, wrapped layout

### Benefits Section
- Background: #F8F9FA (light gray surface)
- 3-column grid on desktop, single column mobile
- Each card: Icon top, title, 2-3 line description
- Consistent card height on desktop for visual balance

### How It Works Section
- White background
- Number badges (1, 2, 3) in #00A3C4 circles above each step
- Connecting line visual (optional decorative element)
- Progressive disclosure: Step expands on mobile tap

### Audience Tabs Section
- Background: White
- Tab bar: Sticky on scroll (mobile), centered container
- Tab panels: Slide transition (200ms) on change
- Each panel: 2-column layout (content left, mini-FAQ right) on desktop
- Mini-FAQ: Accordion style, 1-2 items per audience

### Compensation & Safety
- 2-column grid (features left, trust elements right)
- Large ¥3,000/1h pricing displayed prominently
- Safety icons: Badge, star, shield representing verification features

### Early Adopter Campaign
- Background: Light #00A3C4/5 tinted section
- Centered content with urgency indicators
- Bonus amounts in large, bold typography
- "First 100" countdown visual (number in circle)

### FAQ Section
- Accordion interface, one question open by default
- Question: Bold, 1.125rem, chevron indicator
- Answer: Regular text, `pt-4`, subtle background on open
- Smooth expand/collapse: 300ms ease

### Footer
- Background: #1A1A1A (dark)
- Text: White and #9CA3AF
- 4-column layout (desktop): Company, Legal, Social, Newsletter
- Single column stack on mobile
- Social icons: 40×40px touch targets, #00A3C4 on hover

## Accessibility Requirements
- Skip to main content link (visually hidden until focused)
- Keyboard navigation: Tab order follows visual flow, arrow keys for tabs
- Focus indicators: 3px #00A3C4 ring on all interactive elements
- ARIA labels: All buttons, tabs, modals have proper roles and labels
- Color contrast: Minimum 4.5:1 for body text, 3:1 for large text
- Touch targets: Minimum 44×44px for all clickable elements
- Alt text: Descriptive for all images, decorative marked as empty

## Animation Principles
Use animations sparingly for functional feedback only:
- Tab transitions: 200ms ease slide/fade
- Modal open/close: 250ms ease scale + fade
- Button states: 150ms ease all
- Scroll-triggered: Subtle fade-in on section entrance (once)
- Fixed CTA bar: Slide up 300ms on scroll down

## Responsive Breakpoints
- Mobile: 360px - 767px (base styles)
- Tablet: 768px - 1023px (md:)
- Desktop: 1024px+ (lg:)
- Container max: 1280px (max-w-7xl)