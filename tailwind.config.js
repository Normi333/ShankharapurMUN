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
        require('tailwind-scrollbar'),// Correctly added here
    ],
    safelist: [
        // --- Essential Layout Classes from ChartReportPage.jsx ---
        'flex',
        'h-screen',
        'overflow-hidden',
        'relative',
        'flex-col',
        'flex-1',
        'overflow-y-auto',
        'overflow-x-hidden',
        'flex-grow',

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
        'no-scrollbar', // If you still use this custom class, keep it. Otherwise, rely on 'scrollbar-hide'.
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

        // --- Chart/Text related classes (from previous discussion) ---
        { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/ },
        { pattern: /font-(normal|medium|semibold|bold)/ },
        'chartjs-tooltip',
        'chartjs',
        'chartjs-render-monitor',
        'chartjs-tooltip',
        'chartjs-tooltip-title',
        'chartjs-tooltip-body',
        'chartjs-tooltip-footer',

        'scrollbar',
        'scrollbar-thumb-gray-400', // Example: for light gray thumb
        'scrollbar-track-gray-200', // Example: for lighter track
        'thin',
        {
            pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/,
        },
        {
            pattern: /font-(normal|medium|semibold|bold)/,
        },
    ],
};