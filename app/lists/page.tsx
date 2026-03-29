"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, List, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/context/auth-context";
import { useUserData } from "@/lib/context/user-data-context";

export default function ListsPage() {
  const { user } = useAuth();
  const { getPublicLists, getUserLists, createList } = useUserData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [newListPublic, setNewListPublic] = useState(true);

  const publicLists = getPublicLists();
  const userLists = getUserLists();

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    
    createList(newListName.trim(), newListDescription.trim(), newListPublic);
    setNewListName("");
    setNewListDescription("");
    setNewListPublic(true);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lists</h1>
          <p className="text-muted-foreground">
            Create and discover curated collections of movies, TV shows, and books
          </p>
        </div>

        {user && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new list</DialogTitle>
                <DialogDescription>
                  Create a collection of your favorite content to share with others.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">List Name</Label>
                  <Input
                    id="name"
                    placeholder="My Favorite Sci-Fi"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A collection of mind-bending science fiction..."
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public">Public List</Label>
                    <p className="text-sm text-muted-foreground">
                      Anyone can view this list
                    </p>
                  </div>
                  <Switch
                    id="public"
                    checked={newListPublic}
                    onCheckedChange={setNewListPublic}
                  />
                </div>
                <Button
                  onClick={handleCreateList}
                  disabled={!newListName.trim()}
                  className="w-full"
                >
                  Create List
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* User's Lists */}
      {user && userLists.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Lists</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userLists.map((list) => (
              <Link
                key={list.id}
                href={`/lists/${list.id}`}
                className="rounded-lg border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{list.name}</h3>
                  {list.isPublic ? (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {list.description || "No description"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <List className="h-4 w-4" />
                  <span>{list.items.length} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Public Lists */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {user ? "Public Lists" : "Featured Lists"}
        </h2>
        {publicLists.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicLists.map((list) => (
              <Link
                key={list.id}
                href={`/lists/${list.id}`}
                className="rounded-lg border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-foreground mb-1">{list.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  by @{list.username}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {list.description || "No description"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <List className="h-4 w-4" />
                  <span>{list.items.length} items</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No public lists yet. Be the first to create one!</p>
          </div>
        )}
      </div>

      {/* Sign up prompt */}
      {!user && (
        <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Create your own lists
          </h3>
          <p className="text-muted-foreground mb-4">
            Sign up to create and share your favorite content collections.
          </p>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
