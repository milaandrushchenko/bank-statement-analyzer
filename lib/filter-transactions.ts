import { Transaction } from "./schema";
import { TransactionType } from "./types";

export function filterTransactions(
  data: Transaction[],
  search: string,
  type: TransactionType,
) {
  return data.filter((t) => {
    const matchesSearch =
      t.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      type === "all" ? true : type === "income" ? t.amount > 0 : t.amount < 0;

    return matchesSearch && matchesType;
  });
}
