# MJP website code

Source code for statically generating my personal website [mattpiekenbrock.com](https://mattpiekenbrock.com/) (also at [peekxc.github.io](https://peekxc.github.io)).

This site was built using [MDX](https://mdxjs.com/) and [Astro](https://www.11ty.dev/). 
The CSS is generated from a custom TailwindCSS styling via [UnoCSS](https://unocss.dev/guide/).

## Layout format

For any given source file, the following workflow ([inspired from here](https://quarto.org/docs/output-formats/docusaurus#workflow)) is as follows:

**source.qmd** => _quarto_ => **source.md** => _eleventy_ => **source.html**

Canonically, the cascade is as follows:

1. Write content `*.qmd` or `*.md` documents in `/content`
2. Call _quarto_ to render convert any `*.qmd` to pure `*.md` files (GFM)
3. Write template `.pug` files for site generation in `/_includes`
4. Call _eleventy_ to merge the content from (2) with the templates from (3), generating the final html site in `/docs`

Each piece of content must be stored as a directory + markdown file, similar to the idea of [page bundles](https://gohugo.io/content-management/page-bundles/), wherein a "page" constitutes a directory with markdown text storing the text content alongside additional folders or files holding the rendered images, videos, resources, code outputs, JS includes, etc.

## Development workflow

From root: 

|-----------------------------------------------------------------|
| render `/content/**.qmd` => `/content/**.md` | `quarto render` |
| render `/content/**.md` => `/docs/**.html` | `npx eleventy` |
|-----------------------------------------------------------------|

To develop the entire website actively, use:

```bash
quarto render && npx eleventy --config eleventy.config.js --watch --serve
```

To switch to rendering only blog posts and watching, use:

```bash
quarto render content/posts && eleventy --config eleventy.config.js --watch --serve
```

The entire website can be quickly previewed in incremental mode using:

```bash
quarto preview --no-browser .
```

To pre-process the custom CSS styles from tailwind, use:

```bash
npx tailwindcss -i styles.css -m --output content/css/tw_styles.css
```

To minimize the CSS, use the CLI command:

```bash
npx lightningcss --minify --bundle content/css/*.css --output-dir docs/css/
```

<!-- MY_ENVIRONMENT=production -->

On generation, all source css/js/font/img assets that are stored in `/content` and statically copied to `/docs`, which is then used as the root host for GH pages.

## TODO

- Use google console to ensure GH.io site / main site are canonicalized (see: https://ahrefs.com/blog/canonical-tags/)
- Switch to gulp?
- Finish the grid layout and styling
- Add categories and tags pages
- Add static "search support" / filtering with elastic-lunar
- Use eleventy filter to provide sections in markdown for sidebar support
- Implement the tricks from [the high performance blog](https://github.com/google/eleventy-high-performance-blog)
- Port the text content to make it configurable from \_data'
- Figure out layout chaining problem vs readHTML filter solution used now
- Add better production flag
- Add 'eleventy-plugin-heroicons' and figure out pug eq.
- Compress images to webP with https://squoosh.app/editor, or somehow automate it
- Fixed ENOENT errors on vercel files
- Figure out how to have less verbosity in the compression of HTML/CSS file minimizers

## Done

- Switch to eleventy 3.0
- Added image / js / css / html minimizers
- Enabled brotli compressions
- Fixed most of the layout shifting issues
- Removed tailwind-elements.js and jquery.js dependencies for page performance
- Moved relevent katex.min and code highlighting styles to the blog/single_md templates
- Switched to bun

## NOTES

- The eleventy-img plugin is buggy, at least the universal transform
- Dont use .container

## Updated w/ Astro 



Fonts: 
- NunitoSans 
- Vollkorn
- et-book 
- iAWriterQuattroS
- monaspace
- Satoshi 

## Styling System

Styling is centered in `uno.config.ts`. The project follows UnoCSS/Tailwind conventions: atomic design values live in `theme`, and Uno generates standard utilities from them. Shortcuts are reserved for repeated multi-utility recipes.

Use raw utilities for layout and normal typography:

```html
flex items-center justify-between gap-3 text-4xl font-semibold tracking-tight text-ink-strong
```

Use shortcuts only for repeated recipes:

```html
surface-card-interactive focus-ring
```

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
