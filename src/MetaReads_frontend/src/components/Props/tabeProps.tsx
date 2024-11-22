import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "./model";

export interface BaseTableColumnProps {
  id: Principal;
  name: string;
  option: string;
}

export interface BaseTableColumnBooksProps {
  id: Principal;
  title: string;
  book_url: string;
  plan: string;
  cover_image: string;
  page_count: number;
  option: string;
}
