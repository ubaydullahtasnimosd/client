import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ErrorMessage } from '../component/layout/ErrorMessage';
import { LoadingSpinner } from '../component/layout/Loading';
import { Media } from '../component/layout/Media';
import Title from '../utils/pageTitle';
import author from '/author.jpg';

export const AboutAuthor = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['aboutAuthor'],
        queryFn: async () => {
            try {
                const response = await axios.get('https://server-iota-ebon-83.vercel.app/api/v1/about_author/');
                console.log('API Data:', response.data);
                return response.data;
            } catch (err) {
                console.error('API Error:', err);
                throw err;
            }
        }
    });

    return (
        <div className="py-10">
            <Title key="AboutAuthor" title="আমার সম্পর্কে" />
            <img src={author} className="md:w-[1240px] md:h-[150px] mx-auto pl-2 pr-2" alt="author-about" />

            <div className="mt-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage />
                ) : data && data.length > 0 ? (
                    <div className='mt-10'>
                        <h2 className="text-3xl dark:text-slate-200 mb-4 text-center">
                            {data[0].aboutAuthorName}
                        </h2>
                        <hr className="mt-10 dark:text-slate-50 w-[80rem] mx-auto" />
                        <div className="mt-10 flex flex-col md:flex-row container px-4 max-w-screen-xl mx-auto">
                            <div className="w-full md:w-1/3 lg:w-1/4 flex">
                                <img src={data[0].aboutAuthorImg} alt="Profile Logo" className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-slate-200 dark:border-slate-600 shadow-lg" />
                            </div>

                            <div className="w-full mt-5 md:w-2/3 lg:w-3/4">
                                <p className="text-lg text-justify dark:text-slate-200">{data[0].aboutAuthorDescription}</p>
                                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">লেখক</span>
                                    <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">অনুবাদক</span>
                                    <span className="px-4 py-2 bg-slate-200 dark:bg-slate-500 rounded-full text-sm font-medium">শিক্ষক</span>

                                    <span className='mt-5 text-lg dark:text-slate-200'>
                                        উবায়দুল্লাহ তাসনিম এর বইগুলো সংগ্রহ করা যাবে দেশজুড়ে যে কোনো বইয়ের স্টোরগুলো থেকে, পাশাপাশি হোম ডেলিভারি পাওয়া যাবে দেশের জনপ্রিয় সকল ই-কমার্সগুলো থেকে, এর মধ্য অন্যতম—
                                        <ul className='mt-5 text-[#078870]'>
                                            <li>• <a target='_blank' href="https://www.rokomari.com/book/author/78295/ubayodullah-tasnim">rokomari.com</a></li>

                                            <li>• <a target='_blank' href="https://www.wafilife.com/ramadan-package/dp/913631">wafilife.com</a></li>

                                            <li>• <a target='_blank' href="https://www.kitabghor.com/products/details/aa998903558311efb60a2a6c60b8696b/fire-elo-ramadan.html">kitabghor.com</a></li>

                                            <li>• <a target='_blank' href="https://www.boibazar.com/author-books/ubaidullah-tasnim">boibazar.com</a></li>

                                            <li>• <a target='_blank' href="https://www.niyamahshop.com/book-author/উবায়দুল্লাহ-তাসনিম/">niyamahshop.com</a></li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Media />
                    </div>
                ) : (
                    <div className="text-center">কোন ডাটা পাওয়া যায়নি</div>
                )}
            </div>
        </div>
    );
};