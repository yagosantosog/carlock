import { Timestamp } from "firebase/firestore";

export interface Post {
  id?: string;
  title: string;
  slug: string;
  content: any; // Editor.js data
  tags: string[] | string;
  author: string;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}
