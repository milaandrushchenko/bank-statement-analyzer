import { CsvUpload } from "@/components/csv-upload";

export default function Home() {
  async function handleFile(file: File) {
    console.log("file", file);
  }

  return (
    <main className="p-6">
      <CsvUpload onFileSelect={handleFile} />
    </main>
  );
}
