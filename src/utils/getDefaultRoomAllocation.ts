export function getDefaultRoomAllocation(guest: Guest, rooms: Room[]) {
  let adults = guest.adult;
  let children = guest.child;
  const totalGuest = adults + children;
  const roomsCapacity = rooms.reduce((acc, curr) => acc + curr.capacity, 0);

  // -- Return when it's not meet allocation requirement
  if (children > adults || totalGuest > roomsCapacity)
    return rooms.map(() => ({ adult: 0, child: 0, price: 0 }));

  let tempRooms: TempRoom[] = JSON.parse(JSON.stringify(rooms)).map(
    (room: Room, index: number) => ({
      ...room,
      id: index,
      rest: room.capacity,
      adult: 0,
      child: 0,
      price: 0,
    }),
  );

  // -- Allocate child with adult first

  function sortChildWithAdult(a: TempRoom, b: TempRoom) {
    return (
      a.roomPrice +
        a.adultPrice +
        a.childPrice -
        (b.roomPrice + b.adultPrice + b.childPrice) ||
      a.adultPrice - b.adultPrice ||
      a.roomPrice - b.roomPrice
    );
  }

  if (children) {
    tempRooms = tempRooms.sort(sortChildWithAdult);

    for (const room of tempRooms) {
      if (!children) break;
      const maxChildren = Math.floor(room.capacity / 2);
      const childrenInRoom = Math.min(maxChildren, children);
      const adultInRoom = room.capacity - childrenInRoom;
      const price =
        room.roomPrice +
        room.adultPrice * adultInRoom +
        room.childPrice * childrenInRoom;

      room.price = price;
      room.adult = adultInRoom;
      room.child = childrenInRoom;
      room.rest -= adultInRoom + childrenInRoom;
      adults -= adultInRoom;
      children -= childrenInRoom;
    }
  }

  // -- Allocate the rest adults
  function sortRestAdults(a: TempRoom, b: TempRoom) {
    return (
      a.roomPrice + a.adultPrice - (b.roomPrice + b.adultPrice) ||
      a.roomPrice - b.roomPrice
    );
  }
  tempRooms = tempRooms.sort(sortRestAdults);

  for (const room of tempRooms) {
    if (!adults) break;
    const adultInRoom = Math.min(adults, room.rest);
    const price = room.roomPrice + room.adultPrice * adultInRoom;

    room.price = price;
    room.adult = adultInRoom;
    adults -= adultInRoom;
  }

  // -- Restore original sorting
  tempRooms = tempRooms.sort((a, b) => a.id - b.id);

  // -- Export result
  const defaultRooms = tempRooms.map((room) => ({
    adult: room.adult,
    child: room.child,
    price: room.price,
  }));

  return defaultRooms;
}

export default getDefaultRoomAllocation;
