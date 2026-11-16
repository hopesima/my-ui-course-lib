import { forwardRef, useContext } from "react";
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    Ref,
} from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { ButtonProps } from "./ButtonProps";
import { button, buttonSize, buttonVariant } from "./Button.css.ts";
import { themeClass, themeVars } from "../theme/theme.css";
import { ButtonThemeContext } from "../theme/buttonThemeContext";

export const Button = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
>((props, ref) => {
    const {
        as,
        variant = "fill",
        size = "S",
        className,
        style,
        ...elementProps
    } = props;
    const tokens = useContext(ButtonThemeContext);
    const themeStyle = assignInlineVars(
        themeVars,
        tokens as Record<keyof typeof themeVars, string>,
    ) as CSSProperties;

    const buttonClassName = [
        button,
        themeClass,
        buttonVariant[variant],
        buttonSize[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (as === "a") {
        return (
            <a
                {...(elementProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                ref={ref as Ref<HTMLAnchorElement>}
                className={buttonClassName}
                style={{ ...style, ...themeStyle }}
            />
        );
    }

    return (
        <button
            {...(elementProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            ref={ref as Ref<HTMLButtonElement>}
            className={buttonClassName}
            style={{ ...style, ...themeStyle }}
        />
    );
});