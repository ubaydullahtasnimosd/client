import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { Media } from "../component/layout/Media";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";
import author from "/author.jpg";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const Container = ({ children, className = "" }) => (
  <div className={cx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

const Section = ({ children, className = "" }) => (
  <section className={cx("py-10 md:py-14", className)}>{children}</section>
);

export const AboutAuthor = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["aboutAuthor"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/about_author/`);
      return response.data;
    },
    onError: (err) => {
      console.error("API Error:", err);
    },
  });

  const authorData = data && data.length > 0 ? data[0] : null;

  return (
    <main
      className={cx(
        "min-h-screen",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <Title key="AboutAuthor" title="লেখক সম্পর্কে" />

      {/* HERO */}
      <Section className="pt-6 md:pt-10">
        <Container>
          <div
            className={cx(
              "relative overflow-hidden rounded-3xl border shadow-sm",
              "border-slate-200 bg-white",
              "dark:border-slate-800 dark:bg-slate-950"
            )}
          >
            <img
              src={author}
              className="h-[220px] w-full object-cover sm:h-[280px] md:h-[320px]"
              alt="author-about"
              loading="lazy"
            />

            {/* premium overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

            {/* subtle border glow */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

            {/* Heading badge (content stays same - only UI wrapper) */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <div
                className={cx(
                  "inline-flex items-center rounded-2xl px-4 py-2 md:px-5 md:py-3",
                  "bg-white/85 backdrop-blur border border-white/40 shadow-sm",
                  "dark:bg-slate-950/70 dark:border-slate-700/60"
                )}
              >
                <span className="text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  লেখক সম্পর্কে
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CONTENT */}
      <Section className="pt-0">
        <Container>
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="py-12">
              <ErrorMessage />
            </div>
          ) : authorData ? (
            <div className="space-y-10">
              {/* Page Title */}
              <header className="text-center">
                <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {authorData.aboutAuthorName}
                </h2>
                <div className="mx-auto mt-4 h-px w-28 bg-slate-200 dark:bg-slate-800" />
              </header>

              {/* Author Card */}
              <div
                className={cx(
                  "rounded-3xl border shadow-sm",
                  "border-slate-200/70 bg-white",
                  "dark:border-slate-800 dark:bg-slate-950"
                )}
              >
                <div className="p-6 md:p-10">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                    {/* Avatar */}
                    <div className="w-full lg:w-[280px] flex justify-center lg:justify-start">
                      <div className="relative">
                        <img
                          src={authorData.aboutAuthorImg}
                          alt={authorData.aboutAuthorName}
                          loading="lazy"
                          className={cx(
                            "rounded-full object-cover",
                            "h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64",
                            "ring-1 ring-slate-900/10 dark:ring-white/10",
                            "shadow-sm"
                          )}
                        />
                        {/* subtle status dot purely decorative */}
                        <span className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="w-full flex-1">
                      <p className="text-base md:text-lg leading-7 md:leading-9 text-slate-700 dark:text-slate-300 text-justify whitespace-pre-line">
                        {authorData.aboutAuthorDescription}
                      </p>

                      {/* Roles */}
                      <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
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

                      {/* Purchase Links */}
                      <div className="mt-8">
                        <div
                          className={cx(
                            "rounded-3xl border p-5 md:p-7",
                            "border-emerald-200/70 bg-emerald-50/60",
                            "dark:border-slate-800 dark:bg-slate-900/40"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cx(
                                "mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                                "bg-emerald-600 text-white shadow-sm",
                                "dark:bg-emerald-500/20 dark:text-emerald-200"
                              )}
                              aria-hidden="true"
                            >
                              <span className="text-sm font-bold">৳</span>
                            </div>

                            <div className="flex-1">
                              <p className="text-base md:text-lg leading-7 md:leading-8 text-slate-700 dark:text-slate-200">
                                উবায়দুল্লাহ তাসনিম এর বইগুলো সংগ্রহ করা যাবে দেশজুড়ে যে কোনো
                                বইয়ের স্টোরগুলো থেকে, পাশাপাশি হোম ডেলিভারি পাওয়া যাবে দেশের
                                জনপ্রিয় সকল ই-কমার্সগুলো থেকে, এর মধ্য অন্যতম—
                              </p>

                              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                {[
                                  {
                                    href: "https://www.rokomari.com/book/author/78295/ubayodullah-tasnim",
                                    label: "rokomari.com",
                                  },
                                  {
                                    href: "https://www.wafilife.com/ramadan-package/dp/913631",
                                    label: "wafilife.com",
                                  },
                                  {
                                    href: "https://www.kitabghor.com/products/details/aa998903558311efb60a2a6c60b8696b/fire-elo-ramadan.html",
                                    label: "kitabghor.com",
                                  },
                                  {
                                    href: "https://www.boibazar.com/author-books/ubaidullah-tasnim",
                                    label: "boibazar.com",
                                  },
                                  {
                                    href: "https://www.niyamahshop.com/book-author/উবায়দুল্লাহ-তাসনিম/",
                                    label: "niyamahshop.com",
                                  },
                                ].map((item) => (
                                  <li key={item.href}>
                                    <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={item.href}
                                      className={cx(
                                        "group flex items-center justify-between gap-3 rounded-2xl px-4 py-3",
                                        "bg-white/70 ring-1 ring-emerald-200/70 shadow-sm",
                                        "transition hover:-translate-y-0.5 hover:shadow-md",
                                        "dark:bg-slate-950/60 dark:ring-slate-800",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                                      )}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500/80 dark:bg-emerald-400/80" />
                                        <span
                                          className={cx(
                                            "text-sm font-semibold underline-offset-4",
                                            "text-emerald-800 group-hover:underline",
                                            "dark:text-emerald-300"
                                          )}
                                        >
                                          {item.label}
                                        </span>
                                      </div>
                                      <span className="text-slate-300 dark:text-slate-700">
                                        ↗
                                      </span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="pt-2">
                <Media />
              </div>
            </div>
          ) : (
            <div className="py-14 text-center text-slate-700 dark:text-slate-200">
              কোন ডাটা পাওয়া যায়নি
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
};
