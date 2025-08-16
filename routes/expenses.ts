import { Hono } from "hono";

type Expense = {
  id: number;
  amount: number;
  title: string;
};

const fakeExpenses: Expense[] = [
  { id: 1, amount: 100, title: "Groceries" },
  { id: 2, amount: 50, title: "Utilities" },
  { id: 3, amount: 200, title: "Rent" },
  { id: 4, amount: 30, title: "Transport" },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .post("/", async (c) => {
    const expense = await c.req.json<Expense>();
    console.log("expense: ", expense);
    return c.json({ expense });
  });
//   .delete;
//   .put;
