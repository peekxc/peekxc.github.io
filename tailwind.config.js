const plugin = require('tailwindcss/plugin')

const typographyShared = {
  css: {
    // codeblock are handled with highlight.js
    // disable tailwind typography for codeblocks
    pre: false,
    code: false,
    'pre code': false,
    'code::before': false,
    'code::after': false
  }
};

module.exports = { 
	content: ['./_includes/*.pug', './_includes/partials/*.pug', './_includes/**/*.pug', './docs/**/*.html'],
	// important: false,
	important: true,
	// separator: '_', // DON'T: THIS BREAKS HOVER -- For better looking pug code! => classes are .text_center, hover_*, etc. 
	extend: {
		border: ['hover'],
		// fontFamily: {
		// 	sans: [
		// 		['"Proxima Nova"', 'Helvetica Neue', 'Arial'],
		// 	]
		// }
		typography: {
			default: {
				DEFAULT: typographyShared,
        sm: typographyShared,
        md: typographyShared,
        lg: typographyShared,
        xl: typographyShared,
        '2xl': typographyShared
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'), 
		// require("tw-elements/dist/plugin.cjs") // for TailWind elements JS 
	],
	// fontFamily: {
	// 	sans: [
	// 		['"Proxima Nova"', 'Helvetica Neue', 'Arial']
	// 	]
	// },
	// screens: {
	// 	'2xl': {'max': '1535px'},
	// 	'xl': {'max': '1279px'},
	// 	'lg': {'max': '1023px'},
	// 	'md': {'max': '767px'},
	// 	'sm': {'max': '639px'}
	// },
	// variants: {
	// 	borderColor: ['responsive', 'hover', 'focus', 'active'],
	// 	backgroundColor: ['responsive', 'hover', 'focus', 'active'], 
	// 	textColor: ['responsive', 'hover', 'focus', 'active'],
	// 	overflow: ['responsive', 'hover', 'focus'], 
	// 	overscrollBehavior: ['responsive', 'hover', 'focus']
	// }
	// theme: {
	// 	colors: {
	// 		transparent: 'transparent',
	// 		orange: '#f05e23', 
	// 		red: '#ff0000',
	// 		white: '#ffffff', 
	// 		lightgray: '#cecece', 
	// 		black: '#000000',
	// 		gray: {
	// 			'': '#808080',
	// 			'100': '#f5f5f5',
	// 			'200': '#eeeeee',
	// 			'300': '#e0e0e0',
	// 			'400': '#bdbdbd',
	// 			'500': '#9e9e9e',
	// 			'600': '#757575',
	// 			'700': '#616161',
	// 			'800': '#424242',
	// 			'900': '#212121',
	// 		}
	// 	}
  // },
	// fontSize: {
	// 	xs: ['0.75rem', { lineHeight: '1rem' }],
	// 	sm: ['0.875rem', { lineHeight: '1.25rem' }],
	// 	base: ['1rem', { lineHeight: '1.5rem' }],
	// 	lg: ['1.125rem', { lineHeight: '1.75rem' }],
	// 	xl: ['1.25rem', { lineHeight: '1.75rem' }]
	// },
	// fontWeight: {
	// 	thin: '100',
	// 	extralight: '200',
	// 	light: '300',
	// 	normal: '400',
	// 	medium: '500',
	// 	semibold: '600',
	// 	bold: '700',
	// 	extrabold: '800',
	// 	black: '900',
	// }, 
	// For what preflight does, see: https://v2.tailwindcss.com/docs/preflight
	corePlugins: {
		preflight: true // turning this to false destroys the styles
	}
}
// npx tailwindcss --output lib/css/tw_styles.css