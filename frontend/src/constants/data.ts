export type Product = {
	photo_url: string
	name: string
	description: string
	created_at: string
	price: number
	id: number
	category: string
	updated_at: string
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: any[] = [
	{
		title: "Dashboard",
		url: "/Dashboard",
		icon: "dashboard",
		isActive: false,
		shortcut: ["d", "d"],
		items: [],
	},
	{
		title: "Playground",
		url: "/Playground/GAN",
		icon: "dashboard",
		isActive: false,
		shortcut: ["p", "p"],
		items: [],
	},
]
