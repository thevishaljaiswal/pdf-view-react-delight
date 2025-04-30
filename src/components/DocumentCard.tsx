
import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  document: Document;
  onClick: (document: Document) => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 overflow-hidden flex flex-col h-full",
        isHovering ? "shadow-lg scale-[1.02]" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(document)}
    >
      <div 
        className={cn(
          "h-40 w-full overflow-hidden",
          isHovering ? "h-36 transition-all duration-300" : ""
        )}
      >
        <img
          src={document.thumbnailUrl}
          alt={document.title}
          className="object-cover w-full h-full transition-transform duration-500"
        />
      </div>
      <div className="p-3 flex flex-col justify-between flex-grow bg-gradient-to-b from-card to-card/90">
        <p className="text-xs line-clamp-2 text-muted-foreground mb-2">
          {document.description}
        </p>
        <div className="flex justify-between items-center">
          {document.emailStatus ? (
            <Badge 
              variant={document.emailStatus === "sent" ? "secondary" : "outline"}
              className="text-xs font-medium"
            >
              {document.emailStatus === "sent" && (
                <Mail className="mr-1 h-3 w-3" />
              )}
              {document.emailStatus}
            </Badge>
          ) : <div />}
        </div>
      </div>
    </Card>
  );
}
