import { describe, it, expect } from "vitest";
import { calculateSummary } from "./statement";
import { Transaction } from "./schema";

describe("calculateSummary", () => {
  it("should correctly calculate totals and return top 5 expenses", () => {
    const transactions: Transaction[] = [
      {
        date: "2024-01-01",
        counterparty: "Employer",
        description: "Salary",
        amount: 5000,
      },
      {
        date: "2024-01-02",
        counterparty: "Store A",
        description: "Groceries",
        amount: -150,
      },
      {
        date: "2024-01-03",
        counterparty: "Store B",
        description: "Gas",
        amount: -100,
      },
      {
        date: "2024-01-04",
        counterparty: "Store A",
        description: "Groceries 2",
        amount: -200,
      },
      {
        date: "2024-01-05",
        counterparty: "Restaurant",
        description: "Dinner",
        amount: -50,
      },
      {
        date: "2024-01-06",
        counterparty: "Utilities",
        description: "Electric bill",
        amount: -80,
      },
      {
        date: "2024-01-07",
        counterparty: "Cinema",
        description: "Movie tickets",
        amount: -30,
      },
    ];

    const result = calculateSummary(transactions);

    expect(result.totalIncome).toBe(5000);
    expect(result.totalExpense).toBe(610);
    expect(result.net).toBe(4390);
    expect(result.count).toBe(7);
    expect(result.top5).toEqual([
      { counterparty: "Store A", total: 350 },
      { counterparty: "Store B", total: 100 },
      { counterparty: "Utilities", total: 80 },
      { counterparty: "Restaurant", total: 50 },
      { counterparty: "Cinema", total: 30 },
    ]);
  });
});
