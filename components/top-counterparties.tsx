"use client";

import { Summary } from "@/lib/types";

type Props = {
  data: Summary["top5"];
};

export function TopCounterparties({ data }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Top 5 Expenses</h2>

      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.counterparty}
            className="flex justify-between border-b pb-1"
          >
            <span>{item.counterparty}</span>
            <span className="text-red-600">{item.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
