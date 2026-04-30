"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Transaction = {
  date: string;
  counterparty: string;
  description: string;
  amount: number;
};

type Props = {
  data: Transaction[];
};

export function TransactionsTable({ data }: Props) {
  return (
    <div className="mt-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((t, index) => (
            <TableRow key={index}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.counterparty}</TableCell>
              <TableCell>{t.description}</TableCell>

              <TableCell
                className={`text-right ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.amount.toFixed(2)}
              </TableCell>

              <TableCell>
                {t.amount > 0 ? (
                  <span className="text-green-600">Income</span>
                ) : (
                  <span className="text-red-600">Expense</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
