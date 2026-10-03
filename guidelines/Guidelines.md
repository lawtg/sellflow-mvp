# SellFlow — Design Guidelines

## Stance
Premium modern SaaS · Calm, intelligent, conversion-focused · Trustworthy without being cold.

## Typography
- **Font**: Plus Jakarta Sans (Google Fonts) — all weights 300–800
- **Mono**: JetBrains Mono — used for code labels, card numbers, order IDs
- **Scale**: Display 52–64px / H1 40px / H2 32px / H3 24px / Body 14–15px / Small 12–13px / Caption 11px
- **Weight convention**: 800 for display headlines, 700 for section headings, 600 for labels and buttons, 500 for nav items, 400 for body text

## Color System
| Token | Value | Usage |
|---|---|---|
| Brand primary | `#5847F5` | Buttons, active nav, links, CTAs, progress |
| Brand hover | `#4636E0` | Hover state of brand primary |
| Brand light | `#EEF0FF` | Tinted backgrounds, selected states |
| AI accent | `#7C3AED` | AI-specific UI elements |
| AI light | `#F0EBFF` | AI card backgrounds |
| Background | `#F8F8FC` | Page background |
| Surface | `#FFFFFF` | Cards, panels, modals |
| Border | `#E4E4EF` | Hairline rules, card borders |
| Text primary | `#0B0B18` | Headings, strong content |
| Text secondary | `#4E4E68` | Body copy, descriptions |
| Text muted | `#9292A8` | Labels, captions, placeholders |
| Success | `#0CAF60` | Published status, positive indicators |
| Success light | `#E6F9F0` | Success badge backgrounds |
| Warning | `#F59E0B` | Attention states |
| Error | `#EF4444` | Error states, destructive actions |

## AI Visual Language
AI features always use `✦` prefix in button labels (e.g. `✦ Improve with AI`).
AI card background: gradient from `#EEF0FF` to `#F0EBFF` with `#D4CCFF` border.
Sparkles icon from lucide-react is the primary AI icon.
Never use neon colors or futuristic typography for AI elements — keep it calm and premium.

## Status Badges
- **Published**: `bg-[#E6F9F0] text-[#0CAF60]`
- **Draft**: `bg-[#F4F4F8] text-[#9292A8]`
- **Archived**: `bg-[#F4F4F8] text-[#ADADC4]`

## Component Patterns
- **Buttons**: `rounded-xl`, 10px vertical padding, 600 weight
- **Cards**: `rounded-2xl`, `border border-[#E4E4EF]`, white background
- **Inputs**: `rounded-xl`, `border border-[#E4E4EF]`, focus ring `ring-2 ring-[#5847F5]/10`
- **Tables**: no outer border, `border-b border-[#F4F4F8]` between rows
- **Sidebar width**: 220px, sticky, full height

## Spacing
Base unit: 4px. Use Tailwind's scale (p-4=16px, p-5=20px, p-6=24px). Sections breathe — never feel cramped.

## Shadows
Sparingly. Primary button: `shadow-[0_2px_16px_rgba(88,71,245,0.25)]`. Cards: none or `shadow-[0_2px_8px_rgba(0,0,0,0.04)]`.
