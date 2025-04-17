import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../utils/pageTitle';
import { ErrorMessage } from '../component/layout/ErrorMessage';
import { LoadingSpinner } from '../component/layout/Loading';
import { Link, useParams } from 'react-router-dom';
import logo from '/logo.jpg';
import Time from '../utils/banglaDateFormatter';

export const ArticlesDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const response = await axios.get(`https://server-iota-ebon-83.vercel.app/api/v1/articles_essays/${id}`);
            return response.data;
        }
    });

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
                                    <Link to="/articles" className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300 whitespace-nowrap" type="button">
                                        সব লেখা দেখুন
                                    </Link>

                                    {data?.articlesEssaysQRCodeScenImg && (
                                        <img className="rounded-lg object-cover mx-auto max-w-xs h-auto border border-gray-300 dark:border-slate-500" src={data?.articlesEssaysQRCodeScenImg} alt="QR Code Scan" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};