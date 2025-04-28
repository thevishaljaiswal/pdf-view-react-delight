
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Document } from "@/types/document";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowDown, Mail, File, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PdfViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfViewer({ document, isOpen, onClose }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"preview" | "email">("preview");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  if (!document) return null;

  const handleDownload = () => {
    if (!document) return;
    
    // Create an anchor element and set properties for download
    const link = window.document.createElement("a");
    link.href = document.fileUrl;
    link.download = `${document.title}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    // Append to the DOM
    window.document.body.appendChild(link);
    
    // Trigger click event
    link.click();
    
    // Clean up
    window.document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `Downloading ${document.title}...`,
    });
  };

  const handleSendEmail = () => {
    if (!document || !recipientEmail) return;
    
    setIsSending(true);
    
    // Simulate email sending with a timeout
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Email sent successfully!",
        description: `${document.title} was sent to ${recipientEmail}`,
      });
      
      // Reset form
      setActiveTab("preview");
    }, 1500);
  };

  // Pre-populate fields when switching to email tab
  const handleTabChange = (value: string) => {
    if (value === "email" && document) {
      setRecipientEmail(document.recipientEmail || "");
      setEmailSubject(`${document.title} - Document for your review`);
      setEmailBody(`Dear Customer,\n\nPlease find attached the document "${document.title}" for your review.\n\nBest regards,\nYour Company`);
    }
    setActiveTab(value as "preview" | "email");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0">
        <DialogTitle className="sr-only">Document Viewer</DialogTitle>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-primary" />
              <h2 className="font-medium text-lg line-clamp-1">{document.title}</h2>
            </div>
            <div className="flex space-x-2">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="hidden sm:block">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleDownload}
              >
                <ArrowDown className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="sm:hidden border-b">
            <TabsList className="w-full">
              <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
              <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <TabsContent value="preview" className="flex-1 relative min-h-[500px] m-0 p-0">
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
          </TabsContent>
          
          <TabsContent value="email" className="m-0 p-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">Recipient</label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="customer@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-medium">Message</label>
                <textarea
                  id="body"
                  placeholder="Write your message here..."
                  className="w-full min-h-[200px] p-3 border rounded-md resize-y"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button
                  className="flex items-center gap-2"
                  onClick={handleSendEmail}
                  disabled={!recipientEmail || isSending}
                >
                  {isSending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isSending ? "Sending..." : "Send Document"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
}
