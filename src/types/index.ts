export interface DevlogEntry {
  id: string;
  content: string;
  timestamp: Date;
  tags: string[];
  codeSnippet?: {
    code: string;
    language: string;
  };
  image?: string;
  likes: number;
  shares: number;
  templateId?: string;
}