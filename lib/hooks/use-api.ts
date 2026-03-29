/**
 * API Hooks using SWR
 * 
 * These hooks provide a convenient way to fetch and cache data
 * using SWR (stale-while-revalidate) pattern.
 */

import useSWR from 'swr';
import { 
  moviesService, 
  tvShowsService, 
  booksService, 
  listsService, 
  searchService,
  userService,
} from '@/lib/api';
import type { FilterParams, SearchParams } from '@/lib/api/types';

// ============================================================================
// MOVIES HOOKS
// ============================================================================

export function useMovies(params?: FilterParams) {
  return useSWR(
    ['movies', params],
    () => moviesService.getMovies(params),
    { revalidateOnFocus: false }
  );
}

export function useMovie(id: string | undefined) {
  return useSWR(
    id ? ['movie', id] : null,
    () => moviesService.getMovie(id!),
    { revalidateOnFocus: false }
  );
}

export function useTrendingMovies() {
  return useSWR(
    'movies/trending',
    () => moviesService.getTrending(),
    { revalidateOnFocus: false }
  );
}

export function useFeaturedMovies() {
  return useSWR(
    'movies/featured',
    () => moviesService.getFeatured(),
    { revalidateOnFocus: false }
  );
}

// ============================================================================
// TV SHOWS HOOKS
// ============================================================================

export function useTvShows(params?: FilterParams) {
  return useSWR(
    ['tv-shows', params],
    () => tvShowsService.getTvShows(params),
    { revalidateOnFocus: false }
  );
}

export function useTvShow(id: string | undefined) {
  return useSWR(
    id ? ['tv-show', id] : null,
    () => tvShowsService.getTvShow(id!),
    { revalidateOnFocus: false }
  );
}

export function useTrendingTvShows() {
  return useSWR(
    'tv-shows/trending',
    () => tvShowsService.getTrending(),
    { revalidateOnFocus: false }
  );
}

// ============================================================================
// BOOKS HOOKS
// ============================================================================

export function useBooks(params?: FilterParams) {
  return useSWR(
    ['books', params],
    () => booksService.getBooks(params),
    { revalidateOnFocus: false }
  );
}

export function useBook(id: string | undefined) {
  return useSWR(
    id ? ['book', id] : null,
    () => booksService.getBook(id!),
    { revalidateOnFocus: false }
  );
}

export function useTrendingBooks() {
  return useSWR(
    'books/trending',
    () => booksService.getTrending(),
    { revalidateOnFocus: false }
  );
}

// ============================================================================
// LISTS HOOKS
// ============================================================================

export function useLists(params?: FilterParams) {
  return useSWR(
    ['lists', params],
    () => listsService.getLists(params),
    { revalidateOnFocus: false }
  );
}

export function useList(id: string | undefined) {
  return useSWR(
    id ? ['list', id] : null,
    () => listsService.getList(id!),
    { revalidateOnFocus: false }
  );
}

// ============================================================================
// SEARCH HOOKS
// ============================================================================

export function useSearch(params: SearchParams | null) {
  return useSWR(
    params?.query ? ['search', params] : null,
    () => searchService.search(params!),
    { revalidateOnFocus: false }
  );
}

// ============================================================================
// USER HOOKS
// ============================================================================

export function useUserProfile(username: string | undefined) {
  return useSWR(
    username ? ['user', username] : null,
    () => userService.getProfile(username!),
    { revalidateOnFocus: false }
  );
}
