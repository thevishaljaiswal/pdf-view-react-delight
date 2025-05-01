
import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface DocumentCardProps {
  document: Document;
  onClick: (document: Document) => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(document.updatedAt), { 
    addSuffix: true 
  });
  
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 overflow-hidden flex flex-col h-full group",
        isHovering ? "shadow-lg" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(document)}
    >
      <div className="relative h-32 w-full overflow-hidden bg-secondary/30">
        {document.thumbnailUrl ? (
          <img
            src={document.thumbnailUrl}
            alt={document.title}
            className={cn(
              "object-cover w-full h-full transition-all duration-500",
              isHovering ? "scale-110" : ""
            )}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-10 w-10 text-muted-foreground/60" />
          </div>
        )}
        
        {document.category && (
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs font-medium">
            {document.category}
          </Badge>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-medium line-clamp-1 mb-1 group-hover:text-primary transition-colors">
          {document.title}
        </h3>
        
        <p className="text-xs line-clamp-2 text-muted-foreground mb-3 flex-grow">
          {document.description}
        </p>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> 
            <span>{formattedDate}</span>
          </div>
          
          {document.emailStatus && (
            <Badge 
              variant={document.emailStatus === "sent" ? "secondary" : "outline"}
              className="text-xs font-medium"
            >
              {document.emailStatus === "sent" && (
                <Mail className="mr-1 h-3 w-3" />
              )}
              {document.emailStatus}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
