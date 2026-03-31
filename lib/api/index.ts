/**
 * API Module Exports
 * 
 * This module provides a complete API infrastructure that you can easily
 * connect to your backend. All services currently return mock data but
 * are ready to be switched to real API calls.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Set VITE_API_URL environment variable to your backend URL
 * 2. In each service file, uncomment the apiClient calls
 * 3. Remove or modify the mock data returns as needed
 * 
 * USAGE:
 * import { authService, moviesService } from '@/lib/api';
 * 
 * // Login
 * const result = await authService.login({ email, password });
 * 
 * // Get movies
 * const movies = await moviesService.getMovies({ page: 1, limit: 20 });
 */

// Export client utilities
export { apiClient, getToken, setToken, removeToken, setRefreshToken, getRefreshToken } from './client';

// Export all services
export { 
  authService, 
  moviesService, 
  tvShowsService, 
  booksService, 
  listsService, 
  searchService, 
  commentsService, 
  userService 
} from './services';

// Export all types
export type * from './types';
