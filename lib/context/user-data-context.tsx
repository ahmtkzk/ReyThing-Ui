"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Rating, Comment, UserList, ContentType, ListItem } from "@/lib/types";
import { useAuth } from "./auth-context";

interface UserDataContextType {
  ratings: Rating[];
  comments: Comment[];
  lists: UserList[];
  addRating: (contentId: string, contentType: ContentType, score: number) => void;
  removeRating: (contentId: string, contentType: ContentType) => void;
  getUserRating: (contentId: string, contentType: ContentType) => number | null;
  addComment: (contentId: string, contentType: ContentType, text: string) => void;
  removeComment: (commentId: string) => void;
  getContentComments: (contentId: string, contentType: ContentType) => Comment[];
  createList: (name: string, description: string, isPublic: boolean) => UserList;
  updateList: (listId: string, updates: Partial<UserList>) => void;
  deleteList: (listId: string) => void;
  addToList: (listId: string, contentId: string, contentType: ContentType, notes?: string) => void;
  removeFromList: (listId: string, contentId: string) => void;
  getUserLists: () => UserList[];
  getPublicLists: () => UserList[];
  getListById: (listId: string) => UserList | undefined;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const RATINGS_KEY = "mediavault_ratings";
const COMMENTS_KEY = "mediavault_comments";
const LISTS_KEY = "mediavault_lists";

// Sample comments for demo
const sampleComments: Comment[] = [
  {
    id: "comment-1",
    userId: "user-1",
    username: "cinephile",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cinephile",
    contentId: "movie-1",
    contentType: "movie",
    text: "One of the best mind-bending films ever made. The way Nolan plays with time and dreams is absolutely brilliant!",
    date: "2024-03-15"
  },
  {
    id: "comment-2",
    userId: "user-2",
    username: "filmfan",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=filmfan",
    contentId: "movie-1",
    contentType: "movie",
    text: "The ending still gives me chills every time I watch it.",
    date: "2024-03-10"
  },
  {
    id: "comment-3",
    userId: "user-3",
    username: "scifigeek",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=scifigeek",
    contentId: "movie-5",
    contentType: "movie",
    text: "Interstellar made me cry. The father-daughter relationship is so beautifully done.",
    date: "2024-02-28"
  },
  {
    id: "comment-4",
    userId: "user-1",
    username: "cinephile",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cinephile",
    contentId: "tv-1",
    contentType: "tv",
    text: "Breaking Bad is the gold standard for television. Walter White's transformation is unparalleled.",
    date: "2024-03-01"
  },
  {
    id: "comment-5",
    userId: "user-4",
    username: "bookworm",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bookworm",
    contentId: "book-6",
    contentType: "book",
    text: "A masterpiece of fantasy literature. Tolkien created an entire world that feels completely real.",
    date: "2024-03-05"
  }
];

// Sample lists
const sampleLists: UserList[] = [
  {
    id: "list-1",
    name: "Mind-Bending Sci-Fi",
    description: "Movies and books that will make you question reality",
    userId: "user-1",
    username: "cinephile",
    items: [
      { contentId: "movie-1", contentType: "movie", addedAt: "2024-03-01" },
      { contentId: "movie-5", contentType: "movie", addedAt: "2024-03-02" },
      { contentId: "movie-6", contentType: "movie", addedAt: "2024-03-03" },
      { contentId: "book-7", contentType: "book", addedAt: "2024-03-04" }
    ],
    isPublic: true,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-04"
  },
  {
    id: "list-2",
    name: "Crime Drama Essentials",
    description: "The best crime dramas across all media",
    userId: "user-2",
    username: "filmfan",
    items: [
      { contentId: "tv-1", contentType: "tv", addedAt: "2024-02-15" },
      { contentId: "tv-5", contentType: "tv", addedAt: "2024-02-16" },
      { contentId: "movie-10", contentType: "movie", addedAt: "2024-02-17" },
      { contentId: "movie-4", contentType: "movie", addedAt: "2024-02-18" }
    ],
    isPublic: true,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-18"
  }
];

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [lists, setLists] = useState<UserList[]>(sampleLists);

  // Load data from localStorage
  useEffect(() => {
    const storedRatings = localStorage.getItem(RATINGS_KEY);
    const storedComments = localStorage.getItem(COMMENTS_KEY);
    const storedLists = localStorage.getItem(LISTS_KEY);

    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
    if (storedComments) {
      const parsed = JSON.parse(storedComments);
      setComments([...sampleComments, ...parsed]);
    }
    if (storedLists) {
      const parsed = JSON.parse(storedLists);
      setLists([...sampleLists, ...parsed]);
    }
  }, []);

