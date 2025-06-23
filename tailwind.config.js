/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html,css}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kalimati: ['Kalimati', 'sans-serif'],
                sans: ['"Nunito Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
    safelist: [
        // --- Essential Layout Classes from ChartGrid.jsx and general structure ---
        'flex',
        'h-screen',
        'overflow-hidden',
        'relative',
        'flex-col',
        'flex-1',
        'overflow-y-auto',
        'overflow-x-hidden',
        'flex-grow',
        'items-center', // Added for flex alignment
        'justify-center', // Added for flex alignment
        'space-x-4', // Added for spacing

        // --- Sidebar Specific Classes from Sidebar.jsx ---
        'w-64',
        'lg:w-20',
        'lg:sidebar-expanded:!w-64',
        'shrink-0',
        'p-4',
        'translate-x-0',
        '-translate-x-64',
        'lg:static',
        'lg:left-auto',
        'lg:top-auto',
        'lg:translate-x-0',
        'h-[100dvh]',
        'overflow-y-scroll',
        'lg:overflow-y-auto',
        'no-scrollbar',
        'transition-all',
        'duration-200',
        'ease-in-out',
        'rounded-r-2xl',
        'shadow-xs',
        // Classes for sidebar links and icons
        'text-sm',
        'font-bold',
        'ml-4',
        'lg:opacity-0',
        'lg:sidebar-expanded:opacity-100',
        '2xl:opacity-100',
        'block',
        'text-gray-800',
        'dark:text-gray-100',
        'truncate',
        'transition',
        'duration-150',
        'hover:text-gray-900',
        'dark:hover:text-white',
        'flex',
        'items-center',
        'shrink-0',
        'fill-current',
        'text-violet-500',
        'text-gray-400',
        'dark:text-gray-500',
        'fill-none',
        'stroke-current',
        'pl-4',
        'pr-3',
        'py-2',
        'rounded-lg',
        'mb-0.5',
        'last:mb-0',
        { pattern: /from-violet-500/, variants: ['dark'] },
        { pattern: /to-violet-500/, variants: ['dark'] },

        // --- Chart/Text related classes (from previous discussion and new additions) ---
        { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/ }, // Covers text-base, text-lg, text-4xl
        { pattern: /font-(normal|medium|semibold|bold)/ }, // Covers font-bold, font-semibold
        'chartjs-tooltip',
        'chartjs',
        'chartjs-render-monitor',
        'chartjs-tooltip',
        'chartjs-tooltip-title',
        'chartjs-tooltip-body',
        'chartjs-tooltip-footer',

        // Scrollbar plugin classes
        'scrollbar',
        'scrollbar-thumb-gray-400',
        'scrollbar-track-gray-200',
        'thin',

        // --- NEW CLASSES FROM THE LATEST ChartGrid.jsx CODE ---
        // Colors for the new icon backgrounds and text
        'bg-blue-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-[#8c6eff]', // Ensure this exact custom color is safelisted if used
        'text-blue-700',
        'text-gray-700', // Used for item names in detail cards

        // Grid layout for the top row of cards
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-4',
        'col-span-full', // Already present but good to confirm its use case

        // Utility classes for the detail cards
        'w-16', // For icon container width/height
        'h-16', // For icon container width/height
        'w-12', // Smaller icon container for male/female
        'h-12', // Smaller icon container for male/female
        'rounded-xl',
        'text-3xl', // Icon size for faHouse, faUsers
        'text-2xl', // Icon size for faMale, faFemale
        'space-y-2',
        'py-4',
        'justify-between',
        'border-b',
        'border-gray-200',
        'last:border-b-0',
    ],
};