import React from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  subtitle?: string;
}

export default function RoomGuestTitle({ title, subtitle }: Props) {
  return (
    <div className={clsx('grow', 'py-2', 'text-sm')}>
      <div className={clsx('')}>{title}</div>
      <div className={clsx('text-slate-500')}>{subtitle}</div>
    </div>
  );
}
