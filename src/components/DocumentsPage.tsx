
import React, { useState } from "react";
import { 
  getAllDocuments, 
  getCategories, 
  filterDocumentsByCategory, 
  searchDocuments 
} from "@/services/documentService";
import { DocumentCard } from "./DocumentCard";
import { Document } from "@/types/document";
import { PdfViewer } from "./PdfViewer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, FolderOpen, Mail, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeView, setActiveView] = useState<"all" | "emails">("all");
  
  const categories = getCategories();
  
  // Get filtered documents based on category and search query
  const getFilteredDocuments = () => {
    let docs = filterDocumentsByCategory(activeCategory);
    
    if (activeView === "emails") {
      docs = docs.filter(doc => doc.emailStatus);
    }
    
    if (!searchQuery) return docs;
    
    return searchDocuments(searchQuery).filter(
      doc => (activeCategory === 'All' || doc.category === activeCategory) && 
      (activeView === 'all' || (activeView === 'emails' && doc.emailStatus))
    );
  };
  
  const filteredDocuments = getFilteredDocuments();
  
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };
  
  const handleViewerClose = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="container py-6 animate-fade-in max-w-screen-2xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Document Library</h1>
            <p className="text-muted-foreground text-sm">
              Browse, view and send documents to customers
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Tabs defaultValue={activeView} value={activeView} onValueChange={(v) => setActiveView(v as "all" | "emails")} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>All Documents</span>
                </TabsTrigger>
                <TabsTrigger value="emails" className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>Email History</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center rounded-md bg-secondary/50 p-1">
              <Filter className="h-4 w-4 text-muted-foreground ml-2" />
              <p className="text-xs text-muted-foreground font-medium mx-2">Categories:</p>
            </div>
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "shadow-sm" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <FolderOpen className="h-16 w-16 mb-4 text-muted-foreground/60" />
            <h3 className="text-xl font-medium">No documents found</h3>
            <p className="text-sm">
              {searchQuery 
                ? "Try adjusting your search or filters" 
                : activeView === "emails" 
                  ? "No documents have been emailed yet" 
                  : "There are no documents in this category yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="animate-slide-in">
                <DocumentCard
                  document={document}
                  onClick={handleDocumentClick}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <PdfViewer
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
      />
    </div>
  );
}
