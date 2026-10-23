import { useState } from "react"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
import React from "react"
import { useTranslation } from "react-i18next"
import { RiskLevels, Statuses } from "../../types"

interface CheckboxData {
    optionsArrayData: string[] | Statuses[] | RiskLevels[],
    className?: string, // если надо доп настройки внешнего вида 
    onChange: (data: string[]) => void
}

const Checkbox = ({ optionsArrayData, className, onChange }: CheckboxData) => {
    const { t } = useTranslation()
    const wrapperClass = "relative flex items-center py-1 px-3 md:text-[13px] md:min-w-[150px] uppercase border border-border-warm border-2 bg-field-bg cursor-pointer"
    const [fieldsetActive, setFieldsetActive] = useState<boolean>(false)
    const initialValue = [optionsArrayData[0]]
    const [checkboxData, setCheckboxData] = useState<string[]>(initialValue)
    const isActiveOptionsClass = fieldsetActive ? 'flex' : 'hidden'
    const choosenData = checkboxData.join(', ')

    const handleClick = (e) => {
        e.stopPropagation()
        setFieldsetActive(false)
        onChange(checkboxData)
    }

    const handleClose = (e) => {
        e.stopPropagation()
        setFieldsetActive(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, data: string) => {
        let newValue: string[] | RiskLevels[] | Statuses[]
        if (data.includes(optionsArrayData[0])) {
            newValue = initialValue
        } else if (!e.target.checked && checkboxData.includes(data)) {
            newValue = checkboxData.filter((value) => value != data)
        } else {
            const modifiedData = checkboxData.filter((value) => value != optionsArrayData[0])
            newValue = [...modifiedData, data]
        }
        setCheckboxData(newValue)
    }

    return (
        <fieldset
            onClick={() => setFieldsetActive(true)}
            className={twMerge(wrapperClass, className)}>
            <div className='overflow-hidden h-[20px]'>{choosenData}</div>
            <div className={twMerge(isActiveOptionsClass, 'absolute top-full left-[-2px] right-[-2px] mt-[5px] flex-col border border-border-warm border-2 bg-field-bg p-3')}>
                <div className="md:h-[250px] overflow-scroll">
                    {optionsArrayData.map((data) => {
                        const isChecked = checkboxData.includes(data)
                        return (
                            <div className="flex gap-2 whitespace-nowrap" key={data}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleChange(e, data)}
                                    id={data}
                                    name={data}
                                    checked={isChecked} />
                                <label className="overflow-hidden" htmlFor={data}>{data}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-end items-center gap-3 mt-3">
                    <Button type='button' onClick={() => setCheckboxData([])}>{t('clear')}</Button>
                    <Button type="button" onClick={handleClick} className={isActiveOptionsClass}>{t('ok')}</Button>
                    <Button type='button' onClick={handleClose}>{t('cancel')}</Button>
                </div>
            </div>

        </fieldset>)
}

export default Checkbox