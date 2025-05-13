import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import PieChart from "@/components/charts/PieChart";

// Fake data for top-selling products
const topSellingProducts = [
  { id: 1, name: "AUSK Mens Hoodie", sales: 1200, revenue: 25000, image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg" },
  { id: 2, name: "Jump Cuts Hooded Neck T-Shirts", sales: 950, revenue: 18000, image: "https://m.media-amazon.com/images/I/610hP7tPlOL._SX679_.jpg" },
  { id: 3, name: "AUSK Mens Hoodie", sales: 780, revenue: 15000, image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg" },
  { id: 4, name: "Lymio Wool Hooded Neck Hoodies ", sales: 620, revenue: 12000, image: "https://m.media-amazon.com/images/I/71TzNW2FArL._SY741_.jpg" },
  { id: 5, name: " U.S. Polo Assn. Men's Sneaker ", sales: 540, revenue: 11000, image: "https://m.media-amazon.com/images/I/714VWJpEtqL._SY675_.jpg" },
];

// Define the columns for the table
const columns: ColumnDef<typeof topSellingProducts[0]>[] = [
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
    id: "sales",
    header: "Sales",
    cell: (info) => info.row.original.sales,
  },
  {
    id: "revenue",
    header: "Revenue",
    cell: (info) => `$${info.row.original.revenue.toLocaleString()}`,
  },
];

const TopSellingProducts = () => {
  // Prepare the chart data (Sales data for the Pie chart)
  const salesData = topSellingProducts.map((product) => product.sales);
  const productNames = topSellingProducts.map((product) => product.name);

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-2  mx-4">
      <h1 className="text-2xl font-semibold text-gray-800">Top Selling Products</h1>
      <p className="text-base text-gray-600 mt-2">
        📊 Here's a snapshot of your <span className="text-gray-900 font-semibold">Top Selling Products</span>. See the latest sales and revenue trends across your platform.
      </p>

      {/* Flex container for Table and PieChart */}
      <div className="flex gap-6 mt-6">
        {/* Reusable table displaying top-selling products */}
        <div className="flex-1 max-w-[850px]"> {/* Adjusted table width */}
          <ReusableTable columns={columns} data={topSellingProducts} perpage={2} />
        </div>

        {/* Pie chart displaying product sales */}
        <div className="flex-1 ml-16">
          <div className="shadow-sm p-4 rounded-lg w-full max-w-xs">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Distribution</h2>
            <PieChart data={salesData} labels={productNames} width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
