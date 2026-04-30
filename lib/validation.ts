import { transactiomSchema, Transaction } from "./schema";
import { InvalidRow, RawTransaction } from "./types";

export function validateTransaction(rows: RawTransaction[]) {
  const valid: Transaction[] = [];
  const invalid: InvalidRow[] = [];
  rows.forEach((row, index) => {
    const result = transactiomSchema.safeParse(row);
    if (result.success) {
      valid.push(result.data);
    } else {
      invalid.push({
        row: index + 1,
        errors: result.error.issues.map((i) => i.message),
        raw: row,
      });
    }
  });

  return { valid, invalid };
}
