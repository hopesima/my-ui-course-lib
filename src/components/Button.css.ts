import { style } from "@vanilla-extract/css";
import { themeVars } from "../theme/theme.css";

export const button = style({
  appearance: "none",
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  border: "1px solid transparent",
  borderRadius: themeVars.buttonBorderRadius,
  fontFamily: "inherit",
  fontWeight: 600,
  lineHeight: "20px",
  cursor: "pointer",
  textDecoration: "none",
  selectors: {
    "&:disabled": {
    opacity: themeVars.buttonDisabledOpacity,
      cursor: "not-allowed",
    },
  },
});

export const buttonVariant = {
  fill: style({
    backgroundColor: themeVars.buttonFillBackgroundColor,
    color: themeVars.buttonFillTextColor,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.buttonFillHoverBackgroundColor,
        color: themeVars.buttonFillHoverTextColor,
        boxShadow: "0 1px 2px #00000014",
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.buttonFillActiveBackgroundColor,
        color: themeVars.buttonFillActiveTextColor,
      },
      "&:disabled": {
        backgroundColor: themeVars.buttonFillDisabledBackgroundColor,
        color: themeVars.buttonFillDisabledTextColor,
      },
    },
  }),
  outline: style({
    borderColor: themeVars.buttonOutlineTextColor,
    backgroundColor: themeVars.buttonOutlineBackgroundColor,
    color: themeVars.buttonOutlineTextColor,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.buttonOutlineHoverBackgroundColor,
        color: themeVars.buttonOutlineHoverTextColor,
        borderColor: themeVars.buttonOutlineHoverTextColor,
        boxShadow: "0 1px 2px #00000014",
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.buttonOutlineActiveBackgroundColor,
        color: themeVars.buttonOutlineActiveTextColor,
        borderColor: themeVars.buttonOutlineActiveTextColor,
      },
      "&:disabled": {
        backgroundColor: themeVars.buttonOutlineDisabledBackgroundColor,
        color: themeVars.buttonOutlineDisabledTextColor,
        borderColor: themeVars.buttonOutlineDisabledTextColor,
      },
    },
  }),
  text: style({
    backgroundColor: themeVars.buttonTextBackgroundColor,
    color: themeVars.buttonTextTextColor,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.buttonTextHoverBackgroundColor,
        color: themeVars.buttonTextHoverTextColor,
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.buttonTextActiveBackgroundColor,
        color: themeVars.buttonTextActiveTextColor,
      },
      "&:disabled": {
        backgroundColor: themeVars.buttonTextDisabledBackgroundColor,
        color: themeVars.buttonTextDisabledTextColor,
      },
    },
  }),
};

export const buttonSize = {
  S: style({
    minWidth: "140px",
    fontSize: "14px",
    padding: `${themeVars.buttonSmallPaddingY} ${themeVars.buttonSmallPaddingX}`,
  }),
  M: style({
    minWidth: "140px",
    fontSize: "15px",
    padding: `${themeVars.buttonMediumPaddingY} ${themeVars.buttonMediumPaddingX}`,
  }),
  L: style({
    minWidth: "150px",
    fontSize: "16px",
    padding: `${themeVars.buttonLargePaddingY} ${themeVars.buttonLargePaddingX}`,
  }),
};
