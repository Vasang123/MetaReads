import { useEffect, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import InputField, { InputBookField } from "../Input/TextField/InputField";
import { Title } from "../../Utility/TitleUtility";
import { ToastError } from "../Notifications/ErrorNotification";
import SecondaryButton from "../Button/SecondaryButton";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../Props/model";
import { Box, TextField, MenuItem } from "@mui/material"; // Import MenuItem from Material-UI
import useAuthors from "../../Hook/Data/Author/useAuthors";
import useGenres from "../../Hook/Data/Genre/useGenres";
import SelectGenreBookField from "../Input/TextField/SelectGenreBookField";
import SelectAuthorBookField from "../Input/TextField/SelectAuthorBookField";
import FileInput from "../Input/FileUpload/FileInput";
import ImageInput from "../Input/FileUpload/ImageInput";
import useFirebaseStorage from "../../Hook/Firebase/useFirebaseStorage";
import { useBook } from "../../Hook/Data/Book/useBooks";

interface ModalFormProps {
  handleClose: () => void;
  onSubmit: (
    title: string,
    author: Principal,
    book_url: File | null,
    plan: string,
    genre: Principal,
    description: string,
    coverImage: File | null,
    page_count: number,
  ) => void;
  selectedItem?: any;
  buttonContent: string;
}

export default function BookForm({
  handleClose,
  onSubmit,
  selectedItem,
  buttonContent,
}: ModalFormProps) {
  const [book] = selectedItem ? useBook(selectedItem.id.toString()) : [null];
  const [data, setData] = useState<{
    title: string;
    author: any;
    book_url: File | null;
    plan: string;
    genre: any;
    description: string;
    coverImage: File | null;
    page_count: number;
  }>({
    title: "",
    author: Principal.fromText("aaaaa-aa"),
    book_url: null,
    plan: "",
    genre: Principal.fromText("aaaaa-aa"),
    description: "",
    coverImage: null,
    page_count: 0,
  });
  useEffect(() => {
    if (book) {
      setData({
        title: book.title || "",
        author: Principal.fromText(book.author.id.toString() || "aaaaa-aa"),
        book_url: null,
        plan: book.plan || "",
        genre: Principal.fromText(book.genre.id.toString() || "aaaaa-aa"),
        description: book.description || "",
        coverImage: null,
        page_count: Number(book.page_count),
      });
      fetchFileFromUrl(book.book_url, "book");
      fetchFileFromUrl(book.cover_image, "image");
    }
  }, [book]);

  const fetchFileFromUrl = async (url: string, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      if (type === "book") {
        const bookName = book?.title ? `${book.title}.pdf` : "book.pdf";
        const file = new File([blob], bookName, { type: blob.type });
        setData((prevData) => ({ ...prevData, book_url: file }));
      } else if (type === "image") {
        const bookName = book?.title ? `${book.title}.png` : "book.png";
        const file = new File([blob], bookName, { type: blob.type });
        setData((prevData) => ({ ...prevData, coverImage: file }));
      }
    } catch (error) {
      console.error("Error fetching the book file:", error);
    }
  };

  const handleChange = async (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: any) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
    console.log(data);
  };

  const [rows, fetchData] = useGenres();
  useEffect(() => {
    // Log fetched data or handle empty case
    if (rows && rows.length > 0) {
      console.log("Fetched rows:", rows);
    } else {
      console.log("No data available or rows are empty");
    }
  }, [rows]);

  const handleSubmit = async () => {
    if (!data.title || data.title.trim() === "") {
      ToastError("Title can't be empty");
    } else if (!data.author) {
      ToastError("Author can't be empty");
    } else if (!data.book_url) {
      ToastError("Book url can't be empty");
    } else if (!data.plan || data.plan.trim() === "") {
      ToastError("Plan can't be empty");
    } else if (!data.genre) {
      ToastError("Genre can't be empty");
    } else if (!data.description || data.description.trim() === "") {
      ToastError("Description can't be empty");
    } else if (!data.coverImage) {
      ToastError("Cover Image can't be empty");
    } else if (!data.page_count) {
      ToastError("Pages Count can't be empty");
    } else {
      console.log(data);
      onSubmit(
        data.title,
        Principal.fromText(data.author.toString()),
        data.book_url, // book url
        data.plan,
        Principal.fromText(data.genre.toString()),
        data.description,
        data.coverImage, // cover url
        data.page_count,
      );
    }
  };

  return (
    <>
      <Title text={"Book Form"} />
      <div className="my-4">
        <InputBookField
          label={"Book Title"}
          value={data.title}
          name="title"
          onChange={handleChange}
        />
      </div>

      <div className="my-4">
        {/* <InputBookField
          label={"Book Url"}
          value={data.book_url}
          name="book_url"
          onChange={handleChange}
        /> */}
        <FileInput
          name="book_url"
          onChange={handleFileChange}
          initialFile={data.book_url}
        />
      </div>

      <div className="my-4">
        <InputBookField
          label={"Plan"}
          value={data.plan}
          name="plan"
          onChange={handleChange}
        />
        <div className="my-4">
          {/* <InputBookField
            label={"Cover Image"}
            value={data.coverImage}
            name="coverImage"
            onChange={handleChange}
          /> */}
          <ImageInput
            name="coverImage"
            onChange={handleFileChange}
            initialFile={data.coverImage}
          />
        </div>
        <div className="my-4">
          <InputBookField
            label={"Pages Count"}
            value={data.page_count}
            name="page_count"
            onChange={handleChange}
            type="number"
          />
        </div>
        <SelectGenreBookField onChange={handleChange} genre={data.genre} />
        <SelectAuthorBookField onChange={handleChange} author={data.author} />
        <div className="my-4">
          <InputBookField
            label={"Description"}
            value={data.description}
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-3">
        <SecondaryButton text={"Cancel"} onClick={handleClose} />
        <PrimaryButton text={buttonContent} onClick={handleSubmit} />
      </div>
    </>
  );
}
