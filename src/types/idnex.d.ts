declare global {
  export interface Guest {
    adult: number;
    child: number;
  }

  export interface Room {
    roomPrice: number;
    adultPrice: number;
    childPrice: number;
    capacity: number;
  }

  export interface TempRoom extends Room {
    id: number;
    rest: number;
    adult: number;
    child: number;
    price: number;
  }

  export interface TestCase {
    guest: Guest;
    rooms: Room[];
  }
}

export {};
