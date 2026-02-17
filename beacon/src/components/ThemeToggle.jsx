import { useState, useEffect } from "react";

function ThemeToggle() {
    
    // Determine initial theme based on localStorage or system preference
    // Checks localStorage for a saved theme, then falls back to system preference
    const getInitialTheme = () => {
        const saved = localStorage.getItem("theme");
        const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return saved !== null ? saved : browserTheme ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            className="toggle-btn"
            onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
            }
        >
            <span className="material-symbols-outlined">
                contrast
            </span>
        </button>
    );
}

export default ThemeToggle;
