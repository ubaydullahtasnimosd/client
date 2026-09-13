import { useCallback, useEffect, useState } from "react";
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiLink, FiShare2, FiX } from "react-icons/fi";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const SocialMedia = ({
  title = "",
  url = "",
  buttonText = "শেয়ার করুন",
  buttonClassName = "",
  showTrigger = true,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isControlled = typeof controlledIsOpen === "boolean";
  const modalOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, controlledOnClose]);

  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle =
    title || (typeof document !== "undefined" ? document.title : "উবায়দুল্লাহ তাসনিম");

  // Keyboard accessibility (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        handleClose();
      }
    };
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, handleClose]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSocialShare = (platform) => {
    let shareLink = "";
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareTitle + " - "
        )}${encodedUrl}`;
        break;
      case "telegram":
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      default:
        break;
    }

    if (shareLink) {
      window.open(
        shareLink,
        "_blank",
        "noopener,noreferrer,width=640,height=560"
      );
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {showTrigger && (
        <button
          type="button"
          onClick={() => setInternalIsOpen(true)}
          className={cx(
            "inline-flex items-center justify-center gap-2  border border-stone-300 bg-white px-5 py-2.5 sm:py-3 text-sm font-medium text-stone-800 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C]    cursor-pointer",
            buttonClassName
          )}
          aria-label="শেয়ার করুন"
        >
          <FiShare2 className="h-4 w-4 text-[#E5A93C]" />
          <span>{buttonText}</span>
        </button>
      )}

      {/* Share Modal Dialog */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md  bg-white p-6 sm:p-8 shadow-2xl  border border-stone-100  transition-all z-10 animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 ">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center  bg-stone-100 text-stone-800   border border-stone-200/80 ">
                  <FiLink className="h-4 w-4 rotate-45" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900  font-['Noto_Serif_Bengali',_serif]">
                  Share with friends
                </h3>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-8 w-8 items-center justify-center  text-stone-400 hover:bg-stone-100 hover:text-stone-700   transition cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Social Share Grid matching attached reference */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6">
              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialShare("facebook")}
                className="flex flex-col items-center justify-center gap-2  bg-[#1877F2] py-4 px-2 text-white shadow-md hover:bg-[#166fe5] hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span className="flex h-9 w-9 items-center justify-center  bg-white text-[#1877F2]">
                  <FaFacebookF className="h-5 w-5" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  Facebook
                </span>
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => handleSocialShare("whatsapp")}
                className="flex flex-col items-center justify-center gap-2  bg-[#25D366] py-4 px-2 text-white shadow-md hover:bg-[#20bd5a] hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span className="flex h-9 w-9 items-center justify-center  bg-white text-[#25D366]">
                  <FaWhatsapp className="h-5 w-5" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  WhatsApp
                </span>
              </button>

              {/* Telegram */}
              <button
                type="button"
                onClick={() => handleSocialShare("telegram")}
                className="flex flex-col items-center justify-center gap-2  bg-[#229ED9] py-4 px-2 text-white shadow-md hover:bg-[#1f8ec4] hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span className="flex h-9 w-9 items-center justify-center  bg-white text-[#229ED9]">
                  <FaTelegramPlane className="h-5 w-5" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  Telegram
                </span>
              </button>
            </div>

            {/* Copy link section */}
            <div className="pt-2">
              <label
                htmlFor="share-page-link"
                className="block mb-2 text-xs sm:text-sm font-medium text-stone-600 "
              >
                Or copy page link:
              </label>

              <div className="flex items-center  border border-stone-200 bg-stone-50/90 p-1.5 pl-3.5 shadow-inner  ">
                <input
                  id="share-page-link"
                  type="text"
                  readOnly
                  value={currentUrl}
                  onClick={(e) => e.target.select()}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-700  outline-none truncate font-['Noto_Serif_Bengali',_serif] select-all"
                />

                <button
                  type="button"
                  onClick={handleCopy}
                  className={cx(
                    "shrink-0  px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer ml-2 flex items-center gap-1.5",
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-[#121624] hover:bg-black text-white  "
                  )}
                >
                  {copied ? (
                    <>
                      <FiCheck className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMedia;
