import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const fakeExpenses: Expense[] = [
  { id: 1, amount: 100, title: "Groceries" },
  { id: 2, amount: 50, title: "Utilities" },
  { id: 3, amount: 200, title: "Rent" },
  { id: 4, amount: 30, title: "Transport" },
];

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  amount: z.number().int().positive(),
  title: z.string().min(1).max(100),
});
const createExpenseSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .get("/total-expenses", (c) => {
    const totalSpent = fakeExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

    c.status(201);
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }

    fakeExpenses.splice(fakeExpenses.indexOf(expense), 1);
    return c.json({ message: "Expense deleted successfully." });
  });
//   .put;
