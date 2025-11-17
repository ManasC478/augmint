import { useEffect } from "react";
import type { Job } from "@/types";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export interface IJobImageDialogProps {
  job: Job;
  onClose: () => void;
}

const JobImageDialog: React.FC<IJobImageDialogProps> = ({ job, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 flex-shrink-0">
          <div>
            <h3 className="text-lg font-medium">Job Visualization</h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {job._id}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-8 overflow-y-auto">
          {/* Input Images */}
          <div className="flex items-start justify-center gap-8 mb-8">
            {/* Person Image */}
            <div className="flex-1 max-w-xs">
              <div className="relative aspect-[3/4] max-h-[400px] rounded-lg overflow-hidden border border-border bg-muted/30 shadow-card">
                <img
                  src={job.personImageKey}
                  alt="Person"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 font-medium">
                Person Image
              </p>
            </div>

            {/* Garment Image */}
            <div className="flex-1 max-w-xs">
              <div className="relative aspect-[3/4] max-h-[400px] rounded-lg overflow-hidden border border-border bg-muted/30 shadow-card">
                <img
                  src={job.garmentImageKey}
                  alt="Garment"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 font-medium">
                Garment Image
              </p>
            </div>
          </div>

          {/* Result Image */}
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              {job.status === "SUCCESS" && job.resultKey ? (
                <>
                  <div className="relative aspect-[3/4] max-h-[500px] mx-auto rounded-lg overflow-hidden border-2 border-primary/30 bg-muted/30 shadow-card shadow-primary/20">
                    <img
                      src={job.resultKey}
                      alt="Result"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded bg-emerald-500/90 backdrop-blur-sm shadow-lg">
                      <p className="text-xs font-medium text-white">Success</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">
                    Result Image
                  </p>
                  {job.latencyMs && (
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Generated in {(job.latencyMs / 1000).toFixed(2)}s
                    </p>
                  )}
                </>
              ) : job.status === "PROCESSING" ? (
                <div className="aspect-[3/4] max-h-[500px] rounded-lg border border-border bg-muted/30 flex flex-col items-center justify-center shadow-card">
                  <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">Processing...</p>
                </div>
              ) : job.status === "PENDING" ? (
                <div className="aspect-[3/4] max-h-[500px] rounded-lg border border-border bg-muted/30 flex flex-col items-center justify-center shadow-card">
                  <div className="w-12 h-12 border-2 border-amber-500/30 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              ) : (
                <div className="aspect-[3/4] max-h-[500px] rounded-lg border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center shadow-card">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-sm text-red-400 font-medium mb-1">
                    Failed
                  </p>
                  {job.error && (
                    <p className="text-xs text-muted-foreground px-4 text-center">
                      {job.error}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobImageDialog;
