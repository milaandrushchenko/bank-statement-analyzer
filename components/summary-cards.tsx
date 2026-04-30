"use client";

import { Card } from "@/components/ui/card";
import { Summary } from "@/lib/types";

type Props = Omit<Summary, "top5">;

export function SummaryCards({ totalIncome, totalExpense, net, count }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Total Income</p>
        <p className="text-lg font-semibold text-green-600">
          {totalIncome.toFixed(2)}
        </p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Total Expense</p>
        <p className="text-lg font-semibold text-red-600">
          {totalExpense.toFixed(2)}
        </p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Net</p>
        <p
          className={`text-lg font-semibold ${
            net >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {net.toFixed(2)}
        </p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Transactions</p>
        <p className="text-lg font-semibold">{count}</p>
      </Card>
    </div>
  );
}
