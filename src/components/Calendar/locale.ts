import { createContext, useContext } from "react";

export interface CalendarLocale {
  locale: "ru-RU" | "en-US" | "ar-EG";
  dir: "ltr" | "rtl";
  /** 0 — Sunday, 1 — Monday, 6 — Saturday. */
  firstDayOfWeek: number;
  weekend: number[];
  messages: {
    calendar: {
      today: string;
      prevMonth: string;
      nextMonth: string;
      chooseDate: string;
      noDateSelected: string;
      calendarLabel: string;
    };
  };
}

export const ruRU: CalendarLocale = {
  locale: "ru-RU",
  dir: "ltr",
  firstDayOfWeek: 1,
  weekend: [6, 0],
  messages: {
    calendar: {
      today: "Сегодня",
      prevMonth: "Предыдущий месяц",
      nextMonth: "Следующий месяц",
      chooseDate: "Выберите дату",
      noDateSelected: "Дата не выбрана",
      calendarLabel: "Календарь",
    },
  },
};

export const enUS: CalendarLocale = {
  locale: "en-US",
  dir: "ltr",
  firstDayOfWeek: 0,
  weekend: [6, 0],
  messages: {
    calendar: {
      today: "Today",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      chooseDate: "Choose a date",
      noDateSelected: "No date selected",
      calendarLabel: "Calendar",
    },
  },
};

export const arEG: CalendarLocale = {
  locale: "ar-EG",
  dir: "rtl",
  firstDayOfWeek: 6,
  weekend: [5, 6],
  messages: {
    calendar: {
      today: "اليوم",
      prevMonth: "الشهر السابق",
      nextMonth: "الشهر التالي",
      chooseDate: "اختر تاريخًا",
      noDateSelected: "لم يتم اختيار تاريخ",
      calendarLabel: "التقويم",
    },
  },
};

export const locales = {
  "ru-RU": ruRU,
  "en-US": enUS,
  "ar-EG": arEG,
} satisfies Record<CalendarLocale["locale"], CalendarLocale>;

export const LocaleContext = createContext<CalendarLocale>(ruRU);

export const useLocale = () => useContext(LocaleContext);
