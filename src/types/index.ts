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

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  githubUrl?: string;
  bio: string;
  joinedDate: Date;
}