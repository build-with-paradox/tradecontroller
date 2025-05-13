"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BsGraphUpArrow, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import ReusableTable from "@/components/ui/ReusableTable";

// Fake data for top-selling products with additional fields
const featuredProducts = [
  { 
    id: 1, 
    name: "AUSK Mens Hoodie", 
    sales: 1200, 
    revenue: 25000, 
    image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg",
    category: "Hoodies",
    stock: true,
    rating: 4.5,
    discount: 15,
    launchDate: "2023-06-15",
    productUrl: "https://www.amazon.com/dp/B08P4D6B4K"
  },
  { 
    id: 2, 
    name: "Jump Cuts Hooded Neck T-Shirts", 
    sales: 950, 
    revenue: 18000, 
    image: "https://m.media-amazon.com/images/I/610hP7tPlOL._SX679_.jpg", 
    category: "T-Shirts", 
    stock: true, 
    rating: 4.3, 
    discount: 10, 
    launchDate: "2022-12-10", 
    productUrl: "https://www.amazon.com/dp/B09H2X2F9L"
  },
  { 
    id: 3, 
    name: "AUSK Mens Hoodie", 
    sales: 780, 
    revenue: 15000, 
    image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg", 
    category: "Hoodies", 
    stock: false, 
    rating: 4.6, 
    discount: 20, 
    launchDate: "2023-02-20", 
    productUrl: "https://www.amazon.com/dp/B07L5T7W43"
  },
  { 
    id: 4, 
    name: "Lymio Wool Hooded Neck Hoodies", 
    sales: 620, 
    revenue: 12000, 
    image: "https://m.media-amazon.com/images/I/71TzNW2FArL._SY741_.jpg", 
    category: "Hoodies", 
    stock: true, 
    rating: 4.4, 
    discount: 5, 
    launchDate: "2023-03-14", 
    productUrl: "https://www.amazon.com/dp/B09ZYKJ65Z"
  },
  { 
    id: 5, 
    name: "U.S. Polo Assn. Men's Sneaker", 
    sales: 540, 
    revenue: 11000, 
    image: "https://m.media-amazon.com/images/I/714VWJpEtqL._SY675_.jpg", 
    category: "Sneakers", 
    stock: true, 
    rating: 4.2, 
    discount: 10, 
    launchDate: "2022-11-30", 
    productUrl: "https://www.amazon.com/dp/B08C7G5XZX"
  },
];

// Define the columns for the table with the added fields
const columns: ColumnDef<typeof featuredProducts[0]>[] = [
  {
    id: "imageColumn",
    header: "Product Image",
    cell: (info) => {
      const image = info.row.original.image;
      return image ? (
        <img src={image} alt="Product" className="max-w-[5rem] max-h-[5rem] rounded-md object-cover" />
      ) : (
        <span>No Image</span>
      );
    },
  },
  {
    id: "name",
    header: "Product Name",
    cell: (info) => info.row.original.name,
  },
  {
    id: "category",
    header: "Category",
    cell: (info) => info.row.original.category,
  },

  {
    id: "stock",
    header: "Stock",
    cell: (info) => (info.row.original.stock ? "In Stock" : "Out of Stock"),
  },
  {
    id: "rating",
    header: "Rating",
    cell: (info) => {
      const rating = info.row.original.rating;
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

      return (
        <div className="flex text-yellow-500">
          {[...Array(fullStars)].map((_, i) => (
            <BsStarFill key={`full-${i}`} />
          ))}
          {halfStar && <BsStarHalf key="half" />}
          {[...Array(emptyStars)].map((_, i) => (
            <BsStar key={`empty-${i}`} className="text-gray-400" />
          ))}
        </div>
      );
    },
  },
  {
    id: "discount",
    header: "Discount",
    cell: (info) => info.row.original.discount ? `${info.row.original.discount}% Off` : "No Discount",
  },
  {
    id: "launchDate",
    header: "Launch Date",
    cell: (info) => new Date(info.row.original.launchDate).toLocaleDateString(),
  },
  {
    id: "productUrl",
    header: "Product Link",
    cell: (info) => (
        <a
        href={info.row.original.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-200 text-blue-500 px-3 py-1 rounded-full text-sm font-medium"
      >
        View
      </a>
    ),
  },
];

const Featured_Products = () => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-2 mx-4">
      <h1 className="text-2xl font-semibold text-gray-800">Featured Products</h1>
      <p className="flex text-base text-gray-600 mt-2">
        <BsGraphUpArrow color="skyblue" className="font-bold mr-2 mt-1"/> Here's a snapshot of your <span className="text-gray-900 font-semibold">Featured Products</span>. See the latest sales and revenue trends across your platform.
      </p>

      {/* Flex container for Table */}
      <div className="flex gap-6 mt-2 -mb-5">
        <div className="flex-1 max-w-full">
          <ReusableTable columns={columns} data={featuredProducts} perpage={2} />
        </div>
      </div>
    </div>
  );
};

export default Featured_Products;
