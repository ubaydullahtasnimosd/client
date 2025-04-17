import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ErrorMessage } from '../component/layout/ErrorMessage';
import { LoadingSpinner } from '../component/layout/Loading';
import Title from '../utils/pageTitle';
import logo from '/logo.jpg';
import { Link } from "react-router-dom";
import Time from '../utils/banglaDateFormatter';

const fetchBookDetails = async (id) => {
    const { data } = await axios.get(`https://server-iota-ebon-83.vercel.app/api/v1/book/${id}/`);
    return data;
};

export const BookDetails = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ["book", id],
        queryFn: () => fetchBookDetails(id),
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage />;

    return (
        <div className="container px-4 mx-auto py-6 sm:py-10 max-w-screen-xl">
            <Title key="BookDetails" title={`বইয়ের বিস্তারিত`} />

            <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                {/* Image Section - Responsive height */}
                <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                    <img src={book?.bookImage} alt={book?.bookTitle} className="w-full h-full" />
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {book?.bookTitle}
                        </h1>

                        {/* Author and Meta Info - Responsive layout */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-5 text-sm sm:text-base text-[#078870] flex-wrap">
                            <div className="flex items-center gap-2">
                                <img className="w-6 h-6 sm:w-8 sm:h-8 border rounded-full" src={logo} alt="logo" />
                                <span>{book?.author || "উবায়দুল্লাহ তাসনিম"}</span>
                            </div>
                            <span className="hidden sm:inline">/</span>
                            <Link className="underline" to={'/books'}>আমার বইগুলো</Link>
                            <span className="hidden sm:inline">/</span>
                            <span>{Time(book?.bookCreatedAt)}</span>
                            <span className="hidden sm:inline">/</span>
                            <span>0 COMMENTS</span>
                        </div>

                        <p className="mt-3 sm:mt-5 text-base sm:text-lg dark:text-slate-50">
                            {book?.bookPublication}
                        </p>

                        <p className="mt-3 sm:mt-5 text-base sm:text-lg dark:text-slate-50">
                            বইটি অর্ডার করতে এই লিংক এ ক্লিক করুন : <a target="_blank" className="underline text-[#078870]" href={book?.bookPurchaseLink}>{book?.bookPurchaseLink}</a>
                        </p>
                    </div>

                    {/* Book Description */}
                    <div className="mb-6 text-justify">
                        <h3 className="text-lg sm:text-xl font-semibold dark:text-white mb-3 border-b pb-2">
                            বই সম্পর্কে
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                            {book?.bookDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};