import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default theme
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        // DOM manipulation will be handled by ThemeProvider
        set({ theme: newTheme });
      },
      setTheme: (newTheme) => {
        // DOM manipulation will be handled by ThemeProvider
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage', 
      storage: createJSONStorage(() => localStorage), 
      // onRehydrateStorage can be used to apply the theme class immediately on load
      // For example, if ThemeProvider mounts too late.
      // For now, ThemeProvider will handle initial class setting.
      // Example of onRehydrateStorage if needed:
      // onRehydrateStorage: () => (state) => {
      //   if (state && typeof window !== 'undefined') {
      //     if (state.theme === 'dark') {
      //       document.documentElement.classList.add('dark');
      //     } else {
      //       document.documentElement.classList.remove('dark');
      //     }
      //   }
      // }
    }
  )
);

// The ThemeProvider component will be responsible for:
// 1. Reading the initial theme from localStorage/system preference on client-side mount.
// 2. Setting the initial theme in the Zustand store.
// 3. Subscribing to theme changes in the store and updating the class on `document.documentElement`.
