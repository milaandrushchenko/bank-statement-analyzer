"use client";

import { CsvUpload } from "@/components/csv-upload";
import { TransactionsTable } from "@/components/transactions-table";
import { parseCsv } from "@/lib/parseCsv";
import { Transaction } from "@/lib/schema";
import { InvalidRow } from "@/lib/types";
import { validateTransaction } from "@/lib/validation";
import { useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invalidRows, setInvalidRows] = useState<InvalidRow[]>([]);

  async function handleFile(file: File) {
    console.log("file", file);

    const data = await parseCsv(file);
    const { valid, invalid } = validateTransaction(data);
    setTransactions(valid);
    setInvalidRows(invalid);
  }

  return (
    <main className="p-6">
      <CsvUpload onFileSelect={handleFile} />
      {transactions.length > 0 && (
        <>
          <TransactionsTable data={transactions} />
        </>
      )}
    </main>
  );
}
