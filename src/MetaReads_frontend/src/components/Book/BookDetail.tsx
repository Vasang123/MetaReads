import { AiFillClockCircle } from "react-icons/ai";
import { BsBookFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import { BookModel, CommentModel } from "../Props/model";
import GradientButton from "../Form/Button/GradientButton";
import TopGradientButton from "../Form/Button/TopGradientButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCheckUserAuthorization } from "../Hook/Data/User/useCheckUserAuthorization";
import { useCookie } from "../Hook/Cookie/useCookie";
import { useUser } from "../../lib/user_provider";
import LibraryList from "../Library/LibraryList";
import RemoveBook from "../Library/RemoveBook";
import SubscriptionWarningModal from "../Modal/Warning/SubscriptionWarningModal";
import { Title } from "../Utility/TitleUtility";
import ShimmerButton from "../Form/Button/ShimmerButton";
import CardComment from "../ui/card-comment";
import { useCreateBook } from "../Hook/Data/Book/useCreateBook";
import { useCreateComment } from "../Hook/Data/Comment/useSubmitComment";
import { ToastSuccess } from "../Form/Notifications/SuccessNotification";
import { ToastError } from "../Form/Notifications/ErrorNotification";
import { toast } from "react-toastify";
import { MetaReads_backend } from "../../../../declarations/MetaReads_backend";
import { ToastLoading } from "../Form/Notifications/LoadingNotification";
import { Principal } from "@dfinity/principal";
import { Read } from "../Props/readProps";
interface BookDetailProps {
  book: BookModel;
  libraryId?: string;
  fetchData?: () => {};
}

export default function BookDetail({
  book,
  libraryId,
  fetchData,
}: BookDetailProps) {
  const location = useLocation();
  const [dominantColor, setDominantColor] = useState<string>("rgba(0,0,0,0.5)");
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [readData, setReadData] = useState<Read | undefined>();
  const { getCookie } = useCookie();
  const { user } = useUser();
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const { isLoggedIn } = useCheckUserAuthorization({
    user,
    getCookie,
    detailBook: book,
  });

  const [allComment, setAllComment] = useState<CommentModel[]>();

  const getReadData = async () => {
    if (user) {
      setLoading(true);
      try {
        const readData: any = await MetaReads_backend.get_read_by_user(
          book.id,
          user?.id,
        );
        setReadData(readData.Ok);
        console.log(readData);
      } catch (error: any) {
        ToastError(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(user);
    getReadData();
  }, [user]);

  const [refresh, setRefresh] = useState<boolean>();

  useEffect(() => {
    const getCommentResponse = async () => {
      if (book) {
        const commentsResponse: any =
          await MetaReads_backend.get_comment_by_book(book.id);
        console.log("testing", commentsResponse);

        setAllComment(commentsResponse);
      }
    };

    getCommentResponse();
  }, [refresh]);

  const { createComment, error } = useCreateComment();
  const loadingToastId = useRef<string | null>(null);
  const handleSubmitComment = async (e: any) => {
    e.preventDefault();
    if (text === "" && !text) {
      ToastError("Comment cannot be empty!");
      return;
    }
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await createComment(text, user!.id, book.id);
      if (success) {
        ToastSuccess("Book Created Successfully");
        // fetchData();
      } else {
        ToastError(error);
      }
      setRefresh((refresh) => !refresh);
      setText("");
    } finally {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };

  useEffect(() => {
    setShowDescription(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = book.cover_image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        const red = imageData[0];
        const green = imageData[1];
        const blue = imageData[2];
        const dominantColor = `rgba(${red}, ${green}, ${blue}, 0.8)`;
        setDominantColor(dominantColor);
      }
    };
  }, [book.cover_image]);

  return (
    <div className="relative max-h-[100vh] overflow-y-scroll text-white">
      <div className="relative h-[500px]">
        {location.pathname === "/library" && fetchData && libraryId && (
          <div className="absolute left-4 top-4 z-10">
            <RemoveBook
              bookId={book.id.toString()}
              fetchData={fetchData}
              libraryId={libraryId}
            />
          </div>
        )}
        <div
          className="relative flex h-[500px] items-end justify-start"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%), url(${book.cover_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5) 50%, ${dominantColor} 100%)`,
            }}
          ></div>

          <div className="relative ml-10 flex w-full max-w-5xl items-end justify-start px-4 pb-4">
            <img src={book.cover_image} alt="" className="z-10 h-[300px]" />

            <div className="z-10 ml-6 flex flex-col gap-2">
              <div className="flex gap-3">
                <h2 className="text-4xl font-bold">{book.title}</h2>{" "}
                {isLoggedIn == true && (
                  <>
                    {location.pathname === "/library" ? (
                      <LibraryList
                        bookId={book.id.toString()}
                        text="Add to another Library"
                      />
                    ) : (
                      <LibraryList
                        bookId={book.id.toString()}
                        text="Add to Library"
                      />
                    )}
                  </>
                )}
              </div>
              <div className="font-normal">
                <p className="mt-2 text-lg">Author: {book.author.name}</p>
                <p className="text-lg">Genre: {book.genre.name}</p>
                <p className="text-lg">Pages: {Number(book.page_count)}</p>
                <p className="text-lg">Views: {Number(book.views)}</p>
                <p className="flex items-center gap-2 text-lg">
                  {isLoggedIn == true && (
                    <>
                      Your Total Reading Time:
                      {loading ? (
                        " Calculating..."
                      ) : (
                        <>
                          {" "}
                          {Math.floor(
                            Number(readData?.total_read_duration) / (60 * 60),
                          )}{" "}
                          hours{" "}
                          {Math.floor(
                            (Number(readData?.total_read_duration) / 60) % 60,
                          )}{" "}
                          minutes{" "}
                          {Math.floor(
                            Number(readData?.total_read_duration) % 60,
                          )}{" "}
                          seconds
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
              <div className="flex gap-6">
                <Link to={`/read/${book.id}`}>
                  <GradientButton
                    text={
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <BsBookFill />{" "}
                        </div>
                        Read
                      </div>
                    }
                    onClick={() => {}}
                  />
                </Link>

                <TopGradientButton
                  text={"More Information"}
                  onClick={() => setShowDescription(!showDescription)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed right-0 top-0 h-[500px] w-[400px] transform bg-slate-600 p-6 text-white transition-transform duration-500 ease-in-out ${showDescription ? "translate-x-0" : "translate-x-full"}`}
        >
          <h3 className="mb-4 text-2xl font-bold underline">Description</h3>
          <p>{book.description}</p>
        </div>
      </div>
      <div className="m-10">
        <div className="w-full border-b-2 border-[#EFAF21] pb-3 text-2xl font-bold">
          {(allComment && allComment?.length) || 0} Review(s)
        </div>
        <div className="w-full">
          {!isLoggedIn ? (
            <div className="flex w-full justify-center py-4">
              <ShimmerButton
                text={"Login"}
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>
          ) : (
            <>
              <div className="my-6 flex w-full py-2">
                <div className="">
                  <div className="mr-[16px] h-[40px] w-[40px] rounded-full bg-white"></div>
                </div>
                <div className="flex-1">
                  <form action="" onSubmit={handleSubmitComment}>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-full flex-1 border-b border-gray-500 bg-transparent py-2 outline-none"
                      placeholder="Leave your reviews"
                      onChange={(e: any) => {
                        setText(e.target.value);
                      }}
                      value={text}
                    />
                  </form>
                </div>
              </div>
            </>
          )}
          <div className="mb-4">
            {allComment &&
              allComment.map((comment: CommentModel) => (
                <CardComment
                  id={comment.id}
                  user={comment.user}
                  text={comment.text}
                  created_at={comment.created_at}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
