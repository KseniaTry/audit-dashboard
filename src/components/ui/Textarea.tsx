import { twMerge } from "tailwind-merge"
import { TextareaHTMLAttributes } from "react"

interface TextareaData extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText?: string,
    widthClass?: string,
}

const Textarea = ({ labelText, widthClass, className, ...props }: TextareaData) => {
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[14px]"

    return (
        <div className={twMerge(wrapperClass, widthClass)}>
            {labelText ?
                <label className="tracking-widest uppercase text-[15px]">{labelText}</label> : ''}
            <textarea
                className={twMerge(inputClass, className)}
                {...props}
            ></textarea>
        </div>
    )
}

export default Textarea