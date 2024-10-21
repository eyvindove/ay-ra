export const testCase: TestCase[] = [
  {
    guest: {
      adult: 4,
      child: 2,
    },
    rooms: [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    ],
  },
  {
    guest: {
      adult: 16,
      child: 0,
    },
    rooms: [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ],
  },
  {
    guest: { adult: 0, child: 1 },
    rooms: [
      { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
      { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ],
  },
];

export const activeTestCase = testCase[0];
