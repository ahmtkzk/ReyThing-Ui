"use client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { PageLoader } from "@/components/ui/page-loader";

// Lazy load all views for better performance
const HomePage = lazy(() => import("@/views/home"));
const MoviesPage = lazy(() => import("@/views/movies"));
const MovieDetailPage = lazy(() => import("@/views/movie-detail"));
const TVShowsPage = lazy(() => import("@/views/tv-shows"));
const TVShowDetailPage = lazy(() => import("@/views/tv-show-detail"));
const BooksPage = lazy(() => import("@/views/books"));
const BookDetailPage = lazy(() => import("@/views/book-detail"));
const ListsPage = lazy(() => import("@/views/lists"));
const ListDetailPage = lazy(() => import("@/views/list-detail"));
const SearchPage = lazy(() => import("@/views/search"));
const LoginPage = lazy(() => import("@/views/login"));
const SignupPage = lazy(() => import("@/views/signup"));
const ProfilePage = lazy(() => import("@/views/profile"));
const NotFoundPage = lazy(() => import("@/views/not-found"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "movies",
        element: (
          <Suspense fallback={<PageLoader />}>
            <MoviesPage />
          </Suspense>
        ),
      },
      {
        path: "movies/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <MovieDetailPage />
          </Suspense>
        ),
      },
      {
        path: "tv-shows",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TVShowsPage />
          </Suspense>
        ),
      },
      {
        path: "tv-shows/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TVShowDetailPage />
          </Suspense>
        ),
      },
      {
        path: "books",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BooksPage />
          </Suspense>
        ),
      },
      {
        path: "books/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookDetailPage />
          </Suspense>
        ),
      },
      {
        path: "lists",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ListsPage />
          </Suspense>
        ),
      },
      {
        path: "lists/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ListDetailPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "profile/:username",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
