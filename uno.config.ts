import { defineConfig, presetTypography,  presetWind3, presetWind4, presetIcons, presetWebFonts, presetMini } from 'unocss'

// TODO: https://unocss.dev/presets/web-fonts
export default defineConfig({
	presets: [
		presetWind4(),
		presetTypography()
	],
	preflights: [
		{
			getCSS: () => `
				article a[href]  {
					color: #000000;
					font-weight: 500;
					text-decoration: underline;
					text-decoration-thickness: 1px;
					text-underline-offset: 3px;
					text-decoration-skip-ink: auto;
					transition: color 150ms ease;
				}

				article a[href]:hover,
				article a[href]:focus-visible {
					color: #ff7d13;
				}

				article a[href]:focus-visible {
					outline: 2px solid #ff7d13;
					outline-offset: 4px;
				}
				article ul {
					list-style: inside;
				}
			`,
		},
	],
	shortcuts: {
		'card-base': 'rounded-2xl shadow p-4 bg-white',
		'flex-center': 'flex items-center justify-center',
		'tag': 'text-black text-xs px-2 rounded-sm mr-1 min-w-0 py-0.5 bg-slate-100/80 text-slate-600 border border-slate-200/50',
		'icon-round': 'py-1 px-2 min-w-0 text-xs text-black bg-neutral-300 rounded-xs flex gap-2 text-center', 
		'three-col-main': 'col-span-10 lg:col-span-8 2xl:col-span-6',
		'three-col-side': 'col-span-1 lg:col-span-2 2xl:col-span-3'
	},
	rules: [
		['tag', {'white-space': 'nowrap', 'padding-top': '0.15em', 'padding-bottom': '0.15em', }]
	],
	theme: {
		colors: {
			primary: '#dc2626',
			secondary: '#4b5563',
		},
	}, 
	safelist: ['grid-rows-[0fr]', 'grid-rows-[1fr]', 'rotate-180'],
})
