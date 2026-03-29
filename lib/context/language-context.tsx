"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "reything_language";

// Turkish translations
const tr: Record<string, string> = {
  // Navigation
  "nav.movies": "Filmler",
  "nav.tvShows": "Diziler",
  "nav.books": "Kitaplar",
  "nav.lists": "Listeler",
  "nav.search": "Ara",
  "nav.signIn": "Giris Yap",
  "nav.signUp": "Kayit Ol",
  "nav.profile": "Profil",
  "nav.myLists": "Listelerim",
  "nav.logOut": "Cikis Yap",
  "nav.theme": "Tema",
  "nav.light": "Acik",
  "nav.dark": "Koyu",
  "nav.searchPlaceholder": "Ara...",
  "nav.searchPlaceholderLong": "Film, dizi, kitap ara...",

  // Home Page
  "home.trendingNow": "Simdi Trend",
  "home.featured": "One Cikan",
  "home.viewDetails": "Detaylar",
  "home.newMovies": "Yeni Filmler",
  "home.newTVShows": "Yeni Diziler",
  "home.newBooks": "Yeni Kitaplar",
  "home.viewAll": "Tumunu Gor",

  // Content Types
  "content.movie": "Film",
  "content.tv": "Dizi",
  "content.book": "Kitap",

  // Movies Page
  "movies.title": "Filmler",
  "movies.browseDescription": "Koleksiyonumuzdaki {count} filmi kesfedin",
  "movies.searchPlaceholder": "Film, yonetmen, oyuncu ara...",
  "movies.filters": "Filtreler",
  "movies.genre": "Tur",
  "movies.allGenres": "Tum Turler",
  "movies.sort": "Sirala",
  "movies.sortPopular": "En Populer",
  "movies.sortRating": "En Yuksek Puan",
  "movies.sortNewest": "En Yeni",
  "movies.sortAZ": "A-Z",
  "movies.clear": "Temizle",
  "movies.clearFilters": "Filtreleri Temizle",
  "movies.showing": "{count} film gosteriliyor",
  "movies.showingSingular": "1 film gosteriliyor",
  "movies.noResults": "Film bulunamadi",

  // TV Shows Page
  "tvShows.title": "Diziler",
  "tvShows.browseDescription": "Koleksiyonumuzdaki {count} diziyi kesfedin",
  "tvShows.searchPlaceholder": "Dizi, yapimci, oyuncu ara...",
  "tvShows.status": "Durum",
  "tvShows.all": "Tumu",
  "tvShows.ongoing": "Devam Ediyor",
  "tvShows.ended": "Bitmis",
  "tvShows.showing": "{count} dizi gosteriliyor",
  "tvShows.showingSingular": "1 dizi gosteriliyor",
  "tvShows.noResults": "Dizi bulunamadi",

  // Books Page
  "books.title": "Kitaplar",
  "books.browseDescription": "Koleksiyonumuzdaki {count} kitabi kesfedin",
  "books.searchPlaceholder": "Kitap, yazar ara...",
  "books.showing": "{count} kitap gosteriliyor",
  "books.showingSingular": "1 kitap gosteriliyor",
  "books.noResults": "Kitap bulunamadi",

  // Lists Page
  "lists.title": "Listeler",
  "lists.description": "Film, dizi ve kitap koleksiyonlari olusturun ve kesfedin",
  "lists.createList": "Liste Olustur",
  "lists.createNewList": "Yeni liste olustur",
  "lists.createDescription": "Favorilerinizden bir koleksiyon olusturun ve baskalariyla paylasin.",
  "lists.listName": "Liste Adi",
  "lists.listNamePlaceholder": "Favori Bilim Kurgu",
  "lists.description": "Aciklama",
  "lists.descriptionPlaceholder": "Zihin buken bilim kurgu koleksiyonu...",
  "lists.publicList": "Herkese Acik",
  "lists.publicDescription": "Herkes bu listeyi gorebilir",
  "lists.yourLists": "Listeleriniz",
  "lists.publicLists": "Herkese Acik Listeler",
  "lists.featuredLists": "One Cikan Listeler",
  "lists.noDescription": "Aciklama yok",
  "lists.items": "{count} oge",
  "lists.noPublicLists": "Henuz herkese acik liste yok. Ilk siz olusturun!",
  "lists.createYourOwn": "Kendi listelerinizi olusturun",
  "lists.signUpToCreate": "Favori icerik koleksiyonlarinizi olusturmak ve paylasmak icin kayit olun.",

  // Search Page
  "search.title": "Ara",
  "search.searchPlaceholder": "Film, dizi, kitap ara...",
  "search.resultsFor": '"{query}" icin {count} sonuc bulundu',
  "search.resultFor": '"{query}" icin 1 sonuc bulundu',
  "search.all": "Tumu",
  "search.noResults": "Sonuc bulunamadi. Farkli bir arama terimi deneyin.",
  "search.searchFor": "Film, dizi veya kitap arayin",
  "search.trySearching": "Baslik, yonetmen, oyuncu veya yazar aramayi deneyin",

  // Login Page
  "login.welcomeBack": "Tekrar Hos Geldiniz",
  "login.signInToContinue": "Devam etmek icin hesabiniza giris yapin",
  "login.demoCredentials": "Demo giris bilgileri:",
  "login.email": "E-posta",
  "login.emailPlaceholder": "ornek@email.com",
  "login.password": "Sifre",
  "login.passwordPlaceholder": "Sifrenizi girin",
  "login.signIn": "Giris Yap",
  "login.signingIn": "Giris yapiliyor...",
  "login.noAccount": "Hesabiniz yok mu?",
  "login.invalidCredentials": "Gecersiz e-posta veya sifre",

  // Signup Page
  "signup.createAccount": "Hesap Olustur",
  "signup.joinUs": "ReyThing'e katilarak favori iceriklerinizi puanlayin ve inceleyin",
  "signup.username": "Kullanici Adi",
  "signup.usernamePlaceholder": "filmci123",
  "signup.usernameHint": "Sadece harf, rakam ve alt cizgi",
  "signup.displayName": "Gorunen Ad",
  "signup.displayNamePlaceholder": "Film Tutkunu",
  "signup.displayNameHint": "Istege bagli - varsayilan kullanici adiniz olacak",
  "signup.createPassword": "Sifre olusturun",
  "signup.confirmPassword": "Sifreyi Onayla",
  "signup.confirmPasswordPlaceholder": "Sifrenizi tekrar girin",
  "signup.passwordHint": "En az 6 karakter",
  "signup.creating": "Hesap olusturuluyor...",
  "signup.create": "Hesap Olustur",
  "signup.haveAccount": "Zaten hesabiniz var mi?",
  "signup.passwordMismatch": "Sifreler eslesmedi",
  "signup.passwordTooShort": "Sifre en az 6 karakter olmali",
  "signup.usernameTooShort": "Kullanici adi en az 3 karakter olmali",
  "signup.usernameInvalid": "Kullanici adi sadece harf, rakam ve alt cizgi icerebilir",
  "signup.alreadyExists": "E-posta veya kullanici adi zaten mevcut",

  // Footer
  "footer.browse": "Gozat",
  "footer.community": "Topluluk",
  "footer.publicLists": "Herkese Acik Listeler",
  "footer.connect": "Baglan",
  "footer.rights": "Tum haklari saklidir.",
  "footer.description": "Favori film, dizi ve kitaplarinizi kesfedin, puanlayin ve takip edin. Listeler olusturun ve tavsiyelerinizi paylasin.",

  // Common
  "common.loading": "Yukleniyor...",
  "common.error": "Bir hata olustu",
  "common.by": "tarafindan",
  "common.min": "dk",
  "common.seasons": "sezon",
  "common.episodes": "bolum",
  "common.pages": "sayfa",

  // Profile
  "profile.joined": "Katilim",
  "profile.ratings": "Puanlar",
  "profile.reviews": "Incelemeler",
  "profile.lists": "Listeler",
  "profile.editProfile": "Profili Duzenle",

  // Details
  "details.cast": "Oyuncular",
  "details.director": "Yonetmen",
  "details.creator": "Yapimci",
  "details.author": "Yazar",
  "details.runtime": "Sure",
  "details.releaseYear": "Yayinlanma Yili",
  "details.genres": "Turler",
  "details.synopsis": "Ozet",
  "details.yourRating": "Puaniniz",
  "details.rateThis": "Bunu puanla",
  "details.comments": "Yorumlar",
  "details.addComment": "Yorum ekle",
  "details.noComments": "Henuz yorum yok. Ilk yorumu siz yapin!",
  "details.addToList": "Listeye Ekle",
  "details.removeFromList": "Listeden Cikar",
  "details.signInToRate": "Puanlamak icin giris yapin",
  "details.signInToComment": "Yorum yapmak icin giris yapin",
};

