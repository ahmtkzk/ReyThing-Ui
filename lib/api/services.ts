/**
 * API Services
 * 
 * This file contains all API service methods organized by domain.
 * Each service currently returns mock data but is structured to easily
 * switch to real API calls when your backend is ready.
 * 
 * To switch to real API:
 * 1. Set VITE_API_URL in your environment variables
 * 2. Uncomment the apiClient calls and remove mock data returns
 */

import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
  Movie,
  TvShow,
  Book,
  ContentList,
  Comment,
  SearchParams,
  SearchResult,
  FilterParams,
} from './types';

// ============================================================================
// AUTH SERVICE
// ============================================================================

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            username: credentials.email.split('@')[0],
            email: credentials.email,
            name: 'Demo User',
            avatar: '/placeholder.svg?height=100&width=100',
            joinedAt: new Date().toISOString(),
          },
          token: 'mock_token_' + Date.now(),
        });
      }, 500);
    });
  },
  
  // Signup
  async signup(data: SignupRequest): Promise<AuthResponse> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post<AuthResponse>('/auth/signup', data);
    
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: String(Date.now()),
            username: data.username,
            email: data.email,
            name: data.name,
            joinedAt: new Date().toISOString(),
          },
          token: 'mock_token_' + Date.now(),
        });
      }, 500);
    });
  },
  
  // Logout
  async logout(): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post('/auth/logout');
    
    return Promise.resolve();
  },
  
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<User>('/auth/me');
    
    return Promise.resolve(null);
  },
  
  // Refresh token
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });
    
    return Promise.resolve({ token: 'refreshed_token_' + Date.now() });
  },
};

// ============================================================================
// MOVIES SERVICE
// ============================================================================

export const moviesService = {
  // Get all movies with filters
  async getMovies(params?: FilterParams): Promise<PaginatedResponse<Movie>> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<PaginatedResponse<Movie>>('/movies', params);
    
    // Mock data - will be replaced by API call
    const mockMovies = getMockMovies();
    return Promise.resolve({
      data: mockMovies,
      pagination: { page: 1, limit: 20, total: mockMovies.length, totalPages: 1 },
    });
  },
  
  // Get single movie
  async getMovie(id: string): Promise<Movie> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Movie>(`/movies/${id}`);
    
    const mockMovies = getMockMovies();
    const movie = mockMovies.find(m => m.id === id) || mockMovies[0];
    return Promise.resolve(movie);
  },
  
  // Get trending movies
  async getTrending(): Promise<Movie[]> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Movie[]>('/movies/trending');
    
    return Promise.resolve(getMockMovies().slice(0, 5));
  },
  
  // Get featured movies
  async getFeatured(): Promise<Movie[]> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Movie[]>('/movies/featured');
    
    return Promise.resolve(getMockMovies().slice(0, 3));
  },
  
  // Rate a movie
  async rateMovie(id: string, rating: number): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/movies/${id}/rate`, { rating });
    
    return Promise.resolve();
  },
};

// ============================================================================
// TV SHOWS SERVICE
// ============================================================================

export const tvShowsService = {
  // Get all TV shows with filters
  async getTvShows(params?: FilterParams): Promise<PaginatedResponse<TvShow>> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<PaginatedResponse<TvShow>>('/tv-shows', params);
    
    const mockTvShows = getMockTvShows();
    return Promise.resolve({
      data: mockTvShows,
      pagination: { page: 1, limit: 20, total: mockTvShows.length, totalPages: 1 },
    });
  },
  
  // Get single TV show
  async getTvShow(id: string): Promise<TvShow> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<TvShow>(`/tv-shows/${id}`);
    
    const mockTvShows = getMockTvShows();
    const show = mockTvShows.find(s => s.id === id) || mockTvShows[0];
    return Promise.resolve(show);
  },
  
  // Get trending TV shows
  async getTrending(): Promise<TvShow[]> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<TvShow[]>('/tv-shows/trending');
    
    return Promise.resolve(getMockTvShows().slice(0, 5));
  },
  
  // Rate a TV show
  async rateTvShow(id: string, rating: number): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/tv-shows/${id}/rate`, { rating });
    
    return Promise.resolve();
  },
};

