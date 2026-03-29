export type ContentType = "movie" | "tv" | "book";

export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
  backdrop: string;
  genres: string[];
  director: string;
  cast: string[];
  runtime: number;
  synopsis: string;
  averageRating: number;
  totalRatings: number;
}

export interface TVShow {
  id: string;
  title: string;
  year: number;
  endYear?: number;
  poster: string;
  backdrop: string;
  genres: string[];
  creator: string;
  cast: string[];
  seasons: number;
  episodes: number;
  synopsis: string;
  averageRating: number;
  totalRatings: number;
  status: "Ongoing" | "Ended" | "Cancelled";
}

export interface Book {
  id: string;
  title: string;
  year: number;
  cover: string;
  genres: string[];
  author: string;
  pages: number;
  synopsis: string;
  averageRating: number;
  totalRatings: number;
  publisher: string;
  isbn: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export interface Rating {
  id: string;
  userId: string;
  contentId: string;
  contentType: ContentType;
  score: number;
  date: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  contentId: string;
  contentType: ContentType;
  text: string;
  date: string;
}

export interface ListItem {
  contentId: string;
  contentType: ContentType;
  addedAt: string;
  notes?: string;
}

export interface UserList {
  id: string;
  name: string;
  description: string;
  userId: string;
  username: string;
  items: ListItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  averageRating: number;
  type: ContentType;
}
