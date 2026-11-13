import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface CheckboxData<T extends string> {
  id: string, // id должно совпадать с setCheckboxOpen (туда передаем id для переключения чекбоксов и закрытия предыдущего)
  options: T[]; // исходные данные (массив ССП / годов / проверок и тд)
  value: T[]; // приходит из state из компонента Filters
  placeholder: string; // исходное значение , например "Все ССП"
  className?: string; // если надо доп настройки внешнего вида
  onChange: (data: T[]) => void;
  isOpen: boolean;
  setCheckboxOpen: (state: string | null) => void;
  isBottom?: boolean;
  isHeightFitContent?: boolean;
}

const Checkbox = <T extends string>({ id, options, value, placeholder, className, onChange, isOpen, setCheckboxOpen, isBottom = false, isHeightFitContent = false }: CheckboxData<T>) => {
  const { t } = useTranslation();
  const wrapperClass = 'relative flex items-center px-3 md:text-[13px] md:min-w-[150px] uppercase border border-border-warm border-2 bg-field-bg cursor-pointer';
  const isActiveOptionsClass = isOpen ? 'flex' : 'hidden';
  const choosenData = value.length === 0 ? placeholder : value.join(', ');
  const positionClass = isBottom ? 'bottom-full' : 'top-full'
  const heightClass = isHeightFitContent ? 'h-fit' : 'h-7 truncate'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCheckboxOpen(null);
    onChange(value);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCheckboxOpen(null);
    onChange([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, data: T | '') => {
    let newValue: T[];
    if (data === '') {
      newValue = [];
    } else if (!e.target.checked && value.includes(data)) {
      newValue = value.filter((item) => item != data);
    } else {
      const modifiedData = value.filter((item) => item != placeholder);
      newValue = [...modifiedData, data];
    }
    onChange(newValue);
  };

  return (
    <fieldset className={twMerge(wrapperClass, className)}>
      <div
        onClick={() => isOpen ? setCheckboxOpen(null) : setCheckboxOpen(id)}
        className={twMerge('flex items-center overflow-hidden p-1', heightClass)}>
        {choosenData}
      </div>
      {/* выпадающий список */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          isActiveOptionsClass,
          'absolute z-10 left-[-2px] right-[-2px] mt-[5px] flex-col border border-border-warm border-2 bg-field-bg p-3',
          positionClass
        )}
      >
        <div className="md:max-h-[250px] overflow-auto">
          <div className="flex gap-2">
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, '')}
              id={placeholder}
              name={placeholder}
              checked={value.length === 0}
            />
            <label className="overflow-hidden" htmlFor={placeholder}>
              {placeholder}
            </label>
          </div>
          {options.map((data) => {
            const isChecked = value.includes(data);
            return (
              <div className="flex gap-2 whitespace-nowrap" key={data}>
                <input
                  type="checkbox"
                  onChange={(e) => handleChange(e, data)}
                  id={data}
                  name={data}
                  checked={isChecked}
                />
                <label className="overflow-hidden" htmlFor={data}>
                  {data}
                </label>
              </div>
            );
          })}
        </div>
        {/* кнопки */}
        <div className="flex flex-wrap justify-start items-center gap-3 mt-3">
          <Button type="button" onClick={handleClick} className={isActiveOptionsClass}>
            {t('ok')}
          </Button>
          <Button type="button" onClick={handleClose}>
            {t('clear')}
          </Button>
        </div>
      </div>
    </fieldset>
  );
};

export default Checkbox;
