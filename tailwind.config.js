/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            colors: {
                // Google Dark Theme Tokens
                surface: {
                    DEFAULT: '#121212', // Pure Black
                    1: '#1E1E1E', // Pure Gray
                    2: '#222222',
                    3: '#252525',
                    4: '#272727',
                    5: '#2C2C2C',
                    container: {
                        lowest: '#0F0F0F', // Pure Darkest
                        low: '#181818',
                        DEFAULT: '#212121', // Neutral Gray
                        high: '#2B2B2B',
                        highest: '#333333',
                    }
                },
                primary: {
                    DEFAULT: '#4285F4', // Google Blue
                    on: '#FFFFFF',
                    container: '#174EA6',
                    'on-container': '#D2E3FC',
                },
                secondary: {
                    DEFAULT: '#A8C7FA',
                    on: '#062E6F',
                    container: '#0842A0',
                    'on-container': '#D3E3FD',
                },
                error: {
                    DEFAULT: '#F2B8B5',
                    on: '#601410',
                    container: '#8C1D18',
                    'on-container': '#F9DEDC',
                },
                outline: {
                    DEFAULT: '#8E918F', // Neutral Gray
                    medium: 'rgba(255, 255, 255, 0.60)',
                    disabled: 'rgba(255, 255, 255, 0.38)',
                    variant: '#444746',
                }
            },
            boxShadow: {
                'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
            }
        },
    },
    plugins: [],
}
