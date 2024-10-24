import React from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function CustomInputButton({ text, disabled, onClick }: Props) {
  function handleOnClick() {
    if (disabled) return;
    onClick();
  }

  return (
    <button
      className={clsx(
        'flex items-center justify-center',
        'font-xl h-12 w-12 rounded border border-cyan-500',
        {
          'cursor-pointer hover:opacity-80': !disabled,
          'cursor-not-allowed opacity-20 hover:opacity-20': disabled,
        },
      )}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
}
