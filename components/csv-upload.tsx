"use client";

import { ChangeEvent, useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onFileSelect: (file: File) => void;
  maxSizeMB?: number;
};

const DEFAULT_MAX_SIZE_MB = 10;

export function CsvUpload({
  onFileSelect,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
}: Props) {
  const [dragCounter, setDragCounter] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!file.name.endsWith(".csv")) {
        return "The file must be in CSV format";
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        return `File size exceeds ${maxSizeMB}MB limit`;
      }
      return null;
    },
    [maxSizeMB],
  );

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setFile(null);
        return;
      }
      setError(null);
      setFile(file);
      onFileSelect(file);
    },
    [validateFile, onFileSelect],
  );

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragCounter(0);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = () => {
    setDragCounter((prev) => Math.max(0, prev - 1));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  return (
    <div>
      <Card
        className={cn(
          "flex items-center justify-between p-4 border-2 border-dashed transition-all",
          dragCounter > 0
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        aria-label="CSV file upload zone"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-full">
            <Upload
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-sm font-medium">
              {file ? file.name : "Upload CSV"}
            </p>
            <p className="text-xs text-muted-foreground">
              {!file && "Drag & drop CSV file here or use button below"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {file && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="h-9">
            <label className="cursor-pointer">
              Select file
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Select CSV file"
              />
            </label>
          </Button>
        </div>
      </Card>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-xs font-medium mt-2 p-2">
          <AlertCircle className="w-3 h-3" aria-hidden="true" />
          <span role="alert">{error}</span>
        </div>
      )}
    </div>
  );
}