// ============================================================================
// BOOKS SERVICE
// ============================================================================

export const booksService = {
  // Get all books with filters
  async getBooks(params?: FilterParams): Promise<PaginatedResponse<Book>> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<PaginatedResponse<Book>>('/books', params);
    
    const mockBooks = getMockBooks();
    return Promise.resolve({
      data: mockBooks,
      pagination: { page: 1, limit: 20, total: mockBooks.length, totalPages: 1 },
    });
  },
  
  // Get single book
  async getBook(id: string): Promise<Book> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Book>(`/books/${id}`);
    
    const mockBooks = getMockBooks();
    const book = mockBooks.find(b => b.id === id) || mockBooks[0];
    return Promise.resolve(book);
  },
  
  // Get trending books
  async getTrending(): Promise<Book[]> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Book[]>('/books/trending');
    
    return Promise.resolve(getMockBooks().slice(0, 5));
  },
  
  // Rate a book
  async rateBook(id: string, rating: number): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/books/${id}/rate`, { rating });
    
    return Promise.resolve();
  },
};

// ============================================================================
// LISTS SERVICE
// ============================================================================

export const listsService = {
  // Get all lists
  async getLists(params?: FilterParams): Promise<PaginatedResponse<ContentList>> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<PaginatedResponse<ContentList>>('/lists', params);
    
    const mockLists = getMockLists();
    return Promise.resolve({
      data: mockLists,
      pagination: { page: 1, limit: 20, total: mockLists.length, totalPages: 1 },
    });
  },
  
  // Get single list
  async getList(id: string): Promise<ContentList> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<ContentList>(`/lists/${id}`);
    
    const mockLists = getMockLists();
    const list = mockLists.find(l => l.id === id) || mockLists[0];
    return Promise.resolve(list);
  },
  
  // Create a list
  async createList(data: { title: string; description?: string; isPublic: boolean }): Promise<ContentList> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post<ContentList>('/lists', data);
    
    return Promise.resolve({
      id: String(Date.now()),
      ...data,
      itemCount: 0,
      likes: 0,
      createdBy: { id: '1', username: 'demo' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: data.isPublic,
    });
  },
  
  // Update a list
  async updateList(id: string, data: Partial<ContentList>): Promise<ContentList> {
    // TODO: Uncomment when backend is ready
    // return apiClient.patch<ContentList>(`/lists/${id}`, data);
    
    const mockLists = getMockLists();
    const list = mockLists.find(l => l.id === id) || mockLists[0];
    return Promise.resolve({ ...list, ...data });
  },
  
  // Delete a list
  async deleteList(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.delete(`/lists/${id}`);
    
    return Promise.resolve();
  },
  
  // Add item to list
  async addToList(listId: string, contentId: string, contentType: 'movie' | 'tv' | 'book'): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/lists/${listId}/items`, { contentId, contentType });
    
    return Promise.resolve();
  },
  
  // Remove item from list
  async removeFromList(listId: string, contentId: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.delete(`/lists/${listId}/items/${contentId}`);
    
    return Promise.resolve();
  },
};

// ============================================================================
// SEARCH SERVICE
// ============================================================================

export const searchService = {
  // Search all content
  async search(params: SearchParams): Promise<PaginatedResponse<SearchResult>> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<PaginatedResponse<SearchResult>>('/search', params);
    
    // Mock search - combines all content
    const allContent: SearchResult[] = [
      ...getMockMovies().map(m => ({ ...m, type: 'movie' as const })),
      ...getMockTvShows().map(s => ({ ...s, type: 'tv' as const })),
      ...getMockBooks().map(b => ({ ...b, type: 'book' as const })),
    ];
    
    const filtered = allContent.filter(item => 
      item.title.toLowerCase().includes(params.query.toLowerCase())
    );
    
    return Promise.resolve({
      data: filtered,
      pagination: { page: 1, limit: 20, total: filtered.length, totalPages: 1 },
    });
  },
};

