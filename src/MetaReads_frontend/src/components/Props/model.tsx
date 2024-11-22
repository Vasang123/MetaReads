import { Principal } from "@dfinity/principal";
import { User } from "./userProps";

export enum PlanLevel {
  Free = "Free",
  Standard = "Standard",
  Premium = "Premium",
}
export interface BookModel {
  id: Principal;
  title: string;
  author: AuthorModel;
  plan: string;
  genre: GenreModel;
  description: string;
  cover_image: string;
  views: number;
  page_count: number;
  book_url: string;
}

export interface CommentModel {
  id: Principal;
  text: string;
  user: User;
  created_at: any;
}

export interface BookModelProps {
  id: Principal;
  title: string;
  book_url: string;
  plan: string;
  cover_image: string;
  page_count: number;
  option: string;
}

export interface LibraryModel {
  id: Principal;
  name: string;
  bookList: BookModel[];
}

export interface AuthorModel {
  id: Principal;
  name: string;
}

export interface GenreModel {
  id: Principal;
  name: string;
}

export interface PlanModel {
  id: Principal;
  name: string;
  price_per_year: bigint;
  price_per_month: bigint;
}

export interface BookDataProps {
  data: BookModel;
}
export interface AuthorDataProps {
  data: BookModel;
}
export interface UserDataProps {
  data: User;
}
export const createBookModel = ({
  id,
  title,
  author,
  plan,
  genre,
  description,
  cover_image,
  book_url,
}: BookModel): BookModel => {
  return {
    id,
    title,
    author,
    plan,
    genre,
    description,
    cover_image,
    views: 10000,
    page_count: 12,
    book_url,
  };
};

export interface UserModel {
  id: Principal;
  username: string;
  money: bigint;
  image: string;
  subscription?: [] | [SubscriptionModel] | SubscriptionModel;
}

export interface SubscriptionModel {
  id: Principal;
  plan: PlanModel;
  user_id: Principal;
  subscription_start_date: bigint;
  subscription_end_date: bigint;
}

export interface PlanModel {
  id: Principal;
  name: string;
  price_per_month: bigint;
  price_per_year: bigint;
}

export const dummyBookData: BookModel = {
  id: Principal.fromText("aaaaa-aa"),
  title: "A VERY VERY LONG TITLE",
  author: { id: Principal.fromText("aaaaa-aa"), name: "Vasang" }, // Updated to AuthorModel
  plan: "6.969.69",
  genre: { id: Principal.fromText("aaaaa-aa"), name: "Testing" }, // Updated to GenreModel
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quisquam cupiditate velit officiis molestias hic.",
  cover_image:
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
  views: 10000,
  page_count: 12,
  book_url: "hahiahi",
};

export const dummyBook = createBookModel(dummyBookData);

export const recommendedBooks: BookModel[] = [
  {
    id: Principal.fromText("aaaaa-aa"),
    title: "The Mysterious Adventure gen 0",
    author: { id: Principal.fromText("aaaaa-aa"), name: "John Doe" }, // Updated to AuthorModel
    plan: "free",
    genre: { id: Principal.fromText("aaaaa-aa"), name: "Adventure" }, // Updated to GenreModel
    description:
      "A thrilling adventure through unknown lands, filled with mystery and excitement.",
    cover_image:
      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/11/attachment_122099194-e1606150293120.jpg?auto=format&q=60&fit=max&w=930",
    views: 10000,
    page_count: 12,
    book_url: "hahahihi",
  },
];

export const library1: LibraryModel = {
  id: Principal.fromText("aaaaa-aa"),
  name: "Uncategorized (dummy)",
  bookList: [
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure gen 0",
      author: { id: Principal.fromText("aaaaa-aa"), name: "John Doe" }, // Updated to AuthorModel
      plan: "9.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Adventure" }, // Updated to GenreModel
      description:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      cover_image:
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/11/attachment_122099194-e1606150293120.jpg?auto=format&q=60&fit=max&w=930",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure",
      author: { id: Principal.fromText("aaaaa-aa"), name: "John Doe" }, // Updated to AuthorModel
      plan: "9.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Adventure" }, // Updated to GenreModel
      description:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      cover_image:
        "https://th.bing.com/th/id/OIP.tri5pcbkBl8M-Rv6U3uObAHaL2?rs=1&pid=ImgDetMain",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      cover_image:
        "https://th.bing.com/th/id/OIP.uUra-zVv-Ug0Kbo83QyepAHaL2?pid=ImgDet&w=474&h=758&rs=1",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      cover_image:
        "https://miblart.com/wp-content/uploads/2020/01/Daughter-of-Man-book-cover-scaled-1.jpeg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Mark Turner" }, // Updated to AuthorModel
      plan: "7.49",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Horror" }, // Updated to GenreModel
      description:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      cover_image:
        "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      cover_image:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      cover_image:
        "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      cover_image:
        "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      cover_image:
        "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
  ],
};

export const library2: LibraryModel = {
  id: Principal.fromText("aaaaa-aa"),
  name: "Library 1 (dummy)",
  bookList: [
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      cover_image:
        "https://getcovers.com/wp-content/uploads/2020/12/image3.png",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      cover_image:
        "https://th.bing.com/th/id/OIP.7rF2B7fGNp3xdBg41W8P0gAAAA?pid=ImgDet&w=432&h=691&rs=1",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Mark Turner" }, // Updated to AuthorModel
      plan: "7.49",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Horror" }, // Updated to GenreModel
      description:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      cover_image:
        "https://m.media-amazon.com/images/I/81pyW-09QnL._SL1500_.jpg",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      cover_image:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      page_count: 12,
      book_url: "hahahihi",
    },
  ],
};
