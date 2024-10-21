'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import RoomAllocation from '@/components/RoomAllocation/RoomAllocation';
import { testCase } from '@/config/test-case';

export default function RoomAllocationContainer() {
  const testCaseList = Array.from(new Array(3).keys());
  const [activeTestCase, setActiveTestCase] = useState(0);

  const guest = testCase[activeTestCase].guest;
  const rooms = testCase[activeTestCase].rooms;

  function handleOnChange(result: number) {
    console.log(`** TotalPrice: ${result}`);
  }

  return (
    <>
      <div
        className={clsx(
          'flex justify-center gap-2',
          'mx-auto my-4 max-w-[600px]',
        )}
      >
        {testCaseList.map((index: number) => (
          <button
            className={clsx('border border-dashed p-1 text-sm', {
              'border-cyan-300': index === activeTestCase,
            })}
            key={index}
            onClick={() => setActiveTestCase(index)}
          >
            TestCase{index}
          </button>
        ))}
      </div>

      <RoomAllocation guest={guest} rooms={rooms} onChange={handleOnChange} />
    </>
  );
}
