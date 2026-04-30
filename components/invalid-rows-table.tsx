"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvalidRow } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function InvalidRowsTable({ data }: { data: InvalidRow[] }) {
  if (data.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-destructive">Invalid Rows</h2>
        <Badge variant="destructive">{data.length}</Badge>
      </div>

      <div className="rounded-md border border-destructive/20 bg-destructive/5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-20">Row</TableHead>
              <TableHead>Errors</TableHead>
              <TableHead>Raw Data (JSON)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="text-xs">
                <TableCell className="font-mono">{item.row}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-destructive">
                    {item.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="max-w-96 truncate font-mono text-muted-foreground">
                  {JSON.stringify(item.raw)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
