export const Home = () => {
  return (
    <>
      <div className="container px-2 max-w-screen-xl mx-auto py-5">
        <div className="py-10">
          <img
            className="rounded-md border"
            src="../public/heroImg.jpg"
            alt=""
          />
        </div>

        <h1 className="dark:text-slate-50 text-7xl">সর্বশেষ ব্লগ</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-7">
          <div class="relative flex bg-gray-100 flex-col my-6 dark:bg-white shadow-sm  rounded-lg w-96">
            <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                alt="card-image"
              />
            </div>
            <div class="p-4">
              <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                পশ্চিমের ট্রান্সতত্ত্বে ব্রাত্য ডকিন্স
              </h6>
              <p className="mb-2">Arif Azad January 24, 2024</p>
              <p class="text-slate-600 leading-normal font-light">
                নিউ এথেইজম নিয়ে পড়াশুনা করেন বা জানাশোনা আছে, অথবা নিদেনপক্ষে
                বাংলাদেশি অন্তর্জালীয় কোনো নাস্তিকের লেখাজোকা জীবনে বার কয়েক
                চোখে পড়েছে এমন যেকারো কাছে রিচার্ড ডকিন্স পরিচত নাম।
                বিবর্তনবাদের ধোঁয়া তুলে নাস্তিকতার প্রচার, প্রসারে ডকিন্স যে...
              </p>
            </div>
            <div class="px-4 pb-4 pt-0 mt-2">
              <button
                class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
