const cx = (...classes) => classes.filter(Boolean).join(" ");

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100094697794310",
    label: "Facebook",
    icon: "fab fa-facebook-f",
    color: "text-blue-600 ",
  },
  {
    href: "https://www.instagram.com/ubaydullahtasnim",
    label: "Instagram",
    icon: "fab fa-instagram",
    color: "text-pink-500 ",
  },
  {
    href: "https://t.me/ubaydullahtasnim",
    label: "Telegram",
    icon: "fab fa-telegram-plane",
    color: "text-sky-500 ",
  },
  {
    href: "https://www.youtube.com/@Ubaydullah12",
    label: "YouTube",
    icon: "fab fa-youtube",
    color: "text-red-600 ",
  },
  {
    href: "https://x.com/AbrarHasan92742?t=7rMOM__upbm1rkd9YLlyjA&s=09",
    label: "X (Twitter)",
    icon: "fab fa-twitter",
    color: "text-slate-800 ",
  },
];

export const Media = ({ className = "bg-white " }) => (
  <section className={cx("py-16 sm:py-20 lg:py-24", className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-[#E5A93C] uppercase mb-2">
          কানেক্ট থাকুন
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif]">
          সোশ্যাল মিডিয়ায় ফলো করুন
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-16 bg-[#E5A93C]" />
        <p className="mt-3.5 text-sm sm:text-base text-slate-600 ">
          লেখক ও গবেষকের সাথে যুক্ত থাকতে এবং নিয়মিত নতুন আপডেট পেতে সোশ্যাল মিডিয়া প্রোফাইলগুলো অনুসরণ করুন
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {socialLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={cx(
              "group inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center ",
              "border border-slate-200/80 bg-white shadow-xs",
              "transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/50",
              "active:translate-y-0",
              " ",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]/40"
            )}
          >
            <i className={cx(item.icon, "text-xl transition-transform duration-200 group-hover:scale-110", item.color)} />
          </a>
        ))}
      </div>
    </div>
  </section>
);
