import { defineConfig, presetTypography,  presetWind3, presetWind4, presetIcons, presetWebFonts, presetMini } from 'unocss'

export default defineConfig({
  presets: [
		presetWind4(),
		// presetMini({preflight: true}),
    presetTypography(),
		// presetWind3(),
    presetIcons()
  ],
  shortcuts: {
    'card-base': 'rounded-2xl shadow p-4 bg-white',
    'flex-center': 'flex items-center justify-center',
  },
  theme: {
    colors: {
      primary: '#dc2626',
      secondary: '#4b5563',
    },
  },
})
