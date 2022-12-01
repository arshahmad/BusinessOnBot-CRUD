export interface PostModel {
  createdAt: Date;
  Title: string | null;
  content: string | null;
  id: string;
  userId: string;
  author: Author;
}
interface Author {
  createdAt: Date;
  name: string;
  avatar: string;
  id: string;
}
