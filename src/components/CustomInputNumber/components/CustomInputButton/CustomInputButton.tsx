import React from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function CustomInputButton({ text, disabled, onClick }: Props) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center',
        'font-xl h-12 w-12 rounded border border-cyan-500',
        'cursor-pointer',
        'hover:opacity-80',
        {
          'pointer-events-none cursor-not-allowed opacity-20 hover:opacity-20':
            disabled,
        },
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