  // Save ratings to localStorage
  const saveRatings = useCallback((newRatings: Rating[]) => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(newRatings));
  }, []);

  // Save comments to localStorage (only user-created ones)
  const saveComments = useCallback((allComments: Comment[]) => {
    const userComments = allComments.filter(
      c => !sampleComments.some(sc => sc.id === c.id)
    );
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(userComments));
  }, []);

  // Save lists to localStorage (only user-created ones)
  const saveLists = useCallback((allLists: UserList[]) => {
    const userLists = allLists.filter(
      l => !sampleLists.some(sl => sl.id === l.id)
    );
    localStorage.setItem(LISTS_KEY, JSON.stringify(userLists));
  }, []);

  const addRating = (contentId: string, contentType: ContentType, score: number) => {
    if (!user) return;
    
    const newRating: Rating = {
      id: `rating-${Date.now()}`,
      userId: user.id,
      contentId,
      contentType,
      score,
      date: new Date().toISOString().split("T")[0]
    };
    
    const filtered = ratings.filter(
      r => !(r.contentId === contentId && r.contentType === contentType && r.userId === user.id)
    );
    const updated = [...filtered, newRating];
    setRatings(updated);
    saveRatings(updated);
  };

  const removeRating = (contentId: string, contentType: ContentType) => {
    if (!user) return;
    
    const updated = ratings.filter(
      r => !(r.contentId === contentId && r.contentType === contentType && r.userId === user.id)
    );
    setRatings(updated);
    saveRatings(updated);
  };

  const getUserRating = (contentId: string, contentType: ContentType): number | null => {
    if (!user) return null;
    
    const rating = ratings.find(
      r => r.contentId === contentId && r.contentType === contentType && r.userId === user.id
    );
    return rating?.score ?? null;
  };

  const addComment = (contentId: string, contentType: ContentType, text: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      contentId,
      contentType,
      text,
      date: new Date().toISOString().split("T")[0]
    };
    
    const updated = [...comments, newComment];
    setComments(updated);
    saveComments(updated);
  };

  const removeComment = (commentId: string) => {
    if (!user) return;
    
    const updated = comments.filter(c => c.id !== commentId || c.userId !== user.id);
    setComments(updated);
    saveComments(updated);
  };

  const getContentComments = (contentId: string, contentType: ContentType): Comment[] => {
    return comments
      .filter(c => c.contentId === contentId && c.contentType === contentType)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const createList = (name: string, description: string, isPublic: boolean): UserList => {
    if (!user) throw new Error("Must be logged in to create a list");
    
    const newList: UserList = {
      id: `list-${Date.now()}`,
      name,
      description,
      userId: user.id,
      username: user.username,
      items: [],
      isPublic,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0]
    };
    
    const updated = [...lists, newList];
    setLists(updated);
    saveLists(updated);
    return newList;
  };

  const updateList = (listId: string, updates: Partial<UserList>) => {
    if (!user) return;
    
    const updated = lists.map(list => {
      if (list.id === listId && list.userId === user.id) {
        return { ...list, ...updates, updatedAt: new Date().toISOString().split("T")[0] };
      }
      return list;
    });
    setLists(updated);
    saveLists(updated);
  };

  const deleteList = (listId: string) => {
    if (!user) return;
    
    const updated = lists.filter(l => l.id !== listId || l.userId !== user.id);
    setLists(updated);
    saveLists(updated);
  };

  const addToList = (listId: string, contentId: string, contentType: ContentType, notes?: string) => {
    if (!user) return;
    
    const newItem: ListItem = {
      contentId,
      contentType,
      addedAt: new Date().toISOString().split("T")[0],
      notes
    };
    
    const updated = lists.map(list => {
      if (list.id === listId && list.userId === user.id) {
        // Avoid duplicates
        if (list.items.some(i => i.contentId === contentId && i.contentType === contentType)) {
          return list;
        }
        return {
          ...list,
          items: [...list.items, newItem],
          updatedAt: new Date().toISOString().split("T")[0]
        };
      }
      return list;
    });
    setLists(updated);
    saveLists(updated);
  };

  const removeFromList = (listId: string, contentId: string) => {
    if (!user) return;
    
    const updated = lists.map(list => {
      if (list.id === listId && list.userId === user.id) {
        return {
          ...list,
          items: list.items.filter(i => i.contentId !== contentId),
          updatedAt: new Date().toISOString().split("T")[0]
        };
      }
      return list;
    });
    setLists(updated);
    saveLists(updated);
  };

  const getUserLists = (): UserList[] => {
    if (!user) return [];
    return lists.filter(l => l.userId === user.id);
  };

  const getPublicLists = (): UserList[] => {
    return lists.filter(l => l.isPublic);
  };

  const getListById = (listId: string): UserList | undefined => {
    return lists.find(l => l.id === listId);
  };

  return (
    <UserDataContext.Provider
      value={{
        ratings,
        comments,
        lists,
        addRating,
        removeRating,
        getUserRating,
        addComment,
        removeComment,
        getContentComments,
        createList,
        updateList,
        deleteList,
        addToList,
        removeFromList,
        getUserLists,
        getPublicLists,
        getListById
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
