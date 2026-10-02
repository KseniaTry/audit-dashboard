import { twMerge } from "tailwind-merge"
import { SelectHTMLAttributes } from "react"

interface SelectInputData extends SelectHTMLAttributes<HTMLSelectElement> {
    labelText?: string,
    optionsArrayData: string[],
    widthClass?: string,
    translateFn?: (word: string) => string, // если нужно вставить перевод i18n
}

const SelectInput = ({ labelText, optionsArrayData, widthClass, translateFn, className, ...props }: SelectInputData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const selectClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"

    return (
        <div className={twMerge(wrapperClass, widthClass)}>
            {labelText ? <label className="tracking-widest uppercase text-[13px]">
                {labelText}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label> : ''}
            <select className={twMerge(selectClass, className)} {...props}>
                {optionsArrayData.map((option) => {
                    return <option key={option} value={option}>
                        {translateFn ? translateFn(option) : option}
                    </option>
                })}
            </select>
        </div>
    )
}

export default SelectInput