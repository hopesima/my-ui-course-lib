import type {
  ReactNode,
} from "react";


export type TimePickerVariant =
  | "outline"
  | "borderless"
  | "fill"
  | "underline";


export type TimePickerSize =
  | "s"
  | "m"
  | "l";


export type TimePickerStatus =
  | "default"
  | "error"
  | "warning";


export type TimePickerPrecision =
  | "hour"
  | "minute"
  | "second";


export type HourCycle =
  | 12
  | 24;


export type Meridiem =
  | "AM"
  | "PM";



export interface TimeValue {

  hour: number;

  minute: number;

  second?: number;

  meridiem?: Meridiem;

}



export interface TimePickerProps {

  value?: TimeValue;

  defaultValue?: TimeValue;

  onChange?: (
    value: TimeValue
  ) => void;


  label?: string;

  description?: string;

  message?: string;


  variant?: TimePickerVariant;

  size?: TimePickerSize;


  status?: TimePickerStatus;


  hourCycle?: HourCycle;


  precision?: TimePickerPrecision;


  minuteStep?: number;

  secondStep?: number;


  disabled?: boolean;

  readOnly?: boolean;


  allowClear?: boolean;

  showNow?: boolean;


  suffixIcon?: ReactNode;


  open?: boolean;

  onOpenChange?: (
    open: boolean
  ) => void;


  className?: string;


  "aria-label"?: string;

  "aria-describedby"?: string;

}