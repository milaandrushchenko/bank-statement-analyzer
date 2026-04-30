import { Transaction } from "./schema";
import { Summary } from "./types";

export function calculateSummary(data: Transaction[]): Summary {
  let totalIncome = 0;
  let totalExpense = 0;

  const expenseMap: Record<string, number> = {};

  for (const t of data) {
    if (t.amount > 0) {
      totalIncome += t.amount;
    } else {
      totalExpense += Math.abs(t.amount);

      const current = expenseMap[t.counterparty] || 0;
      expenseMap[t.counterparty] = current + Math.abs(t.amount);
    }
  }

  const top5 = Object.entries(expenseMap)
    .map(([counterparty, total]) => ({ counterparty, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return {
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    count: data.length,
    top5,
  };
}
