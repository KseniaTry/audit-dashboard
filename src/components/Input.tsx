
import { twMerge } from "tailwind-merge"

interface InputData {
    type: 'text' | 'date',
    labelText: string,
    id: string,
    widthClass?: string,
    required?: boolean,
    placeholder?: string,
    readonly?: boolean
}

const Input = ({ type, labelText, id, widthClass, required = false, placeholder, readonly = false }: InputData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[14px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"

    return (
        <div className={twMerge(wrapperClass, widthClass)}>
            <label
                className={titleClass}
                htmlFor={id}>
                {labelText}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                className={inputClass}
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                required={required}
                readOnly={readonly}></input>
        </div>
    )
}

export default Input