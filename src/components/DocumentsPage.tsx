
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
import { Search, File, FolderOpen } from "lucide-react";

export function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = getCategories();
  
  // Get filtered documents based on category and search query
  const getFilteredDocuments = () => {
    const categoryFiltered = filterDocumentsByCategory(activeCategory);
    if (!searchQuery) return categoryFiltered;
    return searchDocuments(searchQuery).filter(
      doc => activeCategory === 'All' || doc.category === activeCategory
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
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Document Library</h1>
          <p className="text-muted-foreground">
            Browse and view your PDF documents
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="All" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="min-w-fit">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <FolderOpen className="h-16 w-16 mb-4 text-muted-foreground/60" />
            <h3 className="text-xl font-medium">No documents found</h3>
            <p className="text-sm">
              {searchQuery 
                ? "Try adjusting your search or filters" 
                : "There are no documents in this category yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
