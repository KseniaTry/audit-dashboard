
import { twMerge } from "tailwind-merge"
import { InputHTMLAttributes } from "react"

interface InputData extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'date',
    labelText?: string,
    wrapperExtraClass?: string
}

const Input = ({ type, labelText, wrapperExtraClass, className, ...props }: InputData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2 uppercase"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"

    return (
        <div className={twMerge(wrapperClass, wrapperExtraClass)}>
            {labelText ? <label
                className="tracking-widest text-[14px]">
                {labelText}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label> : ''}
            <input
                className={twMerge(inputClass, className)}
                type={type}
                {...props}></input>
        </div>
    )
}

export default Input