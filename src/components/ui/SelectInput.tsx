import { twMerge } from "tailwind-merge"

interface SelectInputData {
    labelText: string,
    name: string,
    optionsArrayData: string[],
    widthClass?: string,
    translateFn?: (word: string) => string, // если нужно вставить перевод i18n
    required?: boolean
}

const SelectInput = ({ labelText, name, optionsArrayData, widthClass, translateFn, required = false }: SelectInputData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[13px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"

    return (
        <div className={twMerge(wrapperClass, widthClass)}>
            <label className={titleClass}>
                {labelText}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className={inputClass} name={name} required={required}>
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