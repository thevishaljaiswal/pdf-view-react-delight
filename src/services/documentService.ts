
import { Document } from "@/types/document";

// Mock data for our PDF documents
export const documents: Document[] = [
  {
    id: "1",
    title: "Annual Financial Report 2024",
    description: "Comprehensive financial analysis for the fiscal year 2024",
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-04-01T14:20:00Z",
    fileSize: "2.4 MB",
    thumbnailUrl: "https://placehold.co/300x400/EFF6FF/3B82F6?text=Financial+Report",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    category: "Finance"
  },
  {
    id: "2",
    title: "Product Roadmap Q2",
    description: "Strategic product development plan for Q2 2024",
    createdAt: "2024-04-05T09:15:00Z",
    updatedAt: "2024-04-10T11:45:00Z",
    fileSize: "1.8 MB",
    thumbnailUrl: "https://placehold.co/300x400/F0FDF4/22C55E?text=Product+Roadmap",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Product"
  },
  {
    id: "3",
    title: "HR Policy Manual",
    description: "Updated employee handbook and company policies",
    createdAt: "2024-02-20T13:45:00Z",
    updatedAt: "2024-03-25T16:30:00Z",
    fileSize: "3.2 MB",
    thumbnailUrl: "https://placehold.co/300x400/FEF2F2/EF4444?text=HR+Manual",
    fileUrl: "https://www.orimi.com/pdf-test.pdf",
    category: "HR"
  },
  {
    id: "4",
    title: "Marketing Campaign Results",
    description: "Analysis of Q1 marketing campaigns and outcomes",
    createdAt: "2024-04-12T08:30:00Z",
    updatedAt: "2024-04-20T15:10:00Z",
    fileSize: "4.5 MB",
    thumbnailUrl: "https://placehold.co/300x400/F0F9FF/0EA5E9?text=Marketing+Report",
    fileUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    category: "Marketing"
  },
  {
    id: "5",
    title: "User Research Findings",
    description: "Summary of user interviews and usability testing",
    createdAt: "2024-03-02T11:20:00Z",
    updatedAt: "2024-03-15T09:45:00Z",
    fileSize: "2.1 MB",
    thumbnailUrl: "https://placehold.co/300x400/FDF4FF/D946EF?text=User+Research",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    category: "Research"
  },
  {
    id: "6",
    title: "Technical Specifications",
    description: "Detailed technical documentation for the new platform",
    createdAt: "2024-04-08T14:00:00Z",
    updatedAt: "2024-04-18T17:30:00Z",
    fileSize: "5.7 MB",
    thumbnailUrl: "https://placehold.co/300x400/F1F5F9/64748B?text=Tech+Specs",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Engineering"
  },
  {
    id: "7",
    title: "Client Presentation",
    description: "Slides for the upcoming client meeting",
    createdAt: "2024-04-22T10:00:00Z",
    updatedAt: "2024-04-25T16:15:00Z",
    fileSize: "3.8 MB",
    thumbnailUrl: "https://placehold.co/300x400/FFF7ED/F97316?text=Presentation",
    fileUrl: "https://www.orimi.com/pdf-test.pdf",
    category: "Sales"
  },
  {
    id: "8",
    title: "Legal Contract",
    description: "Service agreement with new vendor",
    createdAt: "2024-03-28T09:30:00Z",
    updatedAt: "2024-04-15T11:20:00Z",
    fileSize: "1.2 MB",
    thumbnailUrl: "https://placehold.co/300x400/ECFEFF/06B6D4?text=Legal+Contract",
    fileUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    category: "Legal"
  }
];

// Function to fetch all documents
export const getAllDocuments = (): Document[] => {
  return documents;
};

// Function to get a document by ID
export const getDocumentById = (id: string): Document | undefined => {
  return documents.find(doc => doc.id === id);
};

// Function to search documents by title
export const searchDocuments = (query: string): Document[] => {
  const lowercaseQuery = query.toLowerCase();
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) || 
    doc.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to filter documents by category
export const filterDocumentsByCategory = (category: string): Document[] => {
  if (!category || category === 'All') return documents;
  return documents.filter(doc => doc.category === category);
};

// Get unique categories from documents
export const getCategories = (): string[] => {
  const categories = new Set(documents.map(doc => doc.category));
  return ['All', ...Array.from(categories)];
};