// English translations
const en: Record<string, string> = {
  // Navigation
  "nav.movies": "Movies",
  "nav.tvShows": "TV Shows",
  "nav.books": "Books",
  "nav.lists": "Lists",
  "nav.search": "Search",
  "nav.signIn": "Sign in",
  "nav.signUp": "Sign up",
  "nav.profile": "Profile",
  "nav.myLists": "My Lists",
  "nav.logOut": "Log out",
  "nav.theme": "Theme",
  "nav.light": "Light",
  "nav.dark": "Dark",
  "nav.searchPlaceholder": "Search...",
  "nav.searchPlaceholderLong": "Search movies, shows, books...",

  // Home Page
  "home.trendingNow": "Trending Now",
  "home.featured": "Featured",
  "home.viewDetails": "View Details",
  "home.newMovies": "New Movies",
  "home.newTVShows": "New TV Shows",
  "home.newBooks": "New Books",
  "home.viewAll": "View All",

  // Content Types
  "content.movie": "Movie",
  "content.tv": "TV Show",
  "content.book": "Book",

  // Movies Page
  "movies.title": "Movies",
  "movies.browseDescription": "Browse and discover {count} movies in our collection",
  "movies.searchPlaceholder": "Search movies, directors, actors...",
  "movies.filters": "Filters",
  "movies.genre": "Genre",
  "movies.allGenres": "All Genres",
  "movies.sort": "Sort",
  "movies.sortPopular": "Most Popular",
  "movies.sortRating": "Highest Rated",
  "movies.sortNewest": "Newest",
  "movies.sortAZ": "A-Z",
  "movies.clear": "Clear",
  "movies.clearFilters": "Clear Filters",
  "movies.showing": "Showing {count} movies",
  "movies.showingSingular": "Showing 1 movie",
  "movies.noResults": "No movies found",

  // TV Shows Page
  "tvShows.title": "TV Shows",
  "tvShows.browseDescription": "Browse and discover {count} TV shows in our collection",
  "tvShows.searchPlaceholder": "Search shows, creators, actors...",
  "tvShows.status": "Status",
  "tvShows.all": "All",
  "tvShows.ongoing": "Ongoing",
  "tvShows.ended": "Ended",
  "tvShows.showing": "Showing {count} shows",
  "tvShows.showingSingular": "Showing 1 show",
  "tvShows.noResults": "No TV shows found",

  // Books Page
  "books.title": "Books",
  "books.browseDescription": "Browse and discover {count} books in our collection",
  "books.searchPlaceholder": "Search books, authors...",
  "books.showing": "Showing {count} books",
  "books.showingSingular": "Showing 1 book",
  "books.noResults": "No books found",

  // Lists Page
  "lists.title": "Lists",
  "lists.description": "Create and discover curated collections of movies, TV shows, and books",
  "lists.createList": "Create List",
  "lists.createNewList": "Create a new list",
  "lists.createDescription": "Create a collection of your favorite content to share with others.",
  "lists.listName": "List Name",
  "lists.listNamePlaceholder": "My Favorite Sci-Fi",
  "lists.listDescription": "Description",
  "lists.descriptionPlaceholder": "A collection of mind-bending science fiction...",
  "lists.publicList": "Public List",
  "lists.publicDescription": "Anyone can view this list",
  "lists.yourLists": "Your Lists",
  "lists.publicLists": "Public Lists",
  "lists.featuredLists": "Featured Lists",
  "lists.noDescription": "No description",
  "lists.items": "{count} items",
  "lists.noPublicLists": "No public lists yet. Be the first to create one!",
  "lists.createYourOwn": "Create your own lists",
  "lists.signUpToCreate": "Sign up to create and share your favorite content collections.",

  // Search Page
  "search.title": "Search",
  "search.searchPlaceholder": "Search movies, TV shows, books...",
  "search.resultsFor": 'Found {count} results for "{query}"',
  "search.resultFor": 'Found 1 result for "{query}"',
  "search.all": "All",
  "search.noResults": "No results found. Try a different search term.",
  "search.searchFor": "Search for movies, TV shows, or books",
  "search.trySearching": "Try searching for titles, directors, actors, or authors",

  // Login Page
  "login.welcomeBack": "Welcome back",
  "login.signInToContinue": "Sign in to your account to continue",
  "login.demoCredentials": "Demo credentials:",
  "login.email": "Email",
  "login.emailPlaceholder": "you@example.com",
  "login.password": "Password",
  "login.passwordPlaceholder": "Enter your password",
  "login.signIn": "Sign in",
  "login.signingIn": "Signing in...",
  "login.noAccount": "Don't have an account?",
  "login.invalidCredentials": "Invalid email or password",

  // Signup Page
  "signup.createAccount": "Create an account",
  "signup.joinUs": "Join ReyThing to rate and review your favorite content",
  "signup.username": "Username",
  "signup.usernamePlaceholder": "moviefan123",
  "signup.usernameHint": "Letters, numbers, and underscores only",
  "signup.displayName": "Display Name",
  "signup.displayNamePlaceholder": "Movie Fan",
  "signup.displayNameHint": "Optional - defaults to your username",
  "signup.createPassword": "Create a password",
  "signup.confirmPassword": "Confirm Password",
  "signup.confirmPasswordPlaceholder": "Confirm your password",
  "signup.passwordHint": "At least 6 characters",
  "signup.creating": "Creating account...",
  "signup.create": "Create account",
  "signup.haveAccount": "Already have an account?",
  "signup.passwordMismatch": "Passwords do not match",
  "signup.passwordTooShort": "Password must be at least 6 characters",
  "signup.usernameTooShort": "Username must be at least 3 characters",
  "signup.usernameInvalid": "Username can only contain letters, numbers, and underscores",
  "signup.alreadyExists": "Email or username already exists",

  // Footer
  "footer.browse": "Browse",
  "footer.community": "Community",
  "footer.publicLists": "Public Lists",
  "footer.connect": "Connect",
  "footer.rights": "All rights reserved.",
  "footer.description": "Discover, rate, and track your favorite movies, TV shows, and books. Create lists and share your recommendations.",

  // Common
  "common.loading": "Loading...",
  "common.error": "An error occurred",
  "common.by": "by",
  "common.min": "min",
  "common.seasons": "seasons",
  "common.episodes": "episodes",
  "common.pages": "pages",

  // Profile
  "profile.joined": "Joined",
  "profile.ratings": "Ratings",
  "profile.reviews": "Reviews",
  "profile.lists": "Lists",
  "profile.editProfile": "Edit Profile",

  // Details
  "details.cast": "Cast",
  "details.director": "Director",
  "details.creator": "Creator",
  "details.author": "Author",
  "details.runtime": "Runtime",
  "details.releaseYear": "Release Year",
  "details.genres": "Genres",
  "details.synopsis": "Synopsis",
  "details.yourRating": "Your Rating",
  "details.rateThis": "Rate this",
  "details.comments": "Comments",
  "details.addComment": "Add a comment",
  "details.noComments": "No comments yet. Be the first to comment!",
  "details.addToList": "Add to List",
  "details.removeFromList": "Remove from List",
  "details.signInToRate": "Sign in to rate",
  "details.signInToComment": "Sign in to comment",
};

const translations: Record<Language, Record<string, string>> = { tr, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language;
    if (stored && (stored === "tr" || stored === "en")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
