import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { Media } from "../component/layout/Media";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import heroImg from "/Banner.png";
import Logo from "/logo.jpg";
import VisitCount from "./VisitCount";
import { baseUrl } from "../constants/env.constants";

// API URLs
const BOOK_API_URL = `${baseUrl}/book/`;
const SUBSCRIBE_API_URL = `${baseUrl}/subscribe/subscribe/`;
const VERIFY_API_URL = `${baseUrl}/subscribe/subscribe/verify/`;

// API Services
const fetchBooks = async () => {
  const { data } = await axios.get(BOOK_API_URL);
  return data;
};

const subscribeEmail = async (formData) => {
  const response = await axios.post(SUBSCRIBE_API_URL, formData);
  return response.data;
};

const verifySubscription = async (token) => {
  const response = await axios.get(`${VERIFY_API_URL}${token}/`);
  return response.data;
};

// Components
const BookCard = ({ book }) => {
  const { bookImage, bookTitle, bookCreatedAt, bookDescription } = book;

  return (
    <div className="relative flex flex-col bg-gray-100 dark:bg-slate-800 my-6 w-full max-w-sm mx-auto overflow-hidden">
      <div className="w-full h-64">
        <img
          src={bookImage || Logo}
          alt={bookTitle}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = Logo;
          }}
        />
      </div>
      <div className="p-4 flex-grow">
        <h6 className="mb-3 text-slate-800 dark:text-slate-200 text-xl font-semibold">
          {bookTitle}
        </h6>
        <p className="mb-3 dark:text-slate-200 whitespace-nowrap">
          <span className="text-[#078870]">উবায়দুল্লাহ তাসনিম</span> •{" "}
          {Time(bookCreatedAt)}
        </p>
        <p className="mb-3 dark:text-slate-200 line-clamp-3">
          {bookDescription}
        </p>
      </div>
      <div className="px-4 pb-4">
        <Link
          to={`/books`}
          className="inline-block rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg hover:bg-slate-700 dark:hover:bg-slate-300"
        >
          বিস্তারিত
        </Link>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <div className="py-10 p-3">
    <img
      src={heroImg}
      className="w-[1230px] mx-auto"
      alt="hero section"
      loading="lazy"
    />
  </div>
);

const BookList = ({ books }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-7 gap-6 px-4">
    {books?.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);

const PageHeader = () => (
  <div className="px-4">
    <Title key="Home" title="উবায়দুল্লাহ তাসনিম" />
    <h1 className="dark:text-slate-50 text-2xl md:text-3xl text-center text-gray-800">
      উবায়দুল্লাহ তাসনিম এর লিখিত বই সমূহ
    </h1>
    <hr className="mt-6 dark:border-slate-200" />
  </div>
);

const Profile = () => (
  <div className="container px-4 max-w-screen-xl mx-auto py-10">
    <div className="text-center mb-12">
      <h1 className="dark:text-slate-50 text-2xl md:text-3xl text-slate-800  mb-4">
        উবায়দুল্লাহ তাসনিম
      </h1>
      <hr className="mt-6 dark:border-slate-200" />
    </div>

    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
      <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
        <img
          src={Logo}
          alt="Profile Logo"
          className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-slate-200 dark:border-slate-600 shadow-lg"
          loading="lazy"
        />
      </div>

      <div className="w-full md:w-2/3 lg:w-3/4">
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
          সামান্য একজন লেখক। লেখালিখি পেশা নয়, জীবনের মূল স্বপ্ন ও সাধনা। লেখেন,
          লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো
          এবং ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল দিয়ে।
          প্রতিটি লেখায় ফুটে ওঠে সমাজের প্রতি মমত্ববোধ ও মানবতার চিরন্তন বার্তা।
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          {["লেখক", "অনুবাদক", "শিক্ষক"].map((role) => (
            <span
              key={role}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const EmailSubscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: () => {
      const message =
        "সাবস্ক্রিপশন সফল! ভেরিফিকেশনের জন্য আপনার ইমেইল চেক করুন।";
      toast.success(message);
      setSuccessMessage(message);
      setName("");
      setEmail("");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "সাবস্ক্রিপশন ব্যর্থ। আবার চেষ্টা করুন।"
      );
    },
  });

  const token = new URLSearchParams(window.location.search).get("token");

  useQuery({
    queryKey: ["verifySubscription", token],
    queryFn: () => verifySubscription(token),
    enabled: !!token,
    onSuccess: () => {
      toast.success("ইমেইল ভেরিফিকেশন সফল!");
      window.history.replaceState({}, document.title, window.location.pathname);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "ভেরিফিকেশন ব্যর্থ। আবার চেষ্টা করুন।"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.warning("দয়া করে নাম এবং ইমেইল ঠিকানা প্রদান করুন");
      return;
    }
    setSuccessMessage("");
    subscribeMutation.mutate({ name, email });
  };

  return (
    <div className="mb-10 py-10 bg-green-50 dark:bg-slate-600 mx-4">
      <h2 className="text-xl font-bold dark:text-slate-200 mb-4 text-center">
        ই-মেইলে লেখা পেতে সাবস্ক্রাইব করুন
      </h2>
      <hr className="w-64 mx-auto dark:border-slate-500 my-4" />

      {successMessage && (
        <div className="max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-3">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-medium dark:text-slate-100 mb-2"
          >
            নাম*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার সম্পূর্ণ নাম"
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-600 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-medium dark:text-slate-100 mb-2"
          >
            ইমেইল*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল ঠিকানা"
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-600 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {subscribeMutation.isPending ? "প্রক্রিয়াধীন..." : "সাবস্ক্রাইব"}
        </button>
      </form>

      <p className="mt-6 text-sm dark:text-slate-300 text-center">
        বই সংক্রান্ত যে কোনো তথ্যের জন্য যোগাযোগ করুন{" "}
        <a
          href="https://www.facebook.com/profile.php?id=100094697794310"
          className="font-semibold text-green-600 dark:text-green-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ubaydullah Tasnim
        </a>{" "}
        ফেসবুক পেইজে।
      </p>
    </div>
  );
};

// Main Component
export const Home = () => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="max-w-screen-xl mx-auto">
      <HeroSection />
      <PageHeader />
      {isLoading ? (
        <div className="py-20">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className="py-20">
          <ErrorMessage />
        </div>
      ) : (
        <BookList books={books} />
      )}
      <Profile />
      <VisitCount />
      <Media />
      <EmailSubscribe />
    </div>
  );
};
