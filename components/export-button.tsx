"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCsv } from "@/lib/export-csv";
import { Transaction } from "@/lib/schema";

type Props = {
  data: Transaction[];
};

export function ExportButton({ data }: Props) {
  return (
    <Button
      variant="outline"
      className="flex gap-2 cursor-pointer"
      onClick={() => exportToCsv(data)}
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
