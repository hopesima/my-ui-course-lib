import { style } from "@vanilla-extract/css";
import { calendarVars } from "../../theme/theme.css";

export const root = style({
  boxSizing: "border-box",
  width: calendarVars.calendarWidth,
  maxWidth: "100%",
  padding: calendarVars.calendarPadding,
  color: calendarVars.calendarTextColor,
  background: calendarVars.calendarBackground,
  border: `${calendarVars.calendarBorderWidth} solid ${calendarVars.calendarBorderColor}`,
  borderRadius: calendarVars.calendarRadius,
  fontFamily: "inherit",
  direction: "inherit",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: calendarVars.calendarHeaderGap,
  marginBlockEnd: calendarVars.calendarHeaderMargin,
});

export const monthTitle = style({
  margin: 0,
  color: calendarVars.calendarTextColor,
  fontSize: calendarVars.calendarTitleSize,
  fontWeight: 600,
  lineHeight: 1.4,
  textTransform: "capitalize",
});

export const navigation = style({
  display: "flex",
  alignItems: "center",
  gap: calendarVars.calendarNavGap,
});

export const navigationButton = style({
  appearance: "none",
  display: "inline-grid",
  placeItems: "center",
  width: calendarVars.calendarNavButtonSize,
  height: calendarVars.calendarNavButtonSize,
  padding: calendarVars.calendarControlResetPadding,
  border: 0,
  borderRadius: calendarVars.calendarDayRadius,
  background: "transparent",
  color: calendarVars.calendarMutedTextColor,
  font: "inherit",
  fontSize: calendarVars.calendarArrowSize,
  lineHeight: 1,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: calendarVars.calendarDayHoverBackground,
      color: calendarVars.calendarTextColor,
    },
    "&:focus-visible": {
      outline: `${calendarVars.calendarFocusOutlineWidth} solid ${calendarVars.calendarFocusColor}`,
      outlineOffset: calendarVars.calendarFocusOutlineOffset,
    },
  },
});

export const weekdays = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  marginBlockEnd: calendarVars.calendarWeekdayMargin,
});

export const weekday = style({
  display: "grid",
  placeItems: "center",
  minWidth: 0,
  height: calendarVars.calendarCellSize,
  color: calendarVars.calendarMutedTextColor,
  fontSize: calendarVars.calendarWeekdaySize,
  fontWeight: 500,
  userSelect: "none",
});

export const weekend = style({
  color: calendarVars.calendarWeekendTextColor,
});

export const days = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  rowGap: calendarVars.calendarGridRowGap,
});

export const emptyDay = style({
  width: "100%",
  height: calendarVars.calendarCellSize,
});

export const day = style({
  position: "relative",
  appearance: "none",
  display: "grid",
  placeItems: "center",
  justifySelf: "center",
  width: calendarVars.calendarCellSize,
  height: calendarVars.calendarCellSize,
  padding: calendarVars.calendarControlResetPadding,
  border: `${calendarVars.calendarBorderWidth} solid transparent`,
  borderRadius: calendarVars.calendarDayRadius,
  background: "transparent",
  color: calendarVars.calendarTextColor,
  font: "inherit",
  fontSize: calendarVars.calendarDaySize,
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    "&:hover:not(:disabled):not([aria-pressed='true'])": {
      background: calendarVars.calendarDayHoverBackground,
    },
    "&:focus-visible": {
      outline: `${calendarVars.calendarFocusOutlineWidth} solid ${calendarVars.calendarFocusColor}`,
      outlineOffset: calendarVars.calendarFocusOutlineOffset,
      zIndex: 1,
    },
    "&:disabled": {
      color: calendarVars.calendarDisabledTextColor,
      cursor: "not-allowed",
    },
  },
});

export const weekendDay = style({
  color: calendarVars.calendarWeekendTextColor,
});

export const selectedDay = style({
  background: calendarVars.calendarSelectedBackground,
  color: calendarVars.calendarSelectedTextColor,
  fontWeight: 600,
  selectors: {
    "&:hover:not(:disabled)": {
      background: calendarVars.calendarSelectedBackground,
      color: calendarVars.calendarSelectedTextColor,
    },
  },
});

export const todayDay = style({
  selectors: {
    "&::after": {
      position: "absolute",
      insetInlineStart: "50%",
      insetBlockEnd: calendarVars.calendarTodayDotInset,
      width: calendarVars.calendarTodayDotSize,
      height: calendarVars.calendarTodayDotSize,
      borderRadius: "50%",
      background: calendarVars.calendarTodayDotColor,
      content: "\"\"",
      transform: "translateX(-50%)",
    },
  },
});

export const selectedTodayDay = style({
  selectors: {
    "&::after": {
      background: calendarVars.calendarSelectedTodayDotColor,
    },
  },
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: calendarVars.calendarFooterGap,
  marginBlockStart: calendarVars.calendarFooterMargin,
  paddingBlockStart: calendarVars.calendarFooterPadding,
  borderBlockStart: `${calendarVars.calendarBorderWidth} solid ${calendarVars.calendarBorderColor}`,
});

export const selectedDate = style({
  minWidth: 0,
  color: calendarVars.calendarMutedTextColor,
  fontSize: calendarVars.calendarFooterTextSize,
  lineHeight: 1.4,
  overflowWrap: "anywhere",
});

export const todayButton = style({
  flexShrink: 0,
  minWidth: 0,
  padding: `${calendarVars.calendarTodayButtonPaddingY} ${calendarVars.calendarTodayButtonPaddingX}`,
  gap: calendarVars.calendarTodayButtonIconGap,
});

export const todayIcon = style({
  display: "inline-flex",
  width: calendarVars.calendarTodayIconSize,
  height: calendarVars.calendarTodayIconSize,
  alignItems: "center",
  justifyContent: "center",
});
