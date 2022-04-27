import type { FC, FormEvent, HTMLInputTypeAttribute } from 'react';
import { useEffect, useState } from 'react';
import './input.scss';

interface IProps {
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | 'integer';
  maxlength?: number;
  loading?: boolean;
  onInput?: (value: any) => any;
  onChange?: (value: any) => any;
  onClear?: () => void;
}

const INTEGER = 'integer';
const NUMBER = 'number';

export const Input: FC<IProps> = ({
  label = '',
  defaultValue = '',
  placeholder = '',
  loading = false,
  type,
  maxlength,
  onInput,
  onChange,
  onClear,
}) => {
  const [value, setValue] = useState<string>('');
  let inputType = type;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const isInteger = inputType === INTEGER;

  if (isInteger) {
    inputType = NUMBER;
  }

  const handleClear = () => {
    setValue('');
    onClear && onClear();
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;

    if (isInteger) {
      value = value.replace(/[^0-9]/g, '');
    }

    if (maxlength && value.length > maxlength) {
      return;
    }

    setValue(value);
    onInput && onInput(value);
  };

  return (
    <div className='rww-input'>
      {label && <span className='rww-input__label'>{label}</span>}
      <input
        className='rww-input__input'
        value={value}
        placeholder={placeholder}
        maxLength={maxlength}
        onInput={handleInput}
        onChange={handleInput}
      />
      {/* 关闭按钮 */}
      {value &&
        (loading ? (
          <div
            className='rww-input__loading'
            data-testid='rww-input__loading'
          />
        ) : (
          <div className='rww-input__close' onClick={handleClear}>
            x
          </div>
        ))}
    </div>
  );
};

export default Input;
