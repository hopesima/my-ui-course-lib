import type { ButtonProps } from "./ButtonProps";
import './Button.css';

export const Button = ({
    variant = 'fill',
    size = 'S',
    state = 'default',
    className,
    ...otherProps
}: ButtonProps) => {
    const buttonClassName = [
        'button',
        `button__${variant}`,
        `button__${size}`,
        `button__${state}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={buttonClassName}
            {...otherProps}
        />
    )
}