import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to 'system'
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updateActualTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setActualTheme(systemTheme);
      } else {
        setActualTheme(theme);
      }
    };

    updateActualTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setIsTransitioning(true);
        setTimeout(() => {
          updateActualTheme();
          setTimeout(() => setIsTransitioning(false), 150);
        }, 50);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    // Apply theme to DOM with smooth transition
    const root = document.documentElement;
    
    // Add transition class before theme change
    root.classList.add('theme-transitioning');
    setIsTransitioning(true);
    
    // Small delay to ensure transition class is applied
    setTimeout(() => {
      root.classList.remove('light', 'dark');
      root.classList.add(actualTheme);
      
      // Store theme preference
      localStorage.setItem('theme', theme);
      
      // Remove transition class after animation
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 300);
    }, 50);
  }, [theme, actualTheme]);

  const handleThemeChange = (newTheme: Theme) => {
    setIsTransitioning(true);
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleThemeChange,
    actualTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}