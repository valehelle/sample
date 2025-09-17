import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://ryt.com/account", async ({ params }) => {
    await delay(1500);
    return HttpResponse.json({
      currentAccount: {
        name: "Current Account-i",
        balance: 1200.52,
        accountNumber: "1624 4434 4343 4222",
      },
      transactions: [
        { id: 1, description: "Starbucks", date: "Feb 12", amount: 15.75 },
        { id: 2, description: "Amazon", date: "Feb 13", amount: 45.0 },
        {
          id: 3,
          description: "Uber",
          date: "Feb 14",
          amount: 23.5,
        },
        { id: 4, description: "Grocery Store", date: "Feb 15", amount: 89.3 },
        {
          id: 5,
          description: "Electricity Bill",
          date: "Feb 16",
          amount: 60.0,
        },
        { id: 6, description: "Gym Membership", date: "Feb 17", amount: 35.0 },
      ],
      creditCards: [
        {
          id: 1,
          type: "visa",
          last4: "4222",
          outstandingBalance: 119.23,
        },
        {
          id: 2,
          type: "amex",
          last4: "423",
          outstandingBalance: 1.23,
        },
      ],
    });
  }),
];
