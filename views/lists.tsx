"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
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
import { useLanguage } from "@/lib/context/language-context";

export default function ListsPage() {
  const { user } = useAuth();
  const { getPublicLists, getUserLists, createList } = useUserData();
  const { t } = useLanguage();
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
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("lists.title")}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {t("lists.description")}
          </p>
        </div>

        {user && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                {t("lists.createList")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("lists.createNewList")}</DialogTitle>
                <DialogDescription>
                  {t("lists.createDescription")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("lists.listName")}</Label>
                  <Input
                    id="name"
                    placeholder={t("lists.listNamePlaceholder")}
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t("lists.listDescription")}</Label>
                  <Textarea
                    id="description"
                    placeholder={t("lists.descriptionPlaceholder")}
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public">{t("lists.publicList")}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t("lists.publicDescription")}
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
                  {t("lists.createList")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {user && userLists.length > 0 && (
        <div className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">{t("lists.yourLists")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {userLists.map((list) => (
              <Link
                key={list.id}
                to={`/lists/${list.id}`}
                className="rounded-lg border border-border bg-card p-4 md:p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{list.name}</h3>
                  {list.isPublic ? (
                    <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {list.description || t("lists.noDescription")}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <List className="h-4 w-4" />
                  <span>{t("lists.items").replace("{count}", list.items.length.toString())}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
          {user ? t("lists.publicLists") : t("lists.featuredLists")}
        </h2>
        {publicLists.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {publicLists.map((list) => (
              <Link
                key={list.id}
                to={`/lists/${list.id}`}
                className="rounded-lg border border-border bg-card p-4 md:p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{list.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("common.by")} @{list.username}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {list.description || t("lists.noDescription")}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <List className="h-4 w-4" />
                  <span>{t("lists.items").replace("{count}", list.items.length.toString())}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t("lists.noPublicLists")}</p>
          </div>
        )}
      </div>

      {!user && (
        <div className="mt-8 md:mt-12 rounded-lg border border-border bg-muted/30 p-6 md:p-8 text-center">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            {t("lists.createYourOwn")}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            {t("lists.signUpToCreate")}
          </p>
          <Button asChild>
            <Link to="/signup">{t("nav.signUp")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
