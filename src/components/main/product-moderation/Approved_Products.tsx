import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FiSearch, FiFilter } from "react-icons/fi";
import ReusableTable from "@/components/ui/ReusableTable";

// Fake data for top-selling products
const products = [
  {
    id: 1,
    name: "AUSK Mens Hoodie",
    brand: "AUSK",
    category: "Hoodie",
    sales: 1200,
    revenue: 25000,
    image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg",
    status: "pending", // added status to track approval
  },
  {
    id: 2,
    name: "Jump Cuts Hooded Neck T-Shirts",
    brand: "Jump Cuts",
    category: "T-Shirt",
    sales: 950,
    revenue: 18000,
    image: "https://m.media-amazon.com/images/I/610hP7tPlOL._SX679_.jpg",
    status: "pending", // added status to track approval
  },
  // More products here...
];


  const handleDisapprove = (id: number) => {
    // Find the product and update its status to "disapproved"
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, status: "disapproved" } : product
    );
    console.log("Disapproved Product:", updatedProducts);
  };


// Define the columns for the table
const columns: ColumnDef<typeof products[0]>[] = [
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
  { id: "name", header: "Product Name", cell: (info) => info.row.original.name },
  { id: "brand", header: "Brand", cell: (info) => info.row.original.brand },
  { id: "category", header: "Category", cell: (info) => info.row.original.category },
  { id: "sales", header: "Sales", cell: (info) => info.row.original.sales },
  { id: "revenue", header: "Revenue", cell: (info) => `₹${info.row.original.revenue.toLocaleString()}` },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const { status, id } = info.row.original;
      return (
        <button
            className="bg-red-100 text-red-700 cursor-pointer py-2 px-4 rounded-full"
            onClick={() => handleDisapprove(id)}
          >
            Disapprove
          </button>
      );
    },
  },
];

const Approved_Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ) &&
      (filterCategory === "" || product.category === filterCategory)
  );


  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg pl-3 pr-3  mt-3 ml-5 mx-4">
      <h1 className="text-2xl font-semibold text-gray-800 ml-3 mt-3">Approved Products</h1>
      <p className="text-base text-gray-600 mt-2 ml-3">
        📊 Here's a snapshot of your <span className="text-gray-900 font-semibold">All Products</span> on your Platform.
      </p>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* Search Box */}
        <div className="mt-5 flex w-full">
          <input
            type="text"
            placeholder="🔍 Search by product name..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-auto mt-5">
          <FiFilter className="absolute left-3 top-3 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full pl-10 pr-16 py-2 border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 max-w-full ">
        <ReusableTable columns={columns} data={filteredProducts} perpage={2} />
      </div>
    </div>
  );
};

export default Approved_Products;
