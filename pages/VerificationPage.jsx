import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifySubscription } from '../api/subscribe';

export const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('verification_token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          await verifySubscription(token);
          toast.success('ইমেইল ভেরিফিকেশন সফল!');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'ভেরিফিকেশন ব্যর্থ');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          ভেরিফিকেশন প্রক্রিয়াধীন...
        </h2>
        <p className="dark:text-gray-300">
          অনুগ্রহ করে অপেক্ষা করুন, আপনাকে স্বয়ংক্রিয়ভাবে রিডাইরেক্ট করা হবে
        </p>
      </div>
    </div>
  );
};