export type RawTransaction = {
  date: string;
  counterparty: string;
  description: string;
  amount: string;
};

export type InvalidRow = {
  row: number;
  errors: string[];
  raw: RawTransaction;
};

export type TransactionType = "all" | "income" | "expense";

export type Summary = {
  totalIncome: number;
  totalExpense: number;
  net: number;
  count: number;
  top5: { counterparty: string; total: number }[];
};
