"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface OrderComplainProps {
  complaint: {
    productId: string;
    productImage: string;
    subject: string;
    customerName: string;
    complaintDetails: string;
    date: string;
    status: string;
  };
  onClose: () => void;
}

const Order_Complain: React.FC<OrderComplainProps> = ({ complaint, onClose }) => {
  const [status, setStatus] = useState(complaint.status);

  const handleMarkProcessing = () => {
    setStatus("In Progress");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-md z-50 ml-[16rem]">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 relative w-full max-w-3xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer">
          <AiOutlineClose size={24} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">Complaint Details</h1>
        <p className="text-sm text-gray-500 mt-1">Complaint Date: {complaint.date}</p>

        {/* Product Section */}
        <div className="grid grid-cols-12 gap-4 mt-6">
          <div className="col-span-3">
            <img
              src={complaint.productImage}
              alt="Product"
              className="w-32 h-32 object-cover rounded-md shadow border"
            />
          </div>
          <div className="col-span-9 flex flex-col justify-center">
            <p className="text-lg font-semibold text-gray-900">{complaint.subject}</p>
            <p className="text-sm text-gray-600">Product ID: <span className="font-medium">{complaint.productId}</span></p>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-800">
            <span className="font-semibold">{complaint.customerName}</span> reported:
          </p>
          <p className="text-gray-700 mt-3 border-l-4 border-r-4 w-[30rem] border-blue-300 rounded-lg pl-4">{complaint.complaintDetails}</p>
        </div>

        {/* Status Section */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Current Status: <span className="bg-blue-200 text-blue-500 px-4 py-2 rounded-full">{status}</span>
          </p>

          {/* Action Buttons */}
          <button
            className="bg-blue-200 text-blue-500 px-4 py-2 rounded-full transition cursor-pointer"
            onClick={handleMarkProcessing}
          >
            Mark as Processing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order_Complain;
