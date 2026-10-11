import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, Ref } from "react";
import type { ButtonProps } from "./ButtonProps";
import "./Button.css";

export const Button = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
>((props, ref) => {
    const {
        variant = "fill",
        size = "S",
        state = "default",
        className,
    } = props;

    const buttonClassName = [
        "button",
        `button__${variant}`,
        `button__${size}`,
        `button__${state}`,
        `button__${props.as ?? "button"}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (props.as === "a") {
        const {
            as,
            variant: _variant,
            size: _size,
            state: _state,
            className: _className,
            ...anchorProps
        } = props;

        return (
            <a
                {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                ref={ref as Ref<HTMLAnchorElement>}
                className={buttonClassName}
            />
        );
    }

    const {
        as,
        variant: _variant,
        size: _size,
        state: _state,
        className: _className,
        ...buttonProps
    } = props;

    return (
        <button
            {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            ref={ref as Ref<HTMLButtonElement>}
            className={buttonClassName}
        />
    );
});

Button.displayName = "Button";