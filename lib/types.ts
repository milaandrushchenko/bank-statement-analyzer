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
