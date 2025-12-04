export const themeUtils = {
    hexToRgb: (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    generateThemeColors: (primaryColor) => {
        const rgb = themeUtils.hexToRgb(primaryColor);
        if (!rgb) return null;

        return {
            primary: primaryColor,
            primaryLight: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
            primaryMedium: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
            primaryDark: `#${Math.max(0, rgb.r - 30).toString(16).padStart(2, '0')}${Math.max(0, rgb.g - 30).toString(16).padStart(2, '0')}${Math.max(0, rgb.b - 30).toString(16).padStart(2, '0')}`,
            primaryRgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
        };
    },

    applyTheme: (colors) => {
        document.documentElement.style.setProperty('--color-primary', colors.primary);
        document.documentElement.style.setProperty('--color-primary-light', colors.primaryLight);
        document.documentElement.style.setProperty('--color-primary-medium', colors.primaryMedium);
        document.documentElement.style.setProperty('--color-primary-dark', colors.primaryDark);
        document.documentElement.style.setProperty('--color-primary-rgb', colors.primaryRgb);
    },

    saveTheme: (colors) => {
        localStorage.setItem('appTheme', JSON.stringify(colors));
    },

    loadTheme: () => {
        const savedTheme = localStorage.getItem('appTheme');
        return savedTheme ? JSON.parse(savedTheme) : null;
    },

    initializeTheme: () => {
        const savedTheme = themeUtils.loadTheme();
        if (savedTheme) {
            themeUtils.applyTheme(savedTheme);
        } else {
            const defaultColors = themeUtils.generateThemeColors('#ff751a');
            themeUtils.applyTheme(defaultColors);
        }
    }
};