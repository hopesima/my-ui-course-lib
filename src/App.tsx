import { useState } from "react";
import { Button } from "./components/Button";
import {
  Calendar,
  CalendarThemeProvider,
  LocaleContext,
  locales,
} from "./components/Calendar";
import type { CalendarLocale } from "./components/Calendar";
import { ThemeContext } from "./theme/ThemeContext";
import "./App.css";

const buttonExamples = [
  { variant: "fill", size: "S" },
  { variant: "fill", size: "M" },
  { variant: "fill", size: "L" },
  { variant: "outline", size: "S" },
  { variant: "outline", size: "M" },
  { variant: "outline", size: "L" },
  { variant: "text", size: "S" },
  { variant: "text", size: "M" },
  { variant: "text", size: "L" },
] as const;

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [localeCode, setLocaleCode] = useState<CalendarLocale["locale"]>("ru-RU");
  const [calendarTheme, setCalendarTheme] = useState<"light" | "dark">("light");

  return (
    <main className="app">
      <section className="calendar-demo">
        <div className="calendar-demo-heading">
          <div>
            <p className="eyebrow">UI COMPONENT</p>
            <h1>Calendar</h1>
            <p className="calendar-description">
              Выбор даты, локализация, RTL и две цветовые темы.
            </p>
          </div>

          <div className="calendar-demo-controls">
            <label className="demo-control">
              <span>Язык</span>
              <select
                value={localeCode}
                onChange={(event) =>
                  setLocaleCode(event.target.value as CalendarLocale["locale"])
                }
              >
                <option value="ru-RU">Русский</option>
                <option value="en-US">English</option>
                <option value="ar-EG">العربية</option>
              </select>
            </label>

            <label className="demo-control">
              <span>Тема</span>
              <select
                value={calendarTheme}
                onChange={(event) =>
                  setCalendarTheme(event.target.value as "light" | "dark")
                }
              >
                <option value="light">Светлая</option>
                <option value="dark">Тёмная</option>
              </select>
            </label>
          </div>
        </div>

        <div className="calendar-demo-preview">
          <CalendarThemeProvider theme={calendarTheme}>
            <LocaleContext.Provider value={locales[localeCode]}>
              <Calendar value={selectedDate} onValueChange={setSelectedDate} />
            </LocaleContext.Provider>
          </CalendarThemeProvider>
        </div>
      </section>

      <section className="button-examples">
        <div className="section-heading">
          <h2>Button</h2>
        </div>

        <div className="table-wrapper">
          <table className="button-table">
            <thead>
              <tr>
                <th scope="col">Вариант</th>
                <th scope="col">Размер</th>
                <th scope="col">Обычное состояние</th>
                <th scope="col">Disabled</th>
              </tr>
            </thead>
            <tbody>
              {buttonExamples.map(({ variant, size }) => (
                <tr key={`${variant}-${size}`}>
                  <th scope="row">{variant}</th>
                  <td>{size}</td>
                  <td>
                    <Button variant={variant} size={size}>
                      Кнопка
                    </Button>
                  </td>
                  <td>
                    <Button variant={variant} size={size} disabled>
                      Кнопка
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="theme-example">
          <h2>Кнопка с настройкой темы</h2>
          <ThemeContext
            tokens={{
              buttonFillBackgroundColor: "#15803d",
              buttonFillTextColor: "#ffffff",
              buttonFillHoverBackgroundColor: "#166534",
              buttonFillHoverTextColor: "#ffffff",
              buttonFillActiveBackgroundColor: "#14532d",
              buttonFillActiveTextColor: "#ffffff",
              buttonFillDisabledBackgroundColor: "#e2eee5",
              buttonFillDisabledTextColor: "#718078",
              buttonDisabledOpacity: "1",
            }}
          >
            <Button>Зеленая кнопка</Button>
            <Button disabled>Зеленая disabled-кнопка</Button>
          </ThemeContext>
        </section>
      </section>
    </main>
  );
}
