"use client";

import { CsvUpload } from "@/components/csv-upload";
import { Filters } from "@/components/filters";
import { InvalidRowsTable } from "@/components/invalid-rows-table";
import { SummaryCards } from "@/components/summary-cards";
import { ThemeToggle } from "@/components/theme-toggle";
import { TopCounterparties } from "@/components/top-counterparties";
import { TransactionsTable } from "@/components/transactions-table";
import { filterTransactions } from "@/lib/filter-transactions";
import { parseCsv } from "@/lib/parseCsv";
import { Transaction } from "@/lib/schema";
import { calculateSummary } from "@/lib/statement";
import { InvalidRow, TransactionType } from "@/lib/types";
import { validateTransaction } from "@/lib/validation";
import { useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [invalidRows, setInvalidRows] = useState<InvalidRow[]>([]);

  async function handleFile(file: File) {
    const data = await parseCsv(file);
    const { valid, invalid } = validateTransaction(data);
    setTransactions(valid);
    setFilteredTransactions(valid);
    setInvalidRows(invalid);
  }

  function handleFilterChange({
    search,
    type,
  }: {
    search: string;
    type: TransactionType;
  }) {
    const result = filterTransactions(transactions, search, type);
    setFilteredTransactions(result);
  }

  const summary = calculateSummary(transactions);

  return (
    <main className="p-6">
      <ThemeToggle />
      <CsvUpload onFileSelect={handleFile} />
      {transactions.length > 0 && (
        <>
          <SummaryCards {...summary} />
          <Filters onChange={handleFilterChange} />
          <TransactionsTable data={filteredTransactions} />
          <TopCounterparties data={summary.top5} />
        </>
      )}
      {invalidRows.length > 0 && <InvalidRowsTable data={invalidRows} />}
    </main>
  );
}
