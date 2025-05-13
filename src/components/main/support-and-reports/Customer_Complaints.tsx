"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import Order_Complain from "@/components/modals-and-popups/Order_Complain";

type Complaint = {
  id: number;
  productId: string;
  productImage: string;
  subject: string;
  customerName: string;
  complaintDetails: string;
  date: string;
  status: string;
};

const complaints: Complaint[] = [
  {
    id: 1,
    productId: "P1001",
    productImage: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg",
    subject: "Damaged Product",
    customerName: "John Doe",
    complaintDetails: "The product was broken upon arrival.",
    date: "2024-03-20",
    status: "Pending",
  },
  {
    id: 2,
    productId: "P1002",
    productImage: "https://m.media-amazon.com/images/I/610hP7tPlOL._SX679_.jpg",
    subject: "Wrong Item Received",
    customerName: "Jane Smith",
    complaintDetails: "Received a different item than ordered.",
    date: "2024-03-21",
    status: "Pending",
  },
  {
    id: 3,
    productId: "P1003",
    productImage: "https://m.media-amazon.com/images/I/51i6EbpulvL._SY741_.jpg",
    subject: "Delayed Shipping",
    customerName: "Michael Johnson",
    complaintDetails: "The product was delivered two weeks late.",
    date: "2024-03-22",
    status: "In Progress",
  },
];

const Customer_Complaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const columns: ColumnDef<Complaint>[] = [
    { accessorKey: "productId", header: "Product ID", cell: (info) => String(info.getValue()) },
    { accessorKey: "subject", header: "Subject", cell: (info) => <span className="font-semibold">{String(info.getValue())}</span> },
    { accessorKey: "customerName", header: "Customer Name", cell: (info) => String(info.getValue()) },
    { accessorKey: "date", header: "Date", cell: (info) => String(info.getValue()) },
    { accessorKey: "status", header: "Status", cell: (info) => <span className="bg-blue-100 text-blue-700 text-sm py-1 px-5 rounded-full whitespace-nowrap cursor-pointer">{String(info.getValue())}</span> },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <button
          className="bg-blue-200 text-blue-500 px-4 py-2 rounded-full whitespacebg-blue-100 text-blue-700 text-sm py-1 px-5 rounded-full whitespace-nowrap cursor-pointer"
          onClick={() => setSelectedComplaint(info.row.original)}
        >
          View Complaint
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-2 mx-4">
   
        <h1 className="text-3xl font-semibold text-gray-800">Customer Complaints</h1>
        <p className="text-base text-gray-600 mt-2">Check all complaints submitted by customers</p>

        <div className="mt-6 max-w-[70rem]">
          <ReusableTable columns={columns} data={complaints} perpage={4} />
        </div>

      {selectedComplaint && (
        <Order_Complain complaint={selectedComplaint} onClose={() => setSelectedComplaint(null)} />
      )}
      </div>
  );
};

export default Customer_Complaints;
