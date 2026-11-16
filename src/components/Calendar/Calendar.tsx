import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "../Button";
import { useLocale } from "./locale";
import type { CalendarProps } from "./Calendar.types";
import { calendarVars } from "../../theme/theme.css";
import * as styles from "./Calendar.css";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function isSameMonth(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
  );
}

function isUnavailable(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  isDateDisabled?: (date: Date) => boolean,
): boolean {
  const normalizedDate = startOfDay(date);

  if (minDate && normalizedDate < startOfDay(minDate)) return true;
  if (maxDate && normalizedDate > startOfDay(maxDate)) return true;

  return isDateDisabled?.(normalizedDate) ?? false;
}

function findEnabledDate(
  startDate: Date,
  step: number,
  isEnabled: (date: Date) => boolean,
  maxAttempts = 3660,
): Date | null {
  let candidate = startOfDay(startDate);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (isEnabled(candidate)) return candidate;
    candidate = addDays(candidate, step);
  }

  return null;
}

function findInitialFocusDate(
  date: Date,
  isEnabled: (candidate: Date) => boolean,
): Date {
  const start = startOfDay(date);
  if (isEnabled(start)) return start;

  for (let distance = 1; distance <= 3660; distance += 1) {
    const forward = addDays(start, distance);
    if (isEnabled(forward)) return forward;

    const backward = addDays(start, -distance);
    if (isEnabled(backward)) return backward;
  }

  return start;
}

