"use client";

import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineUserGroup, HiOutlineTruck, HiOutlineCheckCircle } from "react-icons/hi2";
import { PiStorefrontThin } from "react-icons/pi";
import MetricCard from "@/components/ui/MetricCard";
import NotificationBar from "@/components/ui/NotificationBar";
import DonutChart from "@/components/charts/DonutCharts";
import AreaChart from "@/components/charts/AreaChart";
import RecentTransactions from "./RecentTransactions";

type FilterType = "today" | "last7days" | "weekly" | "monthly" | "yearly";

const Overview: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>("monthly");

    // Sample data based on filters
    const chartData: Record<FilterType, number[]> = {
        today: [50, 60, 40, 80, 30, 90, 100],
        last7days: [200, 300, 250, 400, 350, 370, 390],
        weekly: [300, 450, 380, 500, 550, 600, 620],
        monthly: [1500, 2000, 1800, 2500, 3000, 2800, 3100],
        yearly: [12000, 15000, 14000, 16000, 18000, 17000, 19000],
    };

    // Previous value data (for trend calculation)
    const previousData: Record<FilterType, number[]> = {
        today: [45, 55, 35, 75, 25, 85, 95],
        last7days: [180, 270, 220, 350, 300, 320, 340],
        weekly: [290, 440, 370, 480, 530, 580, 600],
        monthly: [1400, 1900, 1700, 2400, 2900, 2700, 3000],
        yearly: [11000, 14000, 13000, 15000, 17000, 16000, 18000],
    };

    const chartLabels: Record<FilterType, string[]> = {
        today: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "11 PM"],
        last7days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
        monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        yearly: ["2019", "2020", "2021", "2022", "2023", "2024"],
    };

    // Calculate trend percentage
    const calculateTrendPercentage = (currentValue: number, previousValue: number): number => {
        if (previousValue === 0 || isNaN(currentValue) || isNaN(previousValue)) {
            return 0; // Return 0% if previousValue is 0 or either value is NaN
        }
        return parseFloat(((currentValue - previousValue) / previousValue * 100).toFixed(2));
    };
    
    

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-2">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-base text-gray-600 mt-2">
                🚀 Welcome back, <span className="text-gray-900 font-semibold">Admin!</span> Here’s an overview of your platform’s activity and metrics.
            </p>

            {/* Notification Bar */}
            <div className="mt-8">
                <NotificationBar />
            </div>

            <div className="flex">
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <MetricCard
                        icon={<CiDollar className="text-gray-800" />}
                        title="Total Revenue"
                        value="$10,500,000"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[0], previousData.monthly[0])}
                    />
                    <MetricCard
                        icon={<GiShoppingCart className="text-gray-800" />}
                        title="Total Orders"
                        value="30,200"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[1], previousData.monthly[1])}
                    />
                    <MetricCard
                        icon={<HiOutlineUserGroup className="text-gray-800" />}
                        title="Total Customers"
                        value="15,800"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[2], previousData.monthly[2])}
                    />
                    <MetricCard
                        icon={<PiStorefrontThin className="text-gray-800" />}
                        title="Total Sellers"
                        value="1,250"
                        trend="down"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[3], previousData.monthly[3])}
                    />
                    <MetricCard
                        icon={<FaBoxOpen className="text-gray-800" />}
                        title="Active Products"
                        value="5,300"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[4], previousData.monthly[4])}
                    />
                    <MetricCard
                        icon={<GiShoppingCart className="text-gray-800" />}
                        title="Pending Orders"
                        value="1,200"
                        trend="down"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[5], previousData.monthly[5])}
                    />
                    <MetricCard
                        icon={<HiOutlineTruck className="text-gray-800" />}
                        title="Shipped Orders"
                        value="25,000"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[6], previousData.monthly[6])}
                    />
                    <MetricCard
                        icon={<HiOutlineCheckCircle className="text-gray-800" />}
                        title="Delivered"
                        value="28,000"
                        trend="up"
                        trendPercentage={calculateTrendPercentage(chartData.monthly[7], previousData.monthly[7])}
                    />
                </div>

                {/* Donut Chart for Orders */}
                <div className="orders-chart mt-3 lg:col-span-1 flex flex-col items-center justify-center shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 text-center mb-4 mt-3 -mb-5">Orders Overview</h3>
                    <DonutChart data={[50, 30, 10, 10]} labels={["Completed Orders", "Pending Orders", "Cancelled Orders", "Shipped"]} />
                </div>
            </div>

            {/* Customer Activity and Recent Transactions */}
            <div className="flex mt-6">
                {/* Customer Activity Chart */}
                <div className="w-[50%] shadow-md rounded-xl p-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="text-lg text-zinc-200 border border-gray-500 w-7 h-7 flex items-center justify-center rounded-md">
                                <HiOutlineUserGroup color="gray" />
                            </div>
                            <h1 className="ml-2 font-bold text-gray-800">Customer Activity</h1>
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <IoFilterOutline className="absolute left-3 top-2 text-gray-500" />
                            <select
                                className="bg-gray-100 border bg-white border-gray-300 rounded-md pl-10 pr-3 py-1 text-sm focus:outline-none appearance-none cursor-pointer"
                                value={filter}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    setFilter(e.target.value as FilterType)
                                }
                            >
                                <option value="today">Today</option>
                                <option value="last7days">Last 7 Days</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>

                    </div>

                    {/* Area Chart */}
                    <AreaChart data={chartData[filter]} labels={chartLabels[filter]} />
                </div>

                {/* Recent Transactions */}
                <div className="w-[50%] ml-5">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
};

export default Overview;
