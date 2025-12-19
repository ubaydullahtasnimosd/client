const cx = (...classes) => classes.filter(Boolean).join(" ");

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100094697794310",
    label: "Facebook",
    icon: "fab fa-facebook-f",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "https://www.instagram.com/ubaydullahtasnim",
    label: "Instagram",
    icon: "fab fa-instagram",
    color: "text-pink-500 dark:text-pink-400",
  },
  {
    href: "https://t.me/ubaydullahtasnim",
    label: "Telegram",
    icon: "fab fa-telegram-plane",
    color: "text-sky-500 dark:text-sky-400",
  },
  {
    href: "https://www.youtube.com/@Ubaydullah12",
    label: "YouTube",
    icon: "fab fa-youtube",
    color: "text-red-600 dark:text-red-400",
  },
  {
    href: "https://x.com/AbrarHasan92742?t=7rMOM__upbm1rkd9YLlyjA&s=09",
    label: "X (Twitter)",
    icon: "fab fa-twitter",
    color: "text-slate-800 dark:text-slate-200",
  },
];

export const Media = () => (
  <section className="py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          সোশ্যাল মিডিয়ায় ফলো করুন
        </h1>
        <div className="mx-auto mt-4 h-px w-24 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {socialLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={cx(
              "group inline-flex h-12 w-12 items-center justify-center rounded-full",
              "border border-slate-200 bg-white shadow-sm",
              "transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
              "active:translate-y-0",
              "dark:border-slate-800 dark:bg-slate-950",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            )}
          >
            <i className={cx(item.icon, "text-xl", item.color)} />
          </a>
        ))}
      </div>

      <div className="mt-12 h-px w-full bg-slate-200 dark:bg-slate-800" />
    </div>
  </section>
);
