"use client";

import React from "react";
import { FaUser, FaStore, FaChartLine, FaBoxOpen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import AreaChart from "../charts/AreaChart";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import DonutChart from "../charts/DonutCharts";
import MetricCard from "../ui/MetricCard";
import { CiDollar } from "react-icons/ci";

interface Seller {
    username: string;
    storeName: string;
    status: string;
    totalProducts: number;
    totalRevenue: number;
}

interface ChartData {
    data: number[];
    labels: string[];
}

interface CheckSellerReportProps {
    seller: Seller;
    onClose: () => void;
    chartData: ChartData;
}

const CheckSellerReport: React.FC<CheckSellerReportProps> = ({ seller, onClose, chartData }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-md z-50 ml-[16rem]">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mx-4 relative w-[90%] md:w-[70%]">
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-600 cursor-pointer">
                    <AiOutlineClose size={24} />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800">Sellers Performance</h1>
                <p className="text-base text-gray-600 mt-2">
                    🌟 Dive into the performance metrics of <span className="text-gray-900 font-semibold">{seller.username}</span>.
                </p>

                {/* Seller Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <MetricCard
                        icon={<CiDollar className="text-gray-800" />}
                        title="Total Revenue"
                        value={`₹${seller.totalRevenue.toLocaleString()}`}
                    />
                    <MetricCard
                        icon={<FaBoxOpen className="text-gray-800" />}
                        title="Total Products"
                        value={`${seller.totalProducts}`}
                    />
                    <MetricCard
                        icon={<FaStore className="text-gray-800" />}
                        title="Store Name"
                        value={seller.storeName}
                    />
                </div>

                {/* SELLER CHARTS */}
                <div className="shadow-md mt-6 p-3 bg-white rounded-lg w-fit mx-auto">
                    <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">
                        Revenue Breakdown
                    </h3>
                    <div className="w-[300px] h-[150px] flex items-center justify-center">
                        <DonutChart data={chartData.data} labels={chartData.labels} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckSellerReport;
