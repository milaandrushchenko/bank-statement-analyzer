import Papa from "papaparse";
import { RawTransaction } from "./types";

export function parseCsv(file: File): Promise<RawTransaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<RawTransaction>(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      encoding: "UTF-8",
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}
