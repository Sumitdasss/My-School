/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";

export default function ReceiptPage({ params }) {

  const { id } = params;

  const [receipt, setReceipt] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadReceipt();

  }, []);

  const loadReceipt = async () => {

    try {

      const res = await fetch(`/api/Receipt/${id}`);

      const data = await res.json();

      if (data.success) {

        setReceipt(data.receipt);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const printReceipt = () => {

    window.print();

  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!receipt) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Receipt Not Found
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-10">

        {/* Header */}

        <div className="text-center border-b pb-6">

          <img
            src="/logo.png"
            className="w-24 h-24 mx-auto"
          />

          <h1 className="text-3xl font-bold mt-4">

            Goalkhali Ideal High School

          </h1>

          <p className="text-gray-500">

            Payment Receipt

          </p>

        </div>

        {/* Student */}

        <div className="flex gap-8 mt-8">

          <img
            src={receipt.photo || "/default-avatar.png"}
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div className="space-y-2">

            <p>

              <strong>Name :</strong>

              {receipt.fullName}

            </p>

            <p>

              <strong>Roll :</strong>

              {receipt.rollNumber}

            </p>

            <p>

              <strong>Class :</strong>

              {receipt.class1}

            </p>

            <p>

              <strong>Section :</strong>

              {receipt.section}

            </p>

            <p>

              <strong>Email :</strong>

              {receipt.email}

            </p>

            <p>

              <strong>Phone :</strong>

              {receipt.phone}

            </p>

          </div>

        </div>

        {/* Payment */}

        <div className="mt-10">

          <table className="w-full border">

            <tbody>

              <tr className="border">

                <td className="p-3 font-semibold">

                  Fee Type

                </td>

                <td className="p-3">

                  {receipt.feeType}

                </td>

              </tr>

              <tr className="border">

                <td className="p-3 font-semibold">

                  Amount

                </td>

                <td className="p-3">

                  ৳ {receipt.amount}

                </td>

              </tr>

              <tr className="border">

                <td className="p-3 font-semibold">

                  Transaction ID

                </td>

                <td className="p-3">

                  {receipt.transactionId}

                </td>

              </tr>

              <tr className="border">

                <td className="p-3 font-semibold">

                  Status

                </td>

                <td className="p-3">

                  <span className="bg-green-500 text-white px-3 py-1 rounded">

                    {receipt.status}

                  </span>

                </td>

              </tr>

              <tr className="border">

                <td className="p-3 font-semibold">

                  Payment Date

                </td>

                <td className="p-3">

                  {new Date(receipt.paymentDate).toLocaleString()}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Buttons */}

        <div className="flex justify-center gap-5 mt-10">

          <button
            onClick={printReceipt}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl"
          >

            Print Receipt

          </button>

          <button
            className="bg-green-600 text-white px-8 py-3 rounded-xl"
          >

            Download PDF

          </button>

        </div>

      </div>

    </div>

  );

}