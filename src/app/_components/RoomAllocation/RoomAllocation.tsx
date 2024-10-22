'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getDefaultRoomAllocation } from '@/utils';
import CustomInputNumber from '@/components/CustomInputNumber/CustomInputNumber';
import RoomGuestTitle from './components/RoomGuestTitle/RoomGuestTitle';

interface Props {
  guest: Guest;
  rooms: Room[];
  onChange: (result: number) => void;
}

export default function RoomAllocation({ guest, rooms, onChange }: Props) {
  const [defaultRooms, setDefaultRooms] = useState<Result[]>([]);
  const [restGuest, setRestGuest] = useState<Guest>({
    adult: 0,
    child: 0,
  });

  function calcAllocatedGuest(name: string, newValue: number) {
    const [index, type] = name.split('-');
    const targetRoom = {
      ...defaultRooms[Number(index)],
      ...rooms[Number(index)],
    };

    if (type === 'adult') {
      targetRoom.adult = newValue;
      if (targetRoom.child > targetRoom.adult) targetRoom.child = newValue;
    }
    if (type === 'child') {
      targetRoom.child = newValue;
      if (targetRoom.child > targetRoom.adult) targetRoom.adult = newValue;
    }

    if (
      targetRoom.capacity >= targetRoom.adult + targetRoom.child &&
      targetRoom.adult >= targetRoom.child
    ) {
      setDefaultRooms(
        defaultRooms.map((room, roomIndex) => {
          if (roomIndex === Number(index)) {
            return {
              adult: targetRoom.adult,
              child: targetRoom.child,
              price:
                targetRoom.roomPrice +
                targetRoom.adultPrice * targetRoom.adult +
                targetRoom.childPrice * targetRoom.child,
            };
          } else {
            return room;
          }
        }),
      );
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log('[RoomAllocation handleOnChange] e:', name, value);

    calcAllocatedGuest(name, Number(value));
  }

  function handleOnBlur(e: React.ChangeEvent<HTMLDivElement>) {
    console.log('[RoomAllocation handleOnBlur] e:', e);
  }

  function getDefaultRooms() {
    const defaultRoomsAllocation = getDefaultRoomAllocation(guest, rooms);
    setDefaultRooms(defaultRoomsAllocation);
  }

  function init() {
    getDefaultRooms();
  }

  useEffect(() => {
    init();
  }, []);

  function calcRestGuest() {
    const restAdult = defaultRooms.reduce(
      (acc, curr) => acc - curr.adult,
      guest.adult,
    );
    const restChild = defaultRooms.reduce(
      (acc, curr) => acc - curr.child,
      guest.child,
    );
    setRestGuest({ adult: restAdult, child: restChild });
  }

  function getTotalPrice() {
    if (defaultRooms?.length > 0) {
      const totalPrice = defaultRooms.reduce(
        (acc, curr) => acc + curr.price,
        0,
      );

      onChange(totalPrice);
    }
  }

  useEffect(() => {
    calcRestGuest();
    getTotalPrice();
  }, [defaultRooms]);

  useEffect(() => {
    init();
  }, [guest, rooms]);

  if (!guest || !rooms) return null;

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'my-4 max-w-[600px] p-4',
        'mx-auto',
        'border border-dashed',
      )}
    >
      <div className={clsx('')}>
        住客人數： {guest.adult} 位大人， {guest.child} 位小孩 / {rooms.length}{' '}
        房
      </div>

      <div
        className={clsx(
          'p-4',
          'text-sm text-slate-500',
          'border border-cyan-100 bg-cyan-50',
        )}
      >
        尚未分配人數： {restGuest.adult} 位大人， {restGuest.child} 位小孩
      </div>

      <div>
        {defaultRooms.map((room, index) => (
          <div
            key={`room-${index}`}
            className={clsx('flex flex-col gap-2', 'py-4', {
              'border-t': index !== 0,
            })}
          >
            <div className={clsx('')}>房間：{room.adult + room.child} 人</div>
            <div className={clsx('flex grow justify-between')}>
              <RoomGuestTitle title='大人' subtitle='年齡 20+' />

              <CustomInputNumber
                name={`${index}-adult`}
                value={room.adult}
                max={Math.min(
                  rooms[index]?.capacity ?? 0,
                  (rooms[index]?.capacity ?? 0) - room.child,
                  room.adult + restGuest.adult,
                )}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </div>
            <div className={clsx('flex justify-between')}>
              <RoomGuestTitle title='小孩' />

              <CustomInputNumber
                name={`${index}-child`}
                value={room.child}
                max={Math.min(
                  rooms[index]?.capacity ?? 0,
                  (rooms[index]?.capacity ?? 0) - room.adult,
                  Math.floor((rooms[index]?.capacity ?? 0) / 2),
                  Math.min(
                    room.adult + restGuest.adult,
                    room.child + restGuest.child,
                  ),
                )}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
