import { twMerge } from 'tailwind-merge';
import { TextareaHTMLAttributes } from 'react';

interface TextareaData extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  widthClass?: string;
  errorText?: string;
}

const Textarea = ({ labelText, widthClass, errorText = '', className, ...props }: TextareaData) => {
  const wrapperClass = 'flex flex-col flex-wrap gap-2';
  const inputClass = 'w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[14px]';
  const errorClass = errorText === '' ? 'border-border-warm' : 'border-danger/50'

  return (
    <div className={twMerge(wrapperClass, widthClass)}>
      {labelText ? (
        <label className="tracking-widest uppercase text-[15px]">
          {labelText}
          {props.required && <span className="text-danger ml-1">*</span>}
          {errorText === '' ? '' : <p className='text-danger text-[13px] tracking-normal lowercase'> {errorText}</p>}
        </label>
      ) : (
        ''
      )}
      <textarea className={twMerge(inputClass, className, errorClass)} {...props}></textarea>
    </div>
  );
};

export default Textarea;
