
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreditCard, LoaderCircle, ReceiptText } from "lucide-react";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load transactions.");
        }

        setTransactions(data.transactions || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <CreditCard size={28} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Platform Transactions
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor payments and transaction records across Wedora.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-pink-600" size={35} />
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white px-6 py-16 text-center">
          <ReceiptText
            className="mx-auto text-pink-400"
            size={45}
          />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Transactions Yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Transaction records will appear here when payments are available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-pink-100 bg-white shadow-sm">
          <table className="w-full min-w-187.5 text-left text-sm">
            <thead className="bg-pink-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Transaction ID</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-pink-50/40">
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {transaction.transactionId || transaction._id}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {transaction.customerEmail || transaction.customerName || "N/A"}
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-900">
                    ৳{Number(transaction.amount || 0).toLocaleString("en-BD")}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                      {transaction.status || "Unknown"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {transaction.createdAt
                      ? new Date(transaction.createdAt).toLocaleDateString("en-BD")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