function getMonthTitle(date: Date, locale: string): string {
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  const year = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    date.getFullYear(),
  );
  const firstCharacter = Array.from(month)[0] ?? "";
  const capitalizedMonth = firstCharacter.toLocaleUpperCase(locale) + month.slice(firstCharacter.length);

  return `${capitalizedMonth} ${year}`;
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function Calendar({
  value,
  onValueChange,
  month,
  onMonthChange,
  minDate,
  maxDate,
  isDateDisabled,
  autoFocus = false,
}: CalendarProps) {
  const locale = useLocale();
  const today = useMemo(() => startOfDay(new Date()), []);
  const isEnabled = (date: Date) =>
    !isUnavailable(date, minDate, maxDate, isDateDisabled);

  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(month ?? value ?? today),
  );
  const visibleMonth = useMemo(
    () => startOfMonth(month ?? internalMonth),
    [internalMonth, month],
  );
  const [focusedDate, setFocusedDate] = useState(() =>
    findInitialFocusDate(value ?? today, isEnabled),
  );
  const firstDayOfVisibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  );
  const focusedVisibleDate =
    isSameMonth(focusedDate, visibleMonth) && isEnabled(focusedDate)
      ? focusedDate
      : findEnabledDate(firstDayOfVisibleMonth, 1, isEnabled, 31) ?? focusedDate;
  const focusedDayRef = useRef<HTMLButtonElement>(null);
  const shouldFocusAfterUpdate = useRef(false);

  useEffect(() => {
    if (autoFocus || shouldFocusAfterUpdate.current) {
      focusedDayRef.current?.focus();
      shouldFocusAfterUpdate.current = false;
    }
  }, [autoFocus, focusedDate, visibleMonth]);

  const weekdayLabels = useMemo(() => {
    const weekdayFormat = new Intl.DateTimeFormat(locale.locale, {
      weekday: locale.locale === "ar-EG" ? "narrow" : "short",
    });

    return Array.from({ length: 7 }, (_, index) => {
      const weekdayNumber = (locale.firstDayOfWeek + index) % 7;
      const referenceDate = new Date(2023, 0, 1 + weekdayNumber);
      return {
        key: weekdayNumber,
        label: weekdayFormat.format(referenceDate),
        isWeekend: locale.weekend.includes(weekdayNumber),
      };
    });
  }, [locale]);

  const calendarDays = useMemo(() => {
    const firstDay = startOfMonth(visibleMonth);
    const leadingEmptyDays =
      (firstDay.getDay() - locale.firstDayOfWeek + 7) % 7;
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0,
    ).getDate();
    const totalCells = Math.ceil((leadingEmptyDays + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - leadingEmptyDays + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) return null;
      return new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), dayNumber);
    });
  }, [locale.firstDayOfWeek, visibleMonth]);

  const numberFormat = useMemo(
    () => new Intl.NumberFormat(locale.locale, { useGrouping: false }),
    [locale.locale],
  );
  const fullDateFormat = useMemo(
    () => new Intl.DateTimeFormat(locale.locale, { dateStyle: "full" }),
    [locale.locale],
  );

  const changeVisibleMonth = (nextMonth: Date) => {
    const normalizedMonth = startOfMonth(nextMonth);
    if (month === undefined) setInternalMonth(normalizedMonth);
    onMonthChange?.(normalizedMonth);
  };

  const navigateMonth = (amount: number) => {
    const nextMonth = addMonths(visibleMonth, amount);
    const preferredDay = Math.min(
      focusedDate.getDate(),
      new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate(),
    );
    const preferredDate = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      preferredDay,
    );
    const nextFocus = isEnabled(preferredDate)
      ? preferredDate
      : findEnabledDate(preferredDate, amount > 0 ? 1 : -1, isEnabled, 31);

    changeVisibleMonth(nextMonth);
    if (nextFocus) {
      setFocusedDate(nextFocus);
      shouldFocusAfterUpdate.current = true;
    }
  };

  const selectToday = () => {
    if (!isEnabled(today)) return;
    changeVisibleMonth(today);
    setFocusedDate(today);
    onValueChange(today);
    shouldFocusAfterUpdate.current = true;
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (event.key === "PageUp") {
      event.preventDefault();
      navigateMonth(event.shiftKey ? -12 : -1);
      return;
    }
    if (event.key === "PageDown") {
      event.preventDefault();
      navigateMonth(event.shiftKey ? 12 : 1);
      return;
    }

    const navigation = (() => {
      switch (event.key) {
        case "ArrowLeft":
          return { date: addDays(date, locale.dir === "rtl" ? 1 : -1), step: locale.dir === "rtl" ? 1 : -1 };
        case "ArrowRight":
          return { date: addDays(date, locale.dir === "rtl" ? -1 : 1), step: locale.dir === "rtl" ? -1 : 1 };
        case "ArrowUp":
          return { date: addDays(date, -7), step: -7 };
        case "ArrowDown":
          return { date: addDays(date, 7), step: 7 };
        case "Home": {
          const offset = (date.getDay() - locale.firstDayOfWeek + 7) % 7;
          return { date: addDays(date, -offset), step: 1 };
        }
        case "End": {
          const offset = (date.getDay() - locale.firstDayOfWeek + 7) % 7;
          return { date: addDays(date, 6 - offset), step: -1 };
        }
        default:
          return null;
      }
    })();

    if (!navigation) return;
    event.preventDefault();

    // When the target date is disabled, continue in the same direction until
    // the next enabled date is found. The selected value remains unchanged.
    const nextEnabledDate = findEnabledDate(
      navigation.date,
      navigation.step,
      isEnabled,
    );
    if (!nextEnabledDate) return;

    if (!isSameMonth(nextEnabledDate, visibleMonth)) {
      changeVisibleMonth(nextEnabledDate);
    }
    setFocusedDate(nextEnabledDate);
    shouldFocusAfterUpdate.current = true;
  };

  const todayDisabled = !isEnabled(today);
  const selectedDateLabel = value
    ? fullDateFormat.format(value)
    : locale.messages.calendar.noDateSelected;

  return (
    <section
      className={styles.root}
      dir={locale.dir}
      role="group"
      aria-label={locale.messages.calendar.calendarLabel}
    >
      <header className={styles.header}>
        <h2 className={styles.monthTitle} aria-live="polite">
          {getMonthTitle(visibleMonth, locale.locale)}
        </h2>

        <div className={styles.navigation}>
          <button
            className={styles.navigationButton}
            type="button"
            aria-label={locale.messages.calendar.prevMonth}
            onClick={() => navigateMonth(-1)}
          >
            <span aria-hidden="true">{locale.dir === "rtl" ? "›" : "‹"}</span>
          </button>
          <button
            className={styles.navigationButton}
            type="button"
            aria-label={locale.messages.calendar.nextMonth}
            onClick={() => navigateMonth(1)}
          >
            <span aria-hidden="true">{locale.dir === "rtl" ? "‹" : "›"}</span>
          </button>
        </div>
      </header>

      <div className={styles.weekdays} aria-hidden="true">
        {weekdayLabels.map(({ key, label, isWeekend }) => (
          <span
            className={`${styles.weekday}${isWeekend ? ` ${styles.weekend}` : ""}`}
            key={key}
          >
            {label}
          </span>
        ))}
      </div>

      <div className={styles.days} role="group" aria-label={locale.messages.calendar.chooseDate}>
        {calendarDays.map((date, index) => {
          if (!date) {
            return <span className={styles.emptyDay} key={`empty-${index}`} aria-hidden="true" />;
          }

          const isSelected = value ? sameDay(date, value) : false;
          const isToday = sameDay(date, today);
          const isWeekend = locale.weekend.includes(date.getDay());
          const disabled = !isEnabled(date);
          const isFocused = sameDay(date, focusedVisibleDate);
          const dayClasses = [
            styles.day,
            isWeekend ? styles.weekendDay : "",
            isSelected ? styles.selectedDay : "",
            isToday ? styles.todayDay : "",
            isToday && isSelected ? styles.selectedTodayDay : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              className={dayClasses}
              key={getDateKey(date)}
              ref={isFocused ? focusedDayRef : null}
              type="button"
              disabled={disabled}
              aria-label={fullDateFormat.format(date)}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
              tabIndex={isFocused && !disabled ? 0 : -1}
              onClick={() => {
                if (disabled) return;
                setFocusedDate(date);
                onValueChange(date);
              }}
              onKeyDown={(event) => handleDayKeyDown(event, date)}
            >
              {numberFormat.format(date.getDate())}
            </button>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <span className={styles.selectedDate} aria-live="polite">
          {selectedDateLabel}
        </span>
        <Button
          type="button"
          variant="text"
          size="S"
          className={styles.todayButton}
          style={{
            minWidth: 0,
            padding: `${calendarVars.calendarTodayButtonPaddingY} ${calendarVars.calendarTodayButtonPaddingX}`,
          }}
          disabled={todayDisabled}
          onClick={selectToday}
        >
          <span className={styles.todayIcon} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none">
              <rect x="2" y="3.5" width="12" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5 2v3M11 2v3M2.5 6.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
          {locale.messages.calendar.today}
        </Button>
      </footer>
    </section>
  );
}
