"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/lib/types";

type Props = {
  onChange: (filters: { search: string; type: TransactionType }) => void;
};

export function Filters({ onChange }: Props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<TransactionType>("all");

  function handleSearch(value: string) {
    setSearch(value);
    onChange({ search: value, type });
  }

  function handleType(value: TransactionType) {
    setType(value);
    onChange({ search, type: value });
  }

  return (
    <div className="flex gap-4 mt-6">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Select value={type} onValueChange={handleType}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
