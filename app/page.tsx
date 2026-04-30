"use client";

import { CsvUpload } from "@/components/csv-upload";
import { parseCsv } from "@/lib/parseCsv";
import { validateTransaction } from "@/lib/validation";

export default function Home() {
  async function handleFile(file: File) {
    console.log("file", file);

    const data = await parseCsv(file);
    const { valid, invalid } = validateTransaction(data);
    console.log("valid", valid);
    console.log("invalid", invalid);
  }

  return (
    <main className="p-6">
      <CsvUpload onFileSelect={handleFile} />
    </main>
  );
}
