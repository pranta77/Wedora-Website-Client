
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EA] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle
          size={70}
          className="text-green-500 mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for subscribing to Wedora Premium.
          Your payment was successful.
        </p>

        <Link
          href="/dashboard"
          className="inline-block bg-[#285943] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f4533] transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
