import { TVShow } from "@/lib/types";

export const tvShows: TVShow[] = [
  {
    id: "tv-1",
    title: "Breaking Bad",
    year: 2008,
    endYear: 2013,
    poster: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
    genres: ["Drama", "Crime", "Thriller"],
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
    seasons: 5,
    episodes: 62,
    synopsis: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    averageRating: 4.9,
    totalRatings: 3500,
    status: "Ended"
  },
  {
    id: "tv-2",
    title: "Game of Thrones",
    year: 2011,
    endYear: 2019,
    poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
    genres: ["Drama", "Fantasy", "Adventure"],
    creator: "David Benioff & D.B. Weiss",
    cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage", "Lena Headey"],
    seasons: 8,
    episodes: 73,
    synopsis: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    averageRating: 4.5,
    totalRatings: 3200,
    status: "Ended"
  },
  {
    id: "tv-3",
    title: "Stranger Things",
    year: 2016,
    poster: "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    genres: ["Sci-Fi", "Horror", "Drama"],
    creator: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour"],
    seasons: 4,
    episodes: 34,
    synopsis: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    averageRating: 4.6,
    totalRatings: 2800,
    status: "Ongoing"
  },
  {
    id: "tv-4",
    title: "The Wire",
    year: 2002,
    endYear: 2008,
    poster: "https://image.tmdb.org/t/p/w500/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/oggnxJvYEMzIcumzdpPFviUJz5n.jpg",
    genres: ["Drama", "Crime"],
    creator: "David Simon",
    cast: ["Dominic West", "John Doman", "Deirdre Lovejoy", "Wendell Pierce"],
    seasons: 5,
    episodes: 60,
    synopsis: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
    averageRating: 4.8,
    totalRatings: 2100,
    status: "Ended"
  },
  {
    id: "tv-5",
    title: "The Sopranos",
    year: 1999,
    endYear: 2007,
    poster: "https://image.tmdb.org/t/p/w500/rTc7ZXdroqjkKn7t6O79j6K8lhN.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/lNpkvX2s8LGB0mjGODMT4o6Up7j.jpg",
    genres: ["Drama", "Crime"],
    creator: "David Chase",
    cast: ["James Gandolfini", "Lorraine Bracco", "Edie Falco", "Michael Imperioli"],
    seasons: 6,
    episodes: 86,
    synopsis: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling.",
    averageRating: 4.8,
    totalRatings: 2400,
    status: "Ended"
  },
  {
    id: "tv-6",
    title: "Succession",
    year: 2018,
    endYear: 2023,
    poster: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/wKTRHlQg93oAzPMDFzVk4PERF3u.jpg",
    genres: ["Drama"],
    creator: "Jesse Armstrong",
    cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook", "Kieran Culkin"],
    seasons: 4,
    episodes: 39,
    synopsis: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    averageRating: 4.7,
    totalRatings: 1800,
    status: "Ended"
  },
  {
    id: "tv-7",
    title: "The Office",
    year: 2005,
    endYear: 2013,
    poster: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/pJRsJqkPQoSjZLkA8FfFXt2nv4Y.jpg",
    genres: ["Comedy"],
    creator: "Greg Daniels",
    cast: ["Steve Carell", "Rainn Wilson", "John Krasinski", "Jenna Fischer"],
    seasons: 9,
    episodes: 201,
    synopsis: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    averageRating: 4.6,
    totalRatings: 2900,
    status: "Ended"
  },
  {
    id: "tv-8",
    title: "Chernobyl",
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/cz4FXiJNEUxhqjIVGKYTyxnYj2X.jpg",
    genres: ["Drama", "History"],
    creator: "Craig Mazin",
    cast: ["Jared Harris", "Stellan Skarsgård", "Emily Watson", "Paul Ritter"],
    seasons: 1,
    episodes: 5,
    synopsis: "In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
    averageRating: 4.9,
    totalRatings: 1600,
    status: "Ended"
  },
  {
    id: "tv-9",
    title: "The Last of Us",
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    genres: ["Drama", "Action", "Sci-Fi"],
    creator: "Craig Mazin & Neil Druckmann",
    cast: ["Pedro Pascal", "Bella Ramsey", "Anna Torv", "Gabriel Luna"],
    seasons: 2,
    episodes: 16,
    synopsis: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    averageRating: 4.7,
    totalRatings: 1500,
    status: "Ongoing"
  },
  {
    id: "tv-10",
    title: "True Detective",
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/6MBvwmMCMVjLcuYqWMO73nwNFmY.jpg",
    genres: ["Drama", "Crime", "Mystery"],
    creator: "Nic Pizzolatto",
    cast: ["Matthew McConaughey", "Woody Harrelson", "Michelle Monaghan", "Michael Potts"],
    seasons: 4,
    episodes: 30,
    synopsis: "Anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.",
    averageRating: 4.5,
    totalRatings: 1900,
    status: "Ongoing"
  },
  {
    id: "tv-11",
    title: "Better Call Saul",
    year: 2015,
    endYear: 2022,
    poster: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/bvYrSc4JFPMuVF5BzN5XwWAbLgn.jpg",
    genres: ["Drama", "Crime"],
    creator: "Vince Gilligan & Peter Gould",
    cast: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks", "Michael McKean"],
    seasons: 6,
    episodes: 63,
    synopsis: "The trials and tribulations of criminal lawyer Jimmy McGill in the years before his fateful run-in with Walter White and Jesse Pinkman.",
    averageRating: 4.7,
    totalRatings: 2200,
    status: "Ended"
  },
  {
    id: "tv-12",
    title: "The Bear",
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/gN5m3hN4c5MJfU0qWY8Y0D5hLSw.jpg",
    genres: ["Drama", "Comedy"],
    creator: "Christopher Storer",
    cast: ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri", "Lionel Boyce"],
    seasons: 3,
    episodes: 28,
    synopsis: "A young chef from the fine dining world returns to Chicago to run his family's sandwich shop after a tragedy.",
    averageRating: 4.6,
    totalRatings: 1400,
    status: "Ongoing"
  },
  {
    id: "tv-13",
    title: "Dark",
    year: 2017,
    endYear: 2020,
    poster: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg",
    genres: ["Sci-Fi", "Mystery", "Thriller"],
    creator: "Baran bo Odar & Jantje Friese",
    cast: ["Louis Hofmann", "Karoline Eichhorn", "Lisa Vicari", "Maja Schöne"],
    seasons: 3,
    episodes: 26,
    synopsis: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    averageRating: 4.7,
    totalRatings: 1650,
    status: "Ended"
  },
  {
    id: "tv-14",
    title: "Shogun",
    year: 2024,
    poster: "https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/c0oVmgOLTfGF1Ao7GvOiypGkuXb.jpg",
    genres: ["Drama", "History", "War"],
    creator: "Rachel Kondo & Justin Marks",
    cast: ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai", "Tadanobu Asano"],
    seasons: 1,
    episodes: 10,
    synopsis: "In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies unite against him.",
    averageRating: 4.8,
    totalRatings: 1200,
    status: "Ongoing"
  },
  {
    id: "tv-15",
    title: "Severance",
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/lFf6LLrQjYlgIqIWFZSJvQ0cJpE.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/5BDEXm9YyZdMjUhFPECYDCEL1xY.jpg",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    creator: "Dan Erickson",
    cast: ["Adam Scott", "Zach Cherry", "Britt Lower", "Patricia Arquette"],
    seasons: 2,
    episodes: 19,
    synopsis: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    averageRating: 4.7,
    totalRatings: 1350,
    status: "Ongoing"
  }
];

export function getTVShowById(id: string): TVShow | undefined {
  return tvShows.find(show => show.id === id);
}

export function getTVShowsByGenre(genre: string): TVShow[] {
  return tvShows.filter(show => show.genres.includes(genre));
}

export function searchTVShows(query: string): TVShow[] {
  const lowercaseQuery = query.toLowerCase();
  return tvShows.filter(
    show =>
      show.title.toLowerCase().includes(lowercaseQuery) ||
      show.creator.toLowerCase().includes(lowercaseQuery) ||
      show.cast.some(actor => actor.toLowerCase().includes(lowercaseQuery))
  );
}

export const tvGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Sci-Fi",
  "Thriller",
  "War"
];
