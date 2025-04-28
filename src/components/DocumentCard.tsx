
import { Document } from "@/types/document";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileText, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { formatRelative } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  document: Document;
  onClick: (document: Document) => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const formattedDate = formatRelative(
    new Date(document.updatedAt),
    new Date()
  );

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 overflow-hidden",
        isHovering ? "shadow-lg scale-[1.02]" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(document)}
    >
      <div 
        className={cn(
          "h-48 w-full overflow-hidden",
          isHovering ? "h-40 transition-all duration-300" : ""
        )}
      >
        <img
          src={document.thumbnailUrl}
          alt={document.title}
          className="object-cover w-full h-full transition-transform duration-500"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{document.title}</h3>
          {document.emailStatus && (
            <Badge variant={document.emailStatus === "sent" ? "secondary" : "outline"} className="ml-2">
              {document.emailStatus}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm line-clamp-2">{document.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <FileText size={14} />
          <span>{document.fileSize}</span>
        </div>
        <div className="flex items-center space-x-1">
          {document.emailStatus === "sent" ? (
            <>
              <Mail size={14} />
              <span>Sent {document.lastSentDate ? formatRelative(new Date(document.lastSentDate), new Date()) : ''}</span>
            </>
          ) : (
            <>
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
