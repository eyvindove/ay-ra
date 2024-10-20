'use client';

import React, { useState } from 'react';
import CustomInputNumber from '@/components/CustomInputNumber/CustomInputNumber';

export default function RoomAllocation() {
  const [value, setValue] = useState(0);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log('-- RoomAllocation handleOnChange e:', name, value, e);
    setValue(Number(e.target.value));
  }

  function handleOnBlur(e: React.ChangeEvent<HTMLDivElement>) {
    console.log('-- RoomAllocation handleOnBlur e:', e);
  }

  return (
    <div>
      <CustomInputNumber
        name='custom-input-number'
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </div>
  );
}
