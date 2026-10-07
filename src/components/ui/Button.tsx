import { twMerge } from "tailwind-merge"
import { ButtonHTMLAttributes } from "react"
import { VARIANTS } from "../../const"

interface ButtonData extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: VARIANTS | 'primary' | 'secondary' | 'delete',
    isActive?: boolean
}

const Button = ({ variant = 'primary', isActive, className, ...props }: ButtonData) => {
    const buttonBaseClass = `flex items-center gap-1 p-2 border w-max 
    uppercase tracking-widest text-[12px]
    hover:opacity-80 active:scale-95
    transition-all cursor-pointer`

    const activeColorClass = {
        danger: 'bg-danger text-text-light',
        warning: 'bg-warning text-text-light',
        success: 'bg-success text-text-light',
        neutral: 'bg-neutral text-text-light',
        primary: 'bg-accent text-text-light',
        secondary: 'bg-accent text-text-light',
        delete: 'bg-danger/50 text-text-light'
    }

    const inactiveColorClass = {
        danger: 'hover:text-danger hover:border-danger',
        warning: 'hover:text-warning  hover:border-warning',
        success: 'hover:text-success  hover:border-success',
        neutral: 'hover:text-neutral hover:border-neutral',
        primary: 'bg-field-bg border-border-dark text-text-dark hover:opacity-50', // белая кнопка с черным текстом
        secondary: 'bg-btn-dark text-text-light', // черная кнопка с белым тесктом 
        delete: 'bg-danger text-text-light border-red'
    }

    const variantColorClass = isActive ? activeColorClass[variant] : inactiveColorClass[variant]

    return (
        <button
            className={twMerge(buttonBaseClass, className, variantColorClass)}
            {...props} />
    )
}

export default Button