import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ErrorMessage } from '../component/layout/ErrorMessage';
import { LoadingSpinner } from '../component/layout/Loading';
import Title from '../utils/pageTitle';
import logo from '/logo.jpg';
import { Link } from "react-router-dom";
import Time from '../utils/banglaDateFormatter';
import { useState } from "react";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentData, setCommentData] = useState({
        name: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Comment submitted:", commentData);
        setCommentData({ name: '', message: '' });
        setIsModalOpen(false);
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage />;

    return (
        <div className="container px-4 mx-auto py-6 sm:py-10 max-w-screen-xl">
            <Title key="BookDetails" title={`বইয়ের বিস্তারিত`} />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-600 rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                মন্তব্য করুন
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">আপনার নাম</label>
                                    <input type="text" id="name" name="name" value={commentData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">মন্তব্য</label>
                                    <textarea id="message" name="message" rows="4" value={commentData.message} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white" required ></textarea>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-500 rounded-md hover:bg-gray-200 dark:hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]" >বাতিল</button>
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#078870] rounded-md hover:bg-[#067a65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]" >জমা দিন</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                    <img src={book?.bookImage} alt={book?.bookTitle} className="w-full h-full" />
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {book?.bookTitle}
                        </h1>

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

                    <div className="mb-6 text-justify">
                        <h3 className="text-lg sm:text-xl font-semibold dark:text-white mb-3 border-b pb-2">
                            বই সম্পর্কে
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                            {book?.bookDescription}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => setIsModalOpen(true)} className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300" type="button" >Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};