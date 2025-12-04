import { Timestamp } from "firebase/firestore";

export interface Post {
  id?: string;
  title: string;
  slug: string;
  coverImage?: string;
  content: any; // Editor.js data
  tags: string[];
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
