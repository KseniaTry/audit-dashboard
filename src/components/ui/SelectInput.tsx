import { twMerge } from 'tailwind-merge';
import { SelectHTMLAttributes } from 'react';

interface SelectInputData extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  optionsArrayData: string[];
  widthClass?: string;
  placeholder?: string; // если нужно добавить какие-то данные помимо переданных optionsArrayData, допустим 'все проверки'/'все риски' и тд 
  translateFn?: (word: string) => string; // если нужно вставить перевод i18n
  errorText?: string;
}

const SelectInput = ({
  labelText,
  optionsArrayData,
  widthClass,
  placeholder,
  translateFn,
  errorText = '',
  className,
  ...props
}: SelectInputData) => {
  const wrapperClass = 'flex flex-col flex-wrap gap-2';
  const selectClass =
    'w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]';
  const errorClass = errorText === '' ? 'border-border-warm' : 'border-danger/50'

  return (
    <div className={twMerge(wrapperClass, widthClass)}>
      {labelText ? (
        <label className="tracking-widest uppercase text-[13px]">
          {labelText}
          {props.required && <span className="text-red-500 ml-1">*</span>}
          {errorText === '' ? '' : <p className='text-danger text-[13px] tracking-normal lowercase'> {errorText}</p>}
        </label>
      ) : (
        ''
      )}
      <select className={twMerge(selectClass, className, errorClass)} {...props}>
        <option key={placeholder} value={placeholder}>
          {placeholder}
        </option>
        {optionsArrayData.map((option) => {
          return (
            <option key={option} value={option}>
              {translateFn ? translateFn(option) : option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
