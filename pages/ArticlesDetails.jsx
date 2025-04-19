import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../utils/pageTitle';
import { ErrorMessage } from '../component/layout/ErrorMessage';
import { LoadingSpinner } from '../component/layout/Loading';
import { Link, useParams } from 'react-router-dom';
import logo from '/logo.jpg';
import Time from '../utils/banglaDateFormatter';
import { useState } from 'react';

export const ArticlesDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const response = await axios.get(`https://server-iota-ebon-83.vercel.app/api/v1/articles_essays/${id}`);
            return response.data;
        }
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

    if (isLoading) {
        return (
            <div className="py-10 text-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-10 text-center">
                <ErrorMessage />
            </div>
        );
    }

    return (
        <div className="py-10">
            <Title title={data?.articlesEssaysName || "লেখার বিস্তারিত"} />
            <div className="container mx-auto px-4 max-w-screen-xl">
                {/* Comment Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-600 rounded-lg shadow-xl w-full max-w-md">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    মন্তব্য করুন
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            আপনার নাম
                                        </label>
                                        <input type="text" id="name" name="name" value={commentData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            মন্তব্য
                                        </label>
                                        <textarea id="message" name="message" rows="4" value={commentData.message} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white" required ></textarea>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-500 rounded-md hover:bg-gray-200 dark:hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]" >
                                            বাতিল
                                        </button>
                                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#078870] rounded-md hover:bg-[#067a65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]" >
                                            জমা দিন
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    <div className="border border-gray-200 dark:border-slate-500 p-6 bg-white dark:bg-slate-600 shadow-md">
                        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            {data?.articlesEssaysName}
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-5 text-sm sm:text-base text-[#078870] flex-wrap">
                            <div className="flex items-center gap-2">
                                <img className="w-6 h-6 sm:w-8 sm:h-8 border rounded-full" src={logo} alt="logo" />
                                <Link className='underline' to={'/books'}>{data?.articlesEssaysAuthor || "উবায়দুল্লাহ তাসনিম"}</Link>
                            </div>
                            <span className="hidden sm:inline">/</span>
                            <Link className="underline" to={'/articles'}>আমার প্রবন্ধ-নিবন্ধগুলো</Link>
                            <span className="hidden sm:inline">/</span>
                            <span>{Time(data?.articlesEssaysCreateAt)}</span>
                            <span className="hidden sm:inline">/</span>
                            <span>0 COMMENTS</span>
                        </div>

                        <div className="whitespace-pre-line break-words text-justify text-gray-700 dark:text-gray-200 leading-relaxed mt-5">
                            {data?.articlesEssaysDescription}
                        </div>


                        {data?.articlesEssaysQRCodeScen && (
                            <div className="mt-8">
                                <p className="text-gray-600 font-semibold dark:text-gray-300 mb-4">
                                    {data?.articlesEssaysQRCodeScen}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link to="/articles" className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300 whitespace-nowrap" type="button">সব লেখা দেখুন</Link>

                                    {data?.articlesEssaysQRCodeScenImg && (
                                        <img className="rounded-lg object-cover mx-auto max-w-xs h-auto border border-gray-300 dark:border-slate-500" src={data?.articlesEssaysQRCodeScenImg} alt="QR Code Scan" />
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="mt-8 ">
                            <button onClick={() => setIsModalOpen(true)} className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300" type="button" >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};