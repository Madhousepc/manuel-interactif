# Design Guidelines - Manuel d'Utilisation Interactif

## Design Approach
**Selected Framework:** Design System Approach using Material Design 3 principles with documentation-focused enhancements
**Justification:** This is a utility-focused library management documentation tool requiring clarity, efficiency, and learnability. Material Design provides excellent patterns for information-dense applications with strong visual hierarchy.

## Core Design Philosophy
Create a professional, accessible documentation interface that combines traditional manual navigation with modern AI-assisted search. The design should feel authoritative yet approachable, prioritizing readability and procedural clarity.

## Color Palette

### Light Mode
- **Primary:** 200 60% 45% (Professional blue - library/institutional feel)
- **Primary Variant:** 200 55% 35% (Darker blue for emphasis)
- **Secondary:** 160 45% 50% (Teal accent for interactive elements)
- **Background:** 0 0% 98% (Warm white)
- **Surface:** 0 0% 100% (Pure white for cards/chat)
- **Surface Variant:** 200 20% 95% (Subtle blue tint for sections)
- **Text Primary:** 220 15% 20% (Nearly black with blue undertone)
- **Text Secondary:** 220 10% 45% (Muted for less important text)
- **Border:** 220 15% 88% (Subtle dividers)
- **Success:** 140 60% 45% (Procedure completion)
- **Warning:** 35 90% 55% (Important notes)

### Dark Mode
- **Primary:** 200 65% 60% (Lighter blue for contrast)
- **Primary Variant:** 200 70% 70%
- **Secondary:** 160 50% 60%
- **Background:** 220 15% 12% (Deep blue-black)
- **Surface:** 220 12% 16% (Elevated surface)
- **Surface Variant:** 220 15% 20% (Section backgrounds)
- **Text Primary:** 0 0% 95% (Off-white)
- **Text Secondary:** 220 5% 70%
- **Border:** 220 10% 25%

## Typography

**Font Stack:** 'Inter' for UI, 'Roboto Mono' for code/procedure numbers

### Hierarchy
- **H1 (Page Titles):** 32px/38px, font-weight 700, tracking -0.02em
- **H2 (Section Headers):** 24px/32px, font-weight 600, tracking -0.01em
- **H3 (Subsections):** 20px/28px, font-weight 600
- **H4 (Procedure Steps):** 16px/24px, font-weight 600
- **Body Large:** 16px/24px, font-weight 400
- **Body Regular:** 14px/22px, font-weight 400
- **Caption:** 12px/18px, font-weight 400
- **Code/Steps:** Roboto Mono 14px/20px

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Tight spacing: p-2, gap-2 (compact lists)
- Standard spacing: p-4, gap-4 (cards, general content)
- Section spacing: p-6, py-8 (major sections)
- Page spacing: p-8, py-12 (outer containers)
- Large breaks: py-16 (between major features)

**Container Strategy:**
- Main container: max-w-7xl mx-auto px-6
- Chat interface: max-w-4xl mx-auto
- Procedure display: max-w-3xl for optimal reading
- Sidebar navigation: w-72 fixed

## Component Library

### Navigation
- **Top Bar:** Fixed header with logo, search bar, theme toggle, user menu
- **Sidebar:** Collapsible category tree with icons (Catalogue, Prêt, Retour, Catalogage)
- **Breadcrumbs:** Show current location in manual hierarchy

### Chat Interface
- **Chat Container:** Centered column with message bubbles
- **User Messages:** Right-aligned, primary color background, white text, rounded-2xl
- **AI Responses:** Left-aligned, surface variant background, text primary, rounded-2xl with procedure formatting
- **Input Field:** Sticky bottom bar, elevated surface with shadow-lg, rounded-full input with send button
- **Typing Indicator:** Animated dots in AI message style

### Procedure Display
- **Step Cards:** Numbered circles (40px) with primary color, connected by vertical lines
- **Step Content:** Surface background, p-6, rounded-lg, shadow-sm
- **Screenshots:** Bordered with border color, rounded-md, max-w-full, shadow-sm
- **Code Blocks:** Surface variant background, Roboto Mono, p-4, rounded-md
- **Notes/Warnings:** Warning color left border (4px), warning/5 background, p-4

### Content Cards
- **Category Cards:** Hover-lift effect (shadow-md to shadow-xl), rounded-lg, p-6
- **Search Results:** Compact cards with highlight on matched terms (secondary/20 background)
- **Quick Access:** Icon + label, grid layout, hover scale effect

### Forms & Inputs
- **Text Fields:** Border 2px, rounded-lg, p-3, focus ring-2 ring-primary
- **Buttons Primary:** Primary background, white text, rounded-lg, px-6 py-3, shadow-sm, hover:shadow-md
- **Buttons Secondary:** Border 2px border-primary, primary text, hover:bg-primary/10
- **Buttons Icon:** Circular, 40px, secondary/10 background, hover:secondary/20

### Data Display
- **Tables:** Bordered, striped rows (surface variant), sticky headers
- **Lists:** Checkbox/bullet with 4px secondary left indicator for active items
- **Tags:** Rounded-full, text-xs, px-3 py-1, surface variant background

## Special Features

### Procedure Visualization
- Vertical timeline layout with connecting lines
- Expandable/collapsible sections for complex procedures
- Screenshot zoom on click (lightbox effect)
- Print-friendly formatting option

### AI Chat Enhancements
- Suggested questions as chips below input
- Copy response button on AI messages
- Feedback thumbs up/down on responses
- Source references linking to manual sections

### Search & Navigation
- Instant search with dropdown results
- Category filters with chip selection
- Keyboard navigation support (arrow keys, enter)
- Recent searches history dropdown

## Accessibility
- WCAG 2.1 AA compliance minimum
- Focus visible on all interactive elements (ring-2 ring-primary)
- Proper heading hierarchy for screen readers
- Alt text for all procedural screenshots
- Skip to content link
- High contrast mode toggle
- Consistent dark mode across all inputs and surfaces

## Images

### Header/Hero Section (if applicable)
- **Hero Image:** Professional library/education setting, subtle blur overlay
- **Placement:** Top of landing if included, otherwise jump directly to functionality
- **Size:** Full-width, 300px height on desktop, 200px mobile

### Procedural Screenshots
- **Actual screenshots** from the manual showing interface steps
- **Placement:** Inline with procedure steps, centered, max-width 800px
- **Treatment:** Subtle border, shadow-sm, rounded corners

### Icon Usage
- **Library:** Material Icons via CDN for consistency
- **Navigation Icons:** Filled style for active, outlined for inactive
- **Action Icons:** 24px size for buttons, 20px for inline

## Responsive Behavior
- **Desktop (lg+):** Sidebar visible, 3-column grids, full chat width
- **Tablet (md):** Collapsible sidebar, 2-column grids, comfortable spacing
- **Mobile (base):** Hidden sidebar (hamburger menu), single column, bottom sticky input

## Animation Principles
- **Minimal and purposeful** - no decorative animations
- Smooth transitions: 200ms ease-in-out for hovers
- Sidebar collapse/expand: 300ms ease-out
- Message appear: Fade-in 150ms with slight slide-up
- Loading states: Subtle skeleton screens or spinner