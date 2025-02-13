import type { Config } from "tailwindcss"

import svgToDataUri from "mini-svg-data-uri"

const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			transitionDelay: {
				"2000": "2000ms",
				"2500": "2500ms",
				"3000": "3000ms",
				"3500": "3500ms",
				"4000": "4000ms",
				"4500": "4500ms",
			},
			height: {
				120: "120px",
				132: "132px",
				150: "150px",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				brand: {
					DEFAULT: "hsl(var(--brand))",
					foreground: "hsl(var(--brand-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"move-hero-up": {
					from: {
						transform: "translateY(100%)",
						visibility: "hidden",
					},
					to: {
						transform: "translateY(0)",
					},
				},
				marquee: {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: "translateX(calc(-100% - var(--gap)))",
					},
				},
				appear: {
					"0%": {
						opacity: "0",
						transform: "translateY(1rem)",
						filter: "blur(.5rem)",
						visibility: "hidden",
					},
					"50%": {
						filter: "blur(0)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
						filter: "blur(0)",
						visibility: "visible",
					},
				},
				"appear-zoom": {
					"0%": {
						opacity: "0",
						transform: "scale(.5)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				"pulse-hover": {
					"0%": {
						opacity: "1",
						transform: "translateY(0)",
					},
					"50%": {
						opacity: "0.5",
						transform: "translateY(-1rem)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				hover: {
					"0%": {
						transform: "translateY(0) translateX(0)",
					},
					"50%": {
						transform: "translateY(-1rem) translateX(1rem)",
					},
					"100%": {
						transform: "translateY(0) translateX(0)",
					},
				},
				"hover-reverse": {
					"0%": {
						transform: "translateY(0) translateX(0)",
					},
					"50%": {
						transform: "translateY(1rem) translateX(1rem)",
					},
					"100%": {
						transform: "translateY(0) translateX(0)",
					},
				},
				"pulse-fade": {
					"0%": {
						opacity: "1",
					},
					"50%": {
						opacity: "0.3",
					},
					"100%": {
						opacity: "1",
					},
				},
				moveUp: {
					from: {
						transform: "translateY(0)",
					},
					to: {
						transform: "translateY(-100%)",
					},
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"moving-up":
					"moveUp 2s cubic-bezier(0.3, 0.05, 0.1, 1) 2.75s forwards",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				appear: "appear 0.6s forwards ease-out",
				"appear-zoom": "appear-zoom 0.6s forwards ease-out",
				"pulse-hover": "pulse-hover 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			spacing: {
				container: "1280px",
			},
			boxShadow: {
				"glow-sm": "0 0 16px 0 hsla(var(--foreground) / 0.08) inset",
				"glow-md": "0 0 32px 0 hsla(var(--foreground) / 0.08) inset",
				"glow-lg": "0 0 64px 0 hsla(var(--foreground) / 0.06) inset",
			},
		},
	},
	plugins: [
		addVariablesForColors,
		require("tailwindcss-animate"),
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme("backgroundColor")),
					type: "color",
				}
			)
		},
	],
}

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		":root": newVars,
	})
}

export default config
