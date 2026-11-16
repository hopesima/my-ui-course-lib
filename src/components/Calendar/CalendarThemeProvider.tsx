import type { PropsWithChildren } from "react";

type CalendarTheme = "light" | "dark";

type CalendarThemeProviderProps = PropsWithChildren<{
  theme?: CalendarTheme;
}>;

export function CalendarThemeProvider({
  theme = "light",
  children,
}: CalendarThemeProviderProps) {
  return <div data-calendar-theme={theme}>{children}</div>;
}
