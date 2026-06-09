# MJP website code

Source code for statically generating my personal website [mattpiekenbrock.com](https://mattpiekenbrock.com/) (also at [peekxc.github.io](https://peekxc.github.io)).

This site was built using [MDX](https://mdxjs.com/) and [Astro](https://www.11ty.dev/). 
The CSS is generated from a custom TailwindCSS styling via [UnoCSS](https://unocss.dev/guide/).

# -- Internal notes -- 

Fonts: 
- NunitoSans 
- Vollkorn
- et-book 
- iAWriterQuattroS
- monaspace
- Satoshi 

## Styling System

Styling is centered in `uno.config.ts`. The project follows UnoCSS/Tailwind conventions: atomic design values live in `theme`, and Uno generates standard utilities from them. Shortcuts are reserved for repeated multi-utility recipes.

### Theme Tokens

- `brand`: color namespace for accent orange. Generates utilities such as `text-brand`, `bg-brand`, `border-brand`, and `hover:text-brand-hover`.
- `ink`: color namespace for text. Use `text-ink-strong` for headings, `text-ink` for normal text, `text-ink-muted` for secondary text, and `text-ink-subtle` for quiet metadata.
- `surface`: color namespace for backgrounds. Use `bg-surface-page`, `bg-surface-card`, `bg-surface-raised`, and `bg-surface-muted`.
- `line`: color namespace for borders/dividers. Use `border-line`, `border-line-strong`, and `border-line-soft`.
- `shadow`: card shadows are exposed as `shadow-card`, `shadow-card-hover`, and `shadow-card-open`.
- `radius`: the site card radius is exposed as `rounded-card`.

Only brand colors are also exposed as CSS variables (`--color-brand`, `--color-brand-hover`, `--color-brand-soft`) for component-local CSS and pseudo-elements that cannot use utility classes directly.

### Typography

Prefer standard Uno/Tailwind typography utilities composed with theme colors:

```html
text-4xl font-semibold tracking-tight text-ink-strong
text-sm leading-relaxed text-ink
text-xs font-medium text-ink-muted
```

The only typography shortcut currently kept is `eyebrow`, for repeated small uppercase labels:

```html
eyebrow
```

### Surface Roles

- `surface-card`: default visual card container.
- `surface-card-interactive`: card that can be hovered, clicked, opened, or otherwise interacted with.
- `surface-card-open`: open/active card state.
- `surface-panel`: nested panel inside a card.
- `surface-muted`: quiet background block.
- `media-frame`: image/media wrapper with consistent border, background, and radius.

### Interaction Roles

- `link-ui`: links inside UI cards and panels.
- `link-accent`: links that should use the orange brand accent.
- `focus-ring`: accessible focus treatment for interactive elements.
