
export interface Document {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  fileSize: string;
  thumbnailUrl: string;
  fileUrl: string;
  category: string;
  recipientEmail?: string;
  emailSubject?: string;
  emailStatus?: "sent" | "draft" | "scheduled" | null;
  lastSentDate?: string | null;
}
