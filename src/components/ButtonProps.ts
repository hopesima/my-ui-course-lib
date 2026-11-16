import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
} from "react";

type ButtonStyleProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export type ButtonProps =
    | (ButtonHTMLAttributes<HTMLButtonElement> &
        ButtonStyleProps & { as?: "button" })
    | (AnchorHTMLAttributes<HTMLAnchorElement> &
        ButtonStyleProps & { as: "a" });

type ButtonVariant = 'fill' | 'outline' | 'text';

type ButtonSize = 'S' | 'M' | 'L';
