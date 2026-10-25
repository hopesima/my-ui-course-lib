import type { PropsWithChildren } from "react";
import { ButtonThemeContext, type ButtonThemeTokens } from "./buttonThemeContext";

type ThemeContextProps = PropsWithChildren<{
  tokens?: ButtonThemeTokens;
}>;

export function ThemeContext({ tokens = {}, children }: ThemeContextProps) {
  return (
    <ButtonThemeContext.Provider value={tokens}>
      {children}
    </ButtonThemeContext.Provider>
  );
}
