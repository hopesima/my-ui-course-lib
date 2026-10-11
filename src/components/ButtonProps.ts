import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonProps = 
    | (ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps & {
        as?: 'button';
    }) | (AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleProps & {
        as: 'a';
    });

type ButtonStyleProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    state?: ButtonState; //для отображения всех видов кнопки, потом можно убрать
}

type ButtonVariant = 'fill' | 'outline' | 'text';

type ButtonSize = 'S' | 'M' | 'L';

type ButtonState = 'default' | 'hover' | 'active' | 'disabled';
