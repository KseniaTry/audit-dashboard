import { twMerge } from "tailwind-merge"

interface TextareaData {
    labelText: string,
    name: string,
    placeholder?: string,
    rows?: number,
    cols?: number,
    required: boolean,
    widthClass?: string,
    readonly?: boolean
}

const Textarea = ({ labelText, name, placeholder, rows, cols, required = false, readonly = false, widthClass }: TextareaData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[15px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[14px]"

    return (
        <div className={twMerge(wrapperClass, widthClass)}>
            <label className={titleClass}>{labelText}</label>
            <textarea
                className={inputClass}
                name={name}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                readOnly={readonly}
                required={required}
            ></textarea>
        </div>
    )
}

export default Textarea