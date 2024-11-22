import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Ensure the styles are imported
import OutlinedButton from "../Form/Button/OutlinedButton";
import { BookModel, BookModelProps } from "../Props/model";
import { FocusCards } from "../ui/focus-cards";
import { useEffect, useState } from "react";
import useStoreBooks from "../Hook/Data/Book/useStoreBooks";
import usePopularBooks from "../Hook/Data/Book/usePopularBooks";
import useLatestBooks from "../Hook/Data/Book/useLatestBooks";
import useRecommendBooks from "../Hook/Data/Book/useRecommendBook";

interface StoreContentProps {
  handleBookSelect: (book: BookModel | null) => void;
}

export default function StoreContent({ handleBookSelect }: StoreContentProps) {
  const [rows, fetchData] = useStoreBooks();
  const [recommend, fetchRecommendData] = useRecommendBooks();
  const [recommendSlice, setRecommendSlice] = useState<BookModel[]>();
  const [popular, fetchPopularData] = usePopularBooks();
  const [latest, fetchLatestData] = useLatestBooks();
  const [recommendedBooks, setRecommendedBooks] = useState<BookModel[]>();
  const [selectBook, setSelectBook] = useState<string>("All Book");

  useEffect(() => {
    const firstFiveRows = recommend.slice(0, 6);
    setRecommendSlice(firstFiveRows);
  }, [recommend]);

  return (
    <>
      <div className="w-full px-16">
        <div className="my-6 w-full overflow-hidden rounded-lg text-white">
          <Swiper
            pagination={true}
            loop={true} // Enable loop
            autoplay={{
              delay: 4000, // 4 seconds delay
              disableOnInteraction: false, // Continue autoplay even after user interaction
            }}
            speed={2000}
            modules={[Pagination, Autoplay]} // Include Autoplay module
            className="w-full"
            slidesPerView={1}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/008/424/173/non_2x/horizontal-banner-with-school-children-and-text-books-boys-and-girls-are-standing-near-books-study-education-back-to-school-poster-for-store-shop-library-school-library-vector.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/013/867/971/non_2x/book-store-cartoon-banner-with-young-woman-face-free-vector.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/002/294/880/non_2x/reading-book-web-banner-design-student-reading-book-on-stack-of-book-to-get-inspiration-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/002/294/867/non_2x/digital-book-web-banner-design-student-reading-online-book-on-tablet-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="my-6 flex w-full flex-col gap-4 px-16 text-white">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Recommended For You</p>
        </div>
        {recommendSlice && <FocusCards books={recommendSlice} />}
      </div>

      <div className="flex w-full flex-col gap-8 px-16">
        <div className="flex gap-6 text-white">
          {/* Test */}
          <OutlinedButton
            text={"All Book"}
            color={"white"}
            outlineColor={selectBook === "All Book" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("All Book")}
          />
          <OutlinedButton
            text={"Popular"}
            color={"white"}
            outlineColor={selectBook === "Popular" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("Popular")}
          />
          <OutlinedButton
            text={"Latest"}
            color={"white"}
            outlineColor={selectBook === "Latest" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("Latest")}
          />
        </div>
        {rows &&
          (selectBook === "All Book" ? (
            <FocusCards books={rows} handleBookSelect={handleBookSelect} />
          ) : selectBook === "Popular" ? (
            <FocusCards books={popular!} handleBookSelect={handleBookSelect} />
          ) : (
            <FocusCards books={latest!} handleBookSelect={handleBookSelect} />
          ))}
      </div>
    </>
  );
}
