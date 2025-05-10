'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  const [isMounted, setIsMounted] = useState(false);

  // Effect to set isMounted to true once the component has mounted on the client.
  useEffect(() => {
    setIsMounted(true);
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Effect to apply the theme class to the HTML element when the theme changes or when the component mounts.
  useEffect(() => {
    if (isMounted) { // Only run this logic if the component has mounted.
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light'); // Be explicit
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light'); // Be explicit
      }
      // Persist middleware from Zustand handles localStorage.
    }
  }, [theme, isMounted]); // Re-run when theme or isMounted status changes.

  // To prevent FOUC (Flash Of Unstyled Content) or hydration errors with theme,
  // we don't render children until the component has mounted and the initial theme can be applied.
  if (!isMounted) {
    return null; 
    // Alternatively, you could return a loading spinner or a basic unstyled layout,
    // but null is common for this pattern if a <script> in <head> isn't used for initial theme.
  }

  return <>{children}</>;
}
