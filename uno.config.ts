import { defineConfig, presetTypography, presetWind4 } from 'unocss'

const tokens = {
	colors: {
		brand: '#ea581c',
		brandHover: '#ff7d13',
		brandSoft: 'rgba(234,88,28,0.10)',
		inkStrong: '#0f172a',
		ink: '#334155',
		inkMuted: '#64748b',
		inkSubtle: '#94a3b8',
		surfacePage: '#fdfdfd',
		surfaceCard: 'rgba(255,255,255,0.95)',
		surfaceRaised: 'rgba(255,255,255,0.80)',
		surfaceMuted: 'rgba(248,250,252,0.70)',
		line: '#e2e8f0',
		lineStrong: '#94a3b8',
		lineSoft: 'rgba(226,232,240,0.70)',
	},
	shadows: {
		card: '0 1px 3px rgba(15,23,42,0.06)',
		cardHover: '0 8px 24px rgba(15,23,42,0.10)',
		cardOpen: '0 10px 28px rgba(15,23,42,0.11), 0 0 0 1px rgba(234,88,28,0.10)',
	},
	radii: {
		card: '0.125rem',
	},
}

// TODO: https://unocss.dev/presets/web-fonts
export default defineConfig({
	presets: [
		presetWind4(),
		presetTypography()
	],
	preflights: [
		{
			getCSS: () => `
				:root {
					--color-brand: ${tokens.colors.brand};
					--color-brand-hover: ${tokens.colors.brandHover};
					--color-brand-soft: ${tokens.colors.brandSoft};
					--color-ink-strong: ${tokens.colors.inkStrong};
				}

				article a[href]  {
					color: ${tokens.colors.inkStrong};
					font-weight: 500;
					text-decoration: underline;
					text-decoration-thickness: 1px;
					text-underline-offset: 3px;
					text-decoration-skip-ink: auto;
					transition: color 150ms ease;
				}

				article a[href]:hover,
				article a[href]:focus-visible {
					color: ${tokens.colors.brandHover};
				}

				article a[href]:focus-visible {
					outline: 2px solid ${tokens.colors.brandHover};
					outline-offset: 4px;
				}
				article ul {
					list-style: inside;
				}

				.accent-card::before {
					content: '';
					position: absolute;
					inset: 0 auto 0 0;
					width: 3px;
					background: var(--color-brand);
					opacity: 0;
					pointer-events: none;
					transition: opacity 200ms ease;
					z-index: 20;
				}

				.accent-card:hover::before {
					opacity: 0.55;
				}

				.accent-card.is-open::before {
					opacity: 1;
				}
			`,
		},
	],
	shortcuts: {
		// Recipes compose existing utilities. Atomic values belong in theme below.
		'surface-card': 'bg-surface-card border border-line rounded-card shadow-card ring-1 ring-black/[0.02]',
		'surface-card-interactive': 'surface-card transition-all duration-200 hover:border-line-strong hover:shadow-card-hover hover:cursor-pointer',
		'surface-card-open': 'border-line-strong shadow-card-open',
		'surface-panel': 'rounded-card border border-line-soft bg-surface-raised',
		'surface-muted': 'rounded-card bg-surface-muted',
		'media-frame': 'overflow-hidden rounded-card border border-line bg-surface-muted',
		'eyebrow': 'text-xs font-semibold uppercase tracking-[0.35em] text-ink-muted',
		'focus-ring': 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-strong focus-visible:ring-offset-2',
		'link-ui': 'font-semibold text-ink-strong decoration-line-strong transition hover:text-brand hover:decoration-brand',
		'link-accent': 'font-semibold text-ink-strong transition hover:text-brand',
		'card-base': 'surface-card p-4',
		'flex-center': 'flex items-center justify-center',
		'tag': 'whitespace-nowrap rounded-sm border border-line-soft bg-surface-muted px-2 py-0.5 text-xs font-semibold tracking-[0.1em] text-ink-muted',
		'icon-round': 'py-1 px-2 min-w-0 text-xs text-black bg-neutral-300 rounded-xs flex gap-2 text-center',
		'three-col-main': 'col-span-10 lg:col-span-8 2xl:col-span-6',
		'three-col-side': 'col-span-1 lg:col-span-2 2xl:col-span-3'
	},
	theme: {
		colors: {
			primary: tokens.colors.brand,
			secondary: tokens.colors.inkMuted,
			brand: {
				DEFAULT: tokens.colors.brand,
				hover: tokens.colors.brandHover,
				soft: tokens.colors.brandSoft,
			},
			ink: {
				DEFAULT: tokens.colors.ink,
				strong: tokens.colors.inkStrong,
				muted: tokens.colors.inkMuted,
				subtle: tokens.colors.inkSubtle,
			},
			surface: {
				page: tokens.colors.surfacePage,
				card: tokens.colors.surfaceCard,
				raised: tokens.colors.surfaceRaised,
				muted: tokens.colors.surfaceMuted,
			},
			line: {
				DEFAULT: tokens.colors.line,
				strong: tokens.colors.lineStrong,
				soft: tokens.colors.lineSoft,
			},
		},
		shadow: {
			card: tokens.shadows.card,
			'card-hover': tokens.shadows.cardHover,
			'card-open': tokens.shadows.cardOpen,
		},
		radius: {
			card: tokens.radii.card,
		},
	},
	safelist: ['grid-rows-[0fr]', 'grid-rows-[1fr]', 'rotate-180'],
})
