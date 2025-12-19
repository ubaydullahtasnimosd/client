import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { Media } from "../component/layout/Media";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import VisitCount from "./VisitCount";
import heroImg from "/Banner1.png";
import Logo from "/logo.jpg";

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

const cx = (...classes) => classes.filter(Boolean).join(" ");

const SectionShell = ({ children, className = "" }) => (
  <section className={cx("py-14", className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const BookCard = ({ book }) => {
  const { bookImage, bookTitle, bookCreatedAt, bookDescription } = book;

  return (
    <div
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-2xl border",
        "border-slate-200/70 bg-white shadow-sm transition duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        "dark:border-slate-800 dark:bg-slate-950",
        "focus-within:ring-2 focus-within:ring-emerald-500/30"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={bookImage || Logo}
          alt={bookTitle}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          onError={(e) => {
            e.target.src = Logo;
          }}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/20" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h6 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {bookTitle}
        </h6>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            উবায়দুল্লাহ তাসনিম
          </span>{" "}
          <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
          {Time(bookCreatedAt)}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 line-clamp-3">
          {bookDescription}
        </p>

        <div className="mt-5">
          <Link
            to={`/books`}
            className={cx(
              "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
              "bg-slate-900 text-white shadow-sm transition",
              "hover:bg-slate-800",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
              "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            )}
          >
            বিস্তারিত
          </Link>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="pt-6 sm:pt-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className={cx(
          "overflow-hidden rounded-2xl border shadow-sm",
          "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
        )}
      >
        <img
          src={heroImg}
          className="w-full object-cover"
          alt="hero section"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

const PageHeader = () => (
  <SectionShell className="py-10">
    <Title key="Home" title="উবায়দুল্লাহ তাসনিম" />
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        উবায়দুল্লাহ তাসনিম এর লিখিত বই সমূহ
      </h1>
      <div className="mx-auto mt-4 h-px w-28 bg-slate-200 dark:bg-slate-800" />
    </div>
  </SectionShell>
);

const BookList = ({ books }) => (
  <SectionShell className="pt-0">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </SectionShell>
);

const Profile = () => (
  <SectionShell>
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        উবায়দুল্লাহ তাসনিম
      </h1>
      <div className="mx-auto mt-4 h-px w-28 bg-slate-200 dark:bg-slate-800" />
    </div>

    <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
      <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
        <img
          src={Logo}
          alt="Profile Logo"
          className={cx(
            "h-48 w-48 md:h-64 md:w-64 rounded-full object-cover",
            "ring-1 ring-slate-900/10 dark:ring-white/10",
            "shadow-sm"
          )}
          loading="lazy"
        />
      </div>

      <div className="w-full md:w-2/3 lg:w-3/4">
        <p className="text-base md:text-lg leading-7 md:leading-10 lg:leading-10 text-slate-700 dark:text-slate-300 text-justify">
          সামান্য একজন লেখক। লেখালিখি পেশা নয়, জীবনের মূল স্বপ্ন ও সাধনা। লেখেন,
          লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো
          এবং ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল দিয়ে।
          প্রতিটি লেখায় ফুটে ওঠে সমাজের প্রতি মমত্ববোধ ও মানবতার চিরন্তন বার্তা।
        </p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
          {["লেখক", "অনুবাদক", "শিক্ষক"].map((role) => (
            <span
              key={role}
              className={cx(
                "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium",
                "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
                "dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800"
              )}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  </SectionShell>
);

export const EmailSubscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: () => {
      const message = "সাবস্ক্রিপশন সফল! ভেরিফিকেশনের জন্য আপনার ইমেইল চেক করুন।";
      toast.success(message);
      setSuccessMessage(message);
      setName("");
      setEmail("");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "সাবস্ক্রিপশন ব্যর্থ। আবার চেষ্টা করুন।"
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
    <SectionShell>
      <div
        className={cx(
          "rounded-2xl border p-6 md:p-10",
          "border-emerald-200/70 bg-emerald-50/60",
          "dark:border-slate-800 dark:bg-slate-950"
        )}
      >
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-center">
          ই-মেইলে লেখা পেতে সাবস্ক্রাইব করুন
        </h2>
        <div className="mx-auto mt-4 h-px w-28 bg-emerald-200 dark:bg-slate-800" />

        {successMessage && (
          <div
            className={cx(
              "mx-auto mt-6 max-w-md rounded-xl border px-4 py-3 text-center text-sm",
              "border-emerald-200 bg-white/70 text-emerald-800",
              "dark:border-slate-800 dark:bg-slate-900/60 dark:text-emerald-300"
            )}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
            >
              নাম*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার সম্পূর্ণ নাম"
              required
              className={cx(
                "h-11 w-full rounded-xl border px-4 text-sm shadow-sm",
                "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              )}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
            >
              ইমেইল*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল ঠিকানা"
              required
              className={cx(
                "h-11 w-full rounded-xl border px-4 text-sm shadow-sm",
                "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              )}
            />
          </div>

          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className={cx(
              "h-11 w-full rounded-xl text-sm font-medium text-white shadow-sm transition",
              "bg-emerald-600 hover:bg-emerald-700",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
          >
            {subscribeMutation.isPending ? "প্রক্রিয়াধীন..." : "সাবস্ক্রাইব"}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-600 dark:text-slate-300 text-center">
          বই সংক্রান্ত যে কোনো তথ্যের জন্য যোগাযোগ করুন{" "}
          <a
            href="https://www.facebook.com/profile.php?id=100094697794310"
            className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ubaydullah Tasnim
          </a>{" "}
          ফেসবুক পেইজে।
        </p>
      </div>
    </SectionShell>
  );
};

// Main Component
export const Home = () => {
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="w-full">
      <HeroSection />
      <PageHeader />

      {isLoading ? (
        <SectionShell className="pt-0">
          <div className="py-10">
            <LoadingSpinner />
          </div>
        </SectionShell>
      ) : isError ? (
        <SectionShell className="pt-0">
          <div className="py-10">
            <ErrorMessage />
          </div>
        </SectionShell>
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
