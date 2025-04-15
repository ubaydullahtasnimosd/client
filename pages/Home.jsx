import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import heroImg from "../public/Banner.png";
import Time from '../utils/banglaDateFormatter';
import Title from '../utils/pageTitle';
import Logo from '../public/logo.jpg';

// api
const API_URL = "https://server-iota-ebon-83.vercel.app/api/v1/book/";

// API Service
const fetchBooks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// loading spinner
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-4 border-slate-300 dark:border-slate-700 opacity-30" />
      <div className="absolute inset-0 rounded-full border-t-4 border-slate-800 dark:border-slate-200 animate-spin" />
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="text-center py-10 text-red-500">
    ডেটা লোড করতে সমস্যা হয়েছে
  </div>
);

const BookCard = ({ book }) => {
  const { bookImage, bookTitle, bookCreatedAt, bookDescription } = book;

  return (
    <div className="relative flex bg-gray-100 dark:bg-slate-800 flex-col my-6 shadow-sm rounded-lg w-full max-w-sm mx-auto">
      <div className="relative h-56 m-2.5 text-white rounded-md">
        <img src={bookImage} alt={bookTitle} className="w-96 h-56 rounded-lg" />
      </div>
      <div className="p-4">
        <h6 className="mb-8 text-slate-800 dark:text-slate-200 text-2xl font-semibold">
          {bookTitle}
        </h6>
        <p className="mb-4 dark:text-slate-200 whitespace-nowrap">
          <span className="text-[#078870]">ওবায়দুল্লাহ তাসনিম</span> ⬤ {Time(bookCreatedAt)}
        </p>
        <p className="mb-4 dark:text-slate-200">
          {bookDescription.slice(0, 50)}.....
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <button className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300" type="button">
          বিস্তারিত পড়ুন
        </button>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <div className="py-10">
    <img className="rounded-xl w-full" src={heroImg} alt="ওবায়দুল্লাহ তাসনিম" />
  </div>
);

const BookList = ({ books }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-7 gap-6">
    {books?.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);

const PageHeader = () => (
  <>
    <Title key="Home" title="ওবায়দুল্লাহ তাসনিম" />
    <h1 className="dark:text-slate-50 text-3xl text-center">
      ওবায়দুল্লাহ তাসনিম এর লিখিত বই সমূহ
    </h1>
    <hr className="mt-10 dark:text-slate-50" />
  </>
);

const Profile = () => (
  <div className="container px-4 max-w-screen-xl mx-auto py-10">
    <div className="text-center mb-12">
      <h1 className="dark:text-slate-50 text-3xl md:text-3xl text-slate-800 mb-4">
        ওবায়দুল্লাহ তাসনিম
      </h1>
      <hr className="mt-10 dark:text-slate-50" />
    </div>

    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
      <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
        <img src={Logo} alt="Profile Logo" className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-slate-200 dark:border-slate-600 shadow-lg" />
      </div>

      <div className="w-full md:w-2/3 lg:w-3/4">
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
          সামান্য একজন লেখক। লেখালিখি পেশা নয়, জীবনের মূল স্বপ্ন ও সাধনা।
          লেখেন, লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা,
          আলো এবং ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল দিয়ে।
          প্রতিটি লেখায় ফুটে ওঠে সমাজের প্রতি মমত্ববোধ ও মানবতার চিরন্তন বার্তা।
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">লেখক</span>
          <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">কলামিস্ট</span>
          <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">চিন্তক</span>
        </div>
      </div>
    </div>
  </div>
);

const Media = () => (
  <div className="container px-4 max-w-screen-xl mx-auto py-10">
    <div className="text-center mb-12">
      <h1 className="dark:text-slate-50 text-3xl md:text-3xl text-slate-800 mb-4">সোশ্যাল মিডিয়ায় ফলো করুন</h1>
      <hr className="mt-10 dark:text-slate-50" />
    </div>
    <div className="flex md:flex-row justify-center gap-8 md:gap-12 items-center">
      <a href="https://www.facebook.com/profile.php?id=100094697794310" target="_blank" rel="noopener noreferrer" className="fab fa-facebook text-5xl text-blue-600"></a>

      <a href="https://www.instagram.com/ubaydullahtasnim" target="_blank" rel="noopener noreferrer" className="fab fa-instagram text-5xl text-pink-500"></a>

      <a href="https://t.me/ubaydullahtasnim" target="_blank" rel="noopener noreferrer" className="fab fa-telegram text-5xl text-sky-500"></a>

      <a href="https://youtube.com/@tasnimhadi5440?si=oo_lxBa8JepcBWZG" target="_blank" rel="noopener noreferrer" className="fab fa-youtube text-5xl text-red-600"></a>
    </div>
    <hr className="mt-10 dark:text-slate-50" />
  </div>
);

export const EmailSubscribe = () => {
  return (
    <div className="p-6 bg-green-100 dark:bg-slate-600 text-center">
      <h2 className="text-xl font-bold dark:text-slate-100 mb-4">ই-মেইলে লেখা পেতে সাবস্ক্রাইব করুন</h2>
      <hr className="w-64 mx-auto dark:text-slate-200 mt-5" />
      <form className="max-w-md mx-auto mt-5">
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block font-medium dark:text-slate-100 mb-1">Name*</label>
          <input type="text" id="name" placeholder="আপনার সম্পূর্ন নাম লিখুন" className="w-full px-4 dark:text-slate-200 py-2 border rounded" required />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="email" className="block font-medium dark:text-slate-100 mb-1">Email*</label>
          <input type="email" id="email" placeholder="আপনার একটি একটিভ ই-মেইল দিন" className="w-full px-4 py-2 border dark:text-slate-200 rounded" required />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 mt-5 rounded hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </form>
      <p className="mt-6 text-sm dark:text-slate-200">
        বই সংক্রান্ত যে কোনো তথ্যের জন্য যোগাযোগ করুন{' '}
        <span className="font-bold text-green-500"><a href="https://www.facebook.com/profile.php?id=100094697794310">Team ওবায়দুল্লাহ তাসনিম</a></span>{' '}
        ফেসবুক পেইজে ইনবক্স করুন।
      </p>
    </div>
  );
};

// Main Component
export const Home = () => {
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="container px-2 max-w-screen-xl mx-auto py-5">
      <HeroSection />
      <PageHeader />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <BookList books={books} />
      )}
      <Profile />
      <Media />
      <EmailSubscribe />
    </div>
  );
};