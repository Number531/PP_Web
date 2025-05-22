export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categories: string[];
  readTime: number;
}
