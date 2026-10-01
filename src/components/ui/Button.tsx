import { twMerge } from "tailwind-merge"
import { ButtonHTMLAttributes } from "react"
import { VARIANTS } from "../../mockData"

interface ButtonData extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: VARIANTS,
    isActive?: boolean
}

const Button = ({ variant = 'default', isActive, className, ...props }: ButtonData) => {
    const buttonBaseClass = `flex items-center gap-1 p-2 border border-border-dark w-max 
    uppercase tracking-widest text-[12px] 
    hover:opacity-60 active:scale-95
    transition-all cursor-pointer`

    const activeColorClass = {
        danger: 'bg-danger text-text-light',
        warning: 'bg-warning text-text-light',
        success: 'bg-success text-text-light',
        neutral: 'bg-neutral text-text-dark',
        default: 'bg-accent text-text-light'
    }

    const inactiveColorClass = {
        danger: 'hover:text-danger  hover:border-danger',
        warning: 'hover:text-warning  hover:border-warning',
        success: 'hover:text-success  hover:border-success',
        neutral: 'hover:text-neutral hover:border-neutral',
        default: 'bg-field-bg text-text-dark'
    }

    const variantColorClass = isActive ? activeColorClass[variant] : inactiveColorClass[variant]

    return (
        <button
            className={twMerge(buttonBaseClass, variantColorClass, className)}
            {...props} />
    )
}

export default Button