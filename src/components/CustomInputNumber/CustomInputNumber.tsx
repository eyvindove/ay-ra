'use-client';

import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import CustomInputButton from './components/CustomInputButton/CustomInputButton';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  name: string;
  value: number;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLDivElement>) => void;
}

export default function CustomInputNumber({
  min = 0,
  max = 100,
  step = 1,
  name = 'custom-input-number',
  value,
  disabled,
  onChange,
  onBlur,
}: Props) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState(value);

  function handleClickMinus() {
    const tempValue = inputValue - step;
    const newValue = tempValue < min ? min : tempValue;
    setInputValue(newValue);

    if (inputRef.current) {
      const event = new Event('input', { bubbles: true });
      inputRef.current.value = String(newValue);
      inputRef.current.dispatchEvent(event);
    }
  }

  function handleClickAdd() {
    const tempValue = inputValue + step;
    const newValue = tempValue > max ? max : tempValue;
    setInputValue(newValue);

    if (inputRef.current) {
      const event = new Event('input', { bubbles: true });
      inputRef.current.value = String(newValue);
      inputRef.current.dispatchEvent(event);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('[CustomInputNumber handleOnChange] e:', e);
    const newValue = Number(e.target.value);
    setInputValue(newValue);
    onChange(e);
  }

  function handleOnInput(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log('[CustomInputNumber handleOnInput] e:', name, value, e);
    onChange(e);
  }

  function handleOnBlur(e: React.ChangeEvent<HTMLDivElement>) {
    console.log('[CustomInputNumber handleOnBlur] e:', name, value, e);
    onBlur(e);
  }

  return (
    <div
      ref={targetRef}
      className={clsx('custom-input-number', 'flex gap-2', 'p-2')}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    >
      <CustomInputButton
        text='-'
        disabled={disabled || value <= min}
        onClick={handleClickMinus}
      />
      <input
        ref={inputRef}
        className={clsx('flex items-center justify-center', 'rounded border')}
        type='number'
        name={name}
        step={step}
        min={min}
        max={max}
        value={inputValue}
        disabled={disabled}
        onInput={handleOnInput}
        onChange={handleOnChange}
      />

      <CustomInputButton
        text='+'
        disabled={disabled || value >= max}
        onClick={handleClickAdd}
      />
    </div>
  );
}
