// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  stats?: UserStats;
}

export interface UserStats {
  moviesWatched: number;
  tvShowsWatched: number;
  booksRead: number;
  listsCreated: number;
  following: number;
  followers: number;
}

// Content Types
export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
  backdrop?: string;
  genres: string[];
  averageRating: number;
  totalRatings: number;
  description?: string;
  director?: string;
  cast?: string[];
  duration?: number;
  releaseDate?: string;
  commentCount?: number;
}

export interface TvShow {
  id: string;
  title: string;
  year: number;
  poster: string;
  backdrop?: string;
  genres: string[];
  averageRating: number;
  totalRatings: number;
  description?: string;
  creator?: string;
  cast?: string[];
  seasons?: number;
  episodes?: number;
  status?: 'ongoing' | 'ended' | 'cancelled';
  commentCount?: number;
}

export interface Book {
  id: string;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  averageRating: number;
  totalRatings: number;
  description?: string;
  author?: string;
  pages?: number;
  publisher?: string;
  isbn?: string;
  commentCount?: number;
}

export interface ContentList {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  likes: number;
  createdBy: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  items?: (Movie | TvShow | Book)[];
  isPublic: boolean;
}

// Comment & Rating Types
export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  contentId: string;
  contentType: 'movie' | 'tv' | 'book';
  text: string;
  rating?: number;
  spoiler: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  userId: string;
  contentId: string;
  contentType: 'movie' | 'tv' | 'book';
  rating: number;
  createdAt: string;
}

// Search Types
export interface SearchParams {
  query: string;
  type?: 'movie' | 'tv' | 'book' | 'all';
  genre?: string;
  year?: number;
  minRating?: number;
  sortBy?: 'rating' | 'year' | 'title' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'book';
  year: number;
  poster: string;
  genres: string[];
  averageRating: number;
}

// Filter Types
export interface FilterParams {
  genre?: string;
  year?: number;
  minRating?: number;
  sortBy?: 'rating' | 'year' | 'title' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
