import { createContext } from "react";
import { themeVars } from "./theme.css";

export type ButtonThemeTokens = Partial<
  Record<keyof typeof themeVars, string>
>;

export const ButtonThemeContext = createContext<ButtonThemeTokens>({});
