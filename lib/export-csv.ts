import Papa from "papaparse";
import { Transaction } from "./schema";

export function exportToCsv(data: Transaction[]) {
  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "filtered-transactions.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
