import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your file structure
    ],
    corePlugins: {
        preflight: false, // Disable Tailwind's Preflight styles
    },
    theme: {
        extend: {},
    },
    plugins: [],
} as Config;
