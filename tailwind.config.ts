import { nextui } from "@nextui-org/theme"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|date-picker|dropdown|input|link|popover|select|ripple|spinner|calendar|date-input|menu|divider|listbox|scroll-shadow).js"
  ],
  theme: {},
  plugins: [nextui()],
}
export default config