// ============================================================================
// COMMENTS SERVICE
// ============================================================================

export const commentsService = {
  // Get comments for content
  async getComments(contentId: string, contentType: 'movie' | 'tv' | 'book'): Promise<Comment[]> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<Comment[]>(`/comments`, { contentId, contentType });
    
    return Promise.resolve([]);
  },
  
  // Add a comment
  async addComment(data: { contentId: string; contentType: 'movie' | 'tv' | 'book'; text: string; rating?: number; spoiler?: boolean }): Promise<Comment> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post<Comment>('/comments', data);
    
    return Promise.resolve({
      id: String(Date.now()),
      userId: '1',
      username: 'demo',
      ...data,
      spoiler: data.spoiler || false,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },
  
  // Delete a comment
  async deleteComment(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.delete(`/comments/${id}`);
    
    return Promise.resolve();
  },
  
  // Like a comment
  async likeComment(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/comments/${id}/like`);
    
    return Promise.resolve();
  },
};

// ============================================================================
// USER SERVICE
// ============================================================================

export const userService = {
  // Get user profile
  async getProfile(username: string): Promise<User> {
    // TODO: Uncomment when backend is ready
    // return apiClient.get<User>(`/users/${username}`);
    
    return Promise.resolve({
      id: '1',
      username,
      email: `${username}@example.com`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      avatar: '/placeholder.svg?height=100&width=100',
      bio: 'Film ve dizi tutkunu.',
      joinedAt: '2024-01-15T10:00:00Z',
      stats: {
        moviesWatched: 156,
        tvShowsWatched: 48,
        booksRead: 32,
        listsCreated: 12,
        following: 89,
        followers: 234,
      },
    });
  },
  
  // Update profile
  async updateProfile(data: Partial<User>): Promise<User> {
    // TODO: Uncomment when backend is ready
    // return apiClient.patch<User>('/users/me', data);
    
    return Promise.resolve({
      id: '1',
      username: 'demo',
      email: 'demo@example.com',
      name: 'Demo User',
      joinedAt: new Date().toISOString(),
      ...data,
    });
  },
  
  // Follow user
  async followUser(username: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.post(`/users/${username}/follow`);
    
    return Promise.resolve();
  },
  
  // Unfollow user
  async unfollowUser(username: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // return apiClient.delete(`/users/${username}/follow`);
    
    return Promise.resolve();
  },
};

// ============================================================================
// MOCK DATA HELPERS
// ============================================================================

function getMockMovies(): Movie[] {
  return [
    {
      id: "1",
      title: "Oppenheimer",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      backdrop: "/placeholder.svg?height=600&width=1200",
      genres: ["Drama", "Tarih", "Biyografi"],
      averageRating: 8.5,
      totalRatings: 1500,
      description: "Amerikan bilim adamı J. Robert Oppenheimer'ın hikayesi ve atom bombasının geliştirilmesindeki rolü.",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
      duration: 180,
      commentCount: 234,
    },
    {
      id: "2",
      title: "Dune: Part Two",
      year: 2024,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Bilim Kurgu", "Macera"],
      averageRating: 8.8,
      totalRatings: 1200,
      director: "Denis Villeneuve",
      commentCount: 189,
    },
    {
      id: "3",
      title: "Poor Things",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Fantastik", "Komedi", "Drama"],
      averageRating: 8.2,
      totalRatings: 890,
      director: "Yorgos Lanthimos",
      commentCount: 156,
    },
    {
      id: "4",
      title: "The Holdovers",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Drama", "Komedi"],
      averageRating: 7.9,
      totalRatings: 650,
      commentCount: 98,
    },
    {
      id: "5",
      title: "Killers of the Flower Moon",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Drama", "Suç", "Tarih"],
      averageRating: 8.1,
      totalRatings: 980,
      director: "Martin Scorsese",
      commentCount: 145,
    },
  ];
}

function getMockTvShows(): TvShow[] {
  return [
    {
      id: "1",
      title: "Shogun",
      year: 2024,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Drama", "Tarih"],
      averageRating: 9.0,
      totalRatings: 2100,
      seasons: 1,
      episodes: 10,
      status: "ended",
      commentCount: 312,
    },
    {
      id: "2",
      title: "True Detective: Night Country",
      year: 2024,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Gerilim", "Gizem"],
      averageRating: 7.8,
      totalRatings: 1500,
      seasons: 4,
      status: "ended",
      commentCount: 198,
    },
    {
      id: "3",
      title: "3 Body Problem",
      year: 2024,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Bilim Kurgu", "Drama"],
      averageRating: 7.6,
      totalRatings: 1800,
      seasons: 1,
      status: "ongoing",
      commentCount: 267,
    },
    {
      id: "4",
      title: "The Bear",
      year: 2022,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Drama", "Komedi"],
      averageRating: 8.7,
      totalRatings: 2500,
      seasons: 3,
      status: "ongoing",
      commentCount: 445,
    },
  ];
}

function getMockBooks(): Book[] {
  return [
    {
      id: "1",
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      year: 2022,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Kurgu", "Roman"],
      averageRating: 8.4,
      totalRatings: 890,
      author: "Gabrielle Zevin",
      pages: 416,
      commentCount: 134,
    },
    {
      id: "2",
      title: "Demon Copperhead",
      year: 2022,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Kurgu", "Drama"],
      averageRating: 8.6,
      totalRatings: 720,
      author: "Barbara Kingsolver",
      pages: 560,
      commentCount: 98,
    },
    {
      id: "3",
      title: "The House in the Pines",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Gerilim", "Gizem"],
      averageRating: 7.5,
      totalRatings: 450,
      author: "Ana Reyes",
      pages: 304,
      commentCount: 67,
    },
    {
      id: "4",
      title: "Holly",
      year: 2023,
      poster: "/placeholder.svg?height=450&width=300",
      genres: ["Korku", "Gerilim"],
      averageRating: 7.8,
      totalRatings: 680,
      author: "Stephen King",
      pages: 464,
      commentCount: 112,
    },
  ];
}

function getMockLists(): ContentList[] {
  return [
    {
      id: "1",
      title: "2024'ün En İyileri",
      description: "Bu yılın kaçırılmaması gereken yapımları",
      coverImage: "/placeholder.svg?height=300&width=400",
      itemCount: 25,
      likes: 342,
      createdBy: { id: "1", username: "filmci", avatar: "/placeholder.svg?height=40&width=40" },
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-03-20T15:30:00Z",
      isPublic: true,
    },
    {
      id: "2",
      title: "Klasik Filmler",
      description: "Herkesin izlemesi gereken klasikler",
      coverImage: "/placeholder.svg?height=300&width=400",
      itemCount: 50,
      likes: 567,
      createdBy: { id: "2", username: "sinemaci", avatar: "/placeholder.svg?height=40&width=40" },
      createdAt: "2023-06-10T14:00:00Z",
      updatedAt: "2024-02-28T09:15:00Z",
      isPublic: true,
    },
    {
      id: "3",
      title: "Bilim Kurgu Seçkisi",
      description: "En iyi bilim kurgu filmleri ve dizileri",
      coverImage: "/placeholder.svg?height=300&width=400",
      itemCount: 35,
      likes: 289,
      createdBy: { id: "3", username: "scifan", avatar: "/placeholder.svg?height=40&width=40" },
      createdAt: "2023-11-20T18:00:00Z",
      updatedAt: "2024-03-15T12:00:00Z",
      isPublic: true,
    },
  ];
}
