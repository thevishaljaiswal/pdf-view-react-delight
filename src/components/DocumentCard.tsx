
import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail, FileText, Calendar, Eye } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
        "relative cursor-pointer overflow-hidden h-full group border-none",
        "transition-all duration-300 bg-gradient-to-br from-card to-background"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(document)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
        {document.thumbnailUrl ? (
          <img
            src={document.thumbnailUrl}
            alt={document.title}
            className={cn(
              "object-cover w-full h-full transition-all duration-500",
              isHovering ? "scale-105" : "scale-100"
            )}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-12 w-12 text-muted-foreground/60" />
          </div>
        )}

        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/90 to-transparent",
          "opacity-70 transition-opacity",
          isHovering ? "opacity-90" : "opacity-70"
        )}/>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="font-semibold line-clamp-1 text-sm md:text-base group-hover:text-primary transition-colors">
            {document.title}
          </h3>
        </div>
        
        {document.category && (
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs font-medium">
            {document.category}
          </Badge>
        )}
        
        {isHovering && (
          <div className="absolute top-2 left-2 z-10 animate-fade-in">
            <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1">
              <Eye size={12} />
              <span>View</span>
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> 
            <span>{formattedDate}</span>
          </div>
          
          {document.emailStatus && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge 
                  variant={document.emailStatus === "sent" ? "secondary" : "outline"}
                  className="text-xs font-medium cursor-pointer"
                >
                  {document.emailStatus === "sent" && (
                    <Mail className="mr-1 h-3 w-3" />
                  )}
                  {document.emailStatus}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-56 p-2 text-xs">
                {document.emailStatus === "sent" 
                  ? `Sent ${document.lastSentDate ? formatDistanceToNow(new Date(document.lastSentDate), { addSuffix: true }) : ''}`
                  : `${document.emailStatus} email`
                }
                {document.recipientEmail && (
                  <div className="mt-1">To: {document.recipientEmail}</div>
                )}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        
        <p className="text-xs line-clamp-2 text-muted-foreground">
          {document.description}
        </p>
      </div>
    </Card>
  );
}
