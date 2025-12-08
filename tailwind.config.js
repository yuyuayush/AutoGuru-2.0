// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Primary Gold Theme
//         primary: {
//           DEFAULT: "#bf953f", // Standard Gold (used in borders/accents)
//           light: "#c6ba37",   // Brighter/Yellow Gold (middle of gradient)
//           dark: "#b38728",    // Darker Gold (end of gradient)
//           start: "#c4912c",   // Start of gradient
//           glow: "#fcf6ba",    // Very light/white gold (used in hover text)
//         },
//         // Dark Theme Surfaces
//         secondary: {
//           DEFAULT: "#171717", // Neutral 900 equivalent (Button backgrounds)
//           border: "#404040",  // Neutral 700 equivalent (Button borders)
//         },
//         // Background Colors
//         background: {
//           DEFAULT: "#000000", // Pure Black
//           soft: "rgba(38, 38, 38, 0.2)", // Neutral 800 with opacity (Spotlight effects)
//         },
//         // Text/Foreground Colors
//         foreground: {
//           DEFAULT: "#ffffff", // Pure White
//           muted: "#9ca3af",   // Gray 400 (Subtitles)
//           dim: "#d1d5db",     // Gray 300 (Secondary text)
//         },
//       },
//       // Custom Gradient Shortcuts
//       backgroundImage: {
//         'gold-gradient': 'linear-gradient(to right, #c4912c, #c6ba37, #b38728)',
//         'hero-fade': 'linear-gradient(to top, #000000, rgba(0,0,0,0.2), transparent)',
//       },
//       // Font Configuration
//       fontFamily: {
//         sans: ['var(--font-inter)', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };