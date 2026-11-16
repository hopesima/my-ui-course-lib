export interface CalendarProps {
  /** The currently selected date. Pass null when no date is selected. */
  value: Date | null;
  /** Called when the user selects a date. */
  onValueChange: (date: Date) => void;
  /** The month currently shown by the calendar. */
  month?: Date;
  /** Called when the visible month changes. */
  onMonthChange?: (month: Date) => void;
  /** The first selectable date, inclusive. */
  minDate?: Date;
  /** The last selectable date, inclusive. */
  maxDate?: Date;
  /** Additional rule for disabling individual dates. */
  isDateDisabled?: (date: Date) => boolean;
  /** Focus the active day when the calendar is mounted. */
  autoFocus?: boolean;
}
