import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  TimePickerProps,
  TimeValue,
} from "./TimePickerProps";

import "./TimePicker.css";


const defaultTime: TimeValue = {
  hour: 12,
  minute: 0,
  second: 0,
  meridiem: "PM",
};


export function TimePicker({
  value,
  defaultValue,
  onChange,

  label,
  message,
  description,

  variant = "outline",
  size = "m",

  status = "default",

  hourCycle = 24,
  precision = "minute",

  minuteStep = 1,
  secondStep = 1,

  disabled,
  readOnly,

  allowClear,
  showNow,

  suffixIcon,

  open: controlledOpen,
  onOpenChange,

  className,

  ...aria

}: TimePickerProps) {

  const id = useId();


  const containerRef =
    useRef<HTMLDivElement | null>(null);


  const hourRef =
    useRef<HTMLButtonElement | null>(null);

  const minuteRef =
    useRef<HTMLButtonElement | null>(null);

  const secondRef =
    useRef<HTMLButtonElement | null>(null);


  const [internalValue, setInternalValue] =
    useState<TimeValue>(
      value ?? defaultValue ?? defaultTime,
    );


  const [internalOpen, setInternalOpen] =
    useState(false);


  const open =
    controlledOpen ?? internalOpen;


  const current =
    value ?? internalValue;



  const update = useCallback(
    (next: TimeValue) => {
      if (!value) {
        setInternalValue(next);
      }

      onChange?.(next);
    },
    [value, onChange],
  );



  const changeOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );



  useEffect(() => {
    if (!open) {
      return;
    }

    requestAnimationFrame(() => {
      hourRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });

      minuteRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });

      secondRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  }, [open]);



  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        changeOpen(false);
      }
    }


    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );


    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [changeOpen]);



  function setHour(hour: number) {
    update({
      ...current,
      hour,
    });
  }


  function setMinute(minute: number) {
    update({
      ...current,
      minute,
    });
  }


  function setSecond(second: number) {
    update({
      ...current,
      second,
    });
  }


  function setMeridiem(
    meridiem: "AM" | "PM",
  ) {
    update({
      ...current,
      meridiem,
    });
  }



  function setNow() {
    const now = new Date();

    update({
      hour:
        hourCycle === 12
          ? now.getHours() % 12 || 12
          : now.getHours(),

      minute: now.getMinutes(),

      second: now.getSeconds(),

      meridiem:
        now.getHours() >= 12
          ? "PM"
          : "AM",
    });
  }



  function clear() {
    update({
      hour: 0,
      minute: 0,
      second: 0,
    });
  }

    return (
    <div
      ref={containerRef}
      className={[
        "time-picker",
        `time-picker--${variant}`,
        `time-picker--${size}`,
        status !== "default"
          ? `time-picker--${status}`
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}


      <button
        id={id}
        type="button"
        className="time-picker__input"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={
          status === "error"
        }
        onClick={() => {
          if (!readOnly) {
            changeOpen(!open);
          }
        }}
        {...aria}
      >
        <span>
          {formatTime(
            current,
            hourCycle,
            precision,
          )}
        </span>

        {suffixIcon}
      </button>



      {open && (
        <div className="time-picker__dropdown">

          <div
            className="time-picker__panel"
            role="listbox"
          >

            <div className="time-picker__column">
              {createNumbers(
                hourCycle === 12
                  ? 12
                  : 24,
                1,
                hourCycle === 12
                  ? 1
                  : 0,
              ).map((hour) => (
                <button
                  key={hour}
                  ref={
                    hour === current.hour
                      ? hourRef
                      : null
                  }
                  className={
                    hour === current.hour
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setHour(hour);
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>



            <div className="time-picker__column">
              {createNumbers(
                60,
                minuteStep,
              ).map((minute) => (
                <button
                  key={minute}
                  ref={
                    minute === current.minute
                      ? minuteRef
                      : null
                  }
                  className={
                    minute === current.minute
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setMinute(minute);
                  }}
                >
                  {String(minute)
                    .padStart(2, "0")}
                </button>
              ))}
            </div>



            {precision === "second" && (
              <div className="time-picker__column">
                {createNumbers(
                  60,
                  secondStep,
                ).map((second) => (
                  <button
                    key={second}
                    ref={
                      second === current.second
                        ? secondRef
                        : null
                    }
                    className={
                      second === current.second
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSecond(second);
                    }}
                  >
                    {String(second)
                      .padStart(2, "0")}
                  </button>
                ))}
              </div>
            )}



            {hourCycle === 12 && (
              <div className="time-picker__column">

                <button
                  className={
                    current.meridiem === "AM"
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setMeridiem("AM");
                  }}
                >
                  AM
                </button>


                <button
                  className={
                    current.meridiem === "PM"
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setMeridiem("PM");
                  }}
                >
                  PM
                </button>

              </div>
            )}

          </div>



          {(showNow || allowClear) && (
            <div className="time-picker__footer">

              {showNow && (
                <button
                  type="button"
                  onClick={setNow}
                >
                  Now
                </button>
              )}


              {allowClear && (
                <button
                  type="button"
                  onClick={clear}
                >
                  Clear
                </button>
              )}

            </div>
          )}

        </div>
      )}



      {(message || description) && (
        <div className="time-picker__message">
          {message ?? description}
        </div>
      )}

    </div>
  );
}



function createNumbers(
  max: number,
  step = 1,
  start = 0,
) {
  return Array.from(
    {
      length: Math.ceil(
        (max - start) / step,
      ),
    },
    (_, index) =>
      start + index * step,
  );
}



function formatTime(
  value: TimeValue,
  hourCycle: 12 | 24,
  precision: string,
) {
  let hour = value.hour;


  if (hourCycle === 12) {
    hour =
      hour === 0
        ? 12
        : hour > 12
          ? hour - 12
          : hour;
  }


  let result =
    `${String(hour)
      .padStart(2, "0")}:` +
    `${String(value.minute)
      .padStart(2, "0")}`;


  if (precision === "second") {
    result +=
      `:${String(value.second ?? 0)
        .padStart(2, "0")}`;
  }


  if (hourCycle === 12) {
    result +=
      ` ${value.meridiem}`;
  }


  return result;
}