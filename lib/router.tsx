"use client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { PageLoader } from "@/components/ui/page-loader";

// Lazy load all pages for better performance
const HomePage = lazy(() => import("@/pages/home"));
const MoviesPage = lazy(() => import("@/pages/movies"));
const MovieDetailPage = lazy(() => import("@/pages/movie-detail"));
const TVShowsPage = lazy(() => import("@/pages/tv-shows"));
const TVShowDetailPage = lazy(() => import("@/pages/tv-show-detail"));
const BooksPage = lazy(() => import("@/pages/books"));
const BookDetailPage = lazy(() => import("@/pages/book-detail"));
const ListsPage = lazy(() => import("@/pages/lists"));
const ListDetailPage = lazy(() => import("@/pages/list-detail"));
const SearchPage = lazy(() => import("@/pages/search"));
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

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
