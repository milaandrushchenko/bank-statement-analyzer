import * as z from "zod";

export const transactiomSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  counterparty: z.string().min(1, "Counterparty is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number({
    message: "Amount must be a valid number",
  }),
});

export type Transaction = z.infer<typeof transactiomSchema>;
