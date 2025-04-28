
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document } from "@/types/document";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowDown, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PdfViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfViewer({ document, isOpen, onClose }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  if (!document) return null;

  const handleDownload = () => {
    if (!document) return;
    
    // Create an anchor element and set properties for download
    const link = document.createElement("a");
    link.href = document.fileUrl;
    link.download = `${document.title}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    // Append to the DOM
    document.body.appendChild(link);
    
    // Trigger click event
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `Downloading ${document.title}...`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-pdf-primary" />
              <h2 className="font-medium text-lg line-clamp-1">{document.title}</h2>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleDownload}
              >
                <ArrowDown className="mr-1 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative flex-1 min-h-[500px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p className="text-sm text-muted-foreground">Loading document...</p>
                </div>
              </div>
            )}

            <iframe
              src={document.fileUrl}
              title={document.title}
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
