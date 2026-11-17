import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';

interface InputData extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'date';
  labelText?: string;
  wrapperExtraClass?: string;
  errorText?: string;
}

const Input = ({ type, labelText, wrapperExtraClass, errorText = '', className, ...props }: InputData) => {
  const wrapperClass = 'flex flex-col flex-wrap gap-3 uppercase';
  const inputClass = 'w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]';
  const errorClass = errorText === '' ? 'border-border-warm' : 'border-danger/50'

  return (
    <div className={twMerge(wrapperClass, wrapperExtraClass)}>
      {labelText ? (
        <label className="relative tracking-widest text-[14px]">
          {labelText}
          {props.required && <span className="text-danger ml-1">*</span>}
          {errorText === '' ? '' : <p className='absolute top-4 text-danger text-[10px] tracking-normal lowercase'> {errorText}</p>}
        </label>
      ) : (
        ''
      )}
      <input className={twMerge(inputClass, className, errorClass)} type={type} {...props}></input>
    </div>
  );
};

export default Input;
