import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Processing file...</span>
    </div>
  );
}
