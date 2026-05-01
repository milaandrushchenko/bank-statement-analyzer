"use client";

import { CsvUpload } from "@/components/csv-upload";
import { ExportButton } from "@/components/export-button";
import { Filters } from "@/components/filters";
import { InvalidRowsTable } from "@/components/invalid-rows-table";
import { Loader } from "@/components/loader";
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
  const [isLoading, setIsLoading] = useState(false);

  async function handleFile(file: File) {
    setIsLoading(true);

    try {
      const data = await parseCsv(file);
      const { valid, invalid } = validateTransaction(data);
      setTransactions(valid);
      setFilteredTransactions(valid);
      setInvalidRows(invalid);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearFile() {
    setTransactions([]);
    setFilteredTransactions([]);
    setInvalidRows([]);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Bank Statement Analyzer</h1>

        <ThemeToggle />
      </div>

      <CsvUpload onFileSelect={handleFile} onClear={handleClearFile} />
      {isLoading && <Loader />}
      {!isLoading && transactions.length > 0 && (
        <>
          <SummaryCards {...summary} />
          <div className="flex justify-between items-center mt-6 gap-4">
            <Filters onChange={handleFilterChange} />
            <ExportButton data={filteredTransactions} />
          </div>
          <TransactionsTable data={filteredTransactions} />
          <TopCounterparties data={summary.top5} />
        </>
      )}
      {!isLoading && invalidRows.length > 0 && (
        <InvalidRowsTable data={invalidRows} />
      )}
    </main>
  );
}
