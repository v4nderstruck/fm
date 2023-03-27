import { createContext, useEffect, useReducer } from "react"

export type ThemeState = {
  value: string;
}

export type ThemeAction = { type: "toggle" };

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        value: state.value === "cupcake" ? "dracula" : "cupcake"
      }
  }
}


export type ThemeContextType = {
  theme: ThemeState;
  dispatch: (action: ThemeAction) => void;
}

/// currently supported themes: cupcake, dracula see tailwind.config.js
const ThemeCtx = createContext<ThemeContextType>({
  theme: { value: "cupcake" },
  dispatch: () => { }
});

export type ThemeProviderProps = {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, themeDispatch] = useReducer(themeReducer, { value: "cupcake" } as ThemeState)
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme.value) }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme: theme, dispatch: themeDispatch }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export { ThemeCtx };
