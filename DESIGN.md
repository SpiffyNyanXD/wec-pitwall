# WEC Pitwall Design System

## Philosophy
- **Dark-mode-only**: The application is exclusively dark mode to reduce eye strain and provide a premium, race-control feel.
- **Data-dense but scannable**: Complex information should be presented clearly without overwhelming the user. Use tabular layouts for numbers.
- **Professional**: Not a fan blog. The tone and visual style should be objective, sharp, and analytics-focused.
- **Performance-first**: Minimize heavy animations, rely on CSS transitions, and ensure fast initial loads.

## Colors
- **Background**: `#0a0a0a`
- **Surface**: `#121212` / `#1a1a1a`
- **Accent (WEC Red)**: `#E8002D`
- **Text**: `#ffffff` (Primary) / `#a1a1aa` (Secondary)
- **Border**: `#27272a`
- **Success**: `#22c55e`
- **Danger**: `#ef4444`

## Typography
- **Primary (UI/Body)**: Inter
- **Numeric/Data (Lap times, gaps, car numbers, countdowns)**: Orbitron or JetBrains Mono ONLY.
- **Rule**: Always use `tabular-nums` on numeric tables to prevent layout shifting.

## Layout
- **Max Width**: `max-w-screen-2xl`
- **Responsiveness**: Mobile-first design approach.
- **Scrolling**: Prevent horizontal scrolling at all viewports (unless explicitly in a data table wrapper).

## Components
- **Library**: `shadcn/ui` components exclusively.
- **Loading States**: Use `BoneyardSkeleton` for loading screens. Never use spinners.

## Motion & Animation
- **Animations**: CSS-only, subtle transitions.
- **Live Status**: Use `animate-pulse` for LIVE badges and active sessions.

## Icons
- **Library**: `lucide-react`
- **Standard Sizes**: `16` or `20` pixels.

## AI Rules
- **Colors & Fonts**: Never add new colors or fonts inline.
- **Styling**: Always use Tailwind CSS utility classes.
- **Numbers**: Always apply `tabular-nums` for numbers.
- **Responsiveness**: Always verify mobile layout rendering.
