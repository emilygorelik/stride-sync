import { ReactNode, createContext, useEffect, useState } from 'react';

type ThemeContextType = { theme: string };

export const ThemeContext = createContext<ThemeContextType>({ theme: '' });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('purple');
  const value: ThemeContextType = { theme };

  const toggleTheme = () => {
    setTheme(theme === 'purple' ? 'green' : 'purple');
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className="h-screen w-screen overflow-hidden">
        {children}
        <div className="form-control absolute bottom-0 m-8">
          <p className="label cursor-pointer">
            <input
              className="checkbox-primary checkbox border-2 border-base-100"
              onClick={toggleTheme}
              type="checkbox"
            />
            <span className="label text-base-100">Toggle Theme</span>
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
