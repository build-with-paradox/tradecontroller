import React, { useState, useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineUserGroup, HiOutlineTruck, HiOutlineCheckCircle } from "react-icons/hi2";
import { PiStorefrontThin } from "react-icons/pi";
import MetricCard from "@/components/ui/MetricCard";
import DonutChart from "@/components/charts/DonutCharts";
import AreaChart from "@/components/charts/AreaChart";
import RecentTransactions from "./RecentTransactions";

// Define FilterType for different time filters
type FilterType = "today" | "last7days" | "weekly" | "monthly" | "yearly";

// Component for Analytics and Reports
const AnalyticsandReports: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>("monthly");

    // Metrics data with trend percentage added
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

    // Function to update charts and metrics based on the filter
    const getChartAndMetricsData = (filter: FilterType) => {
        // Logic to update chart data based on filter
        const data = {
            chartData: chartData[filter],
            chartLabels: chartLabels[filter],
            previousData: previousData[filter]
        };

        return data;
    };

    const [chart, setChart] = useState({ data: chartData[filter], labels: chartLabels[filter], previousData: previousData[filter] });

    // Update the chart and metrics when filter changes
    useEffect(() => {
        const { chartData, chartLabels, previousData } = getChartAndMetricsData(filter);
        setChart({ data: chartData, labels: chartLabels, previousData });
    }, [filter]);

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-2">
            <h1 className="text-2xl font-semibold text-gray-800">Analytics and Reports</h1>
            <p className="text-base text-gray-600 mt-2">
                📊 Detailed analytics and in-depth reports for platform performance and activity. Use the filters to dive deeper into trends and insights.
            </p>

            {/* Filter Dropdown for Analytics */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-800">Performance Metrics</div>
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

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                <MetricCard
                    icon={<CiDollar className="text-gray-800" />}
                    title="Total Revenue"
                    value="$10,500,000"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[0], chart.previousData[0])}
                />
                <MetricCard
                    icon={<GiShoppingCart className="text-gray-800" />}
                    title="Total Orders"
                    value="30,200"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[1], chart.previousData[1])}
                />
                <MetricCard
                    icon={<HiOutlineUserGroup className="text-gray-800" />}
                    title="Total Customers"
                    value="15,800"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[2], chart.previousData[2])}
                />
                <MetricCard
                    icon={<PiStorefrontThin className="text-gray-800" />}
                    title="Total Sellers"
                    value="1,250"
                    trend="down"
                    trendPercentage={calculateTrendPercentage(chart.data[3], chart.previousData[3])}
                />
                <MetricCard
                    icon={<FaBoxOpen className="text-gray-800" />}
                    title="Active Products"
                    value="5,300"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[4], chart.previousData[4])}
                />
                <MetricCard
                    icon={<GiShoppingCart className="text-gray-800" />}
                    title="Pending Orders"
                    value="1,200"
                    trend="down"
                    trendPercentage={calculateTrendPercentage(chart.data[5], chart.previousData[5])}
                />
                <MetricCard
                    icon={<HiOutlineTruck className="text-gray-800" />}
                    title="Shipped Orders"
                    value="25,000"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[6], chart.previousData[6])}
                />
                <MetricCard
                    icon={<HiOutlineCheckCircle className="text-gray-800" />}
                    title="Delivered"
                    value="28,000"
                    trend="up"
                    trendPercentage={calculateTrendPercentage(chart.data[7], chart.previousData[7])}
                />
            </div>

            {/* Orders Overview Chart */}
            <div className="orders-chart mt-6 lg:col-span-1 flex flex-col items-center justify-center shadow-md rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4 mt-3">Orders Overview</h3>
                <DonutChart
                    data={chart.data} // Ensure data is updated dynamically
                    labels={["Completed Orders", "Pending Orders", "Cancelled Orders", "Shipped"]}
                />
            </div>

            {/* Activity and Trend Analysis */}
            <div className="flex mt-6">
                <div className="w-[50%] shadow-md rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="text-lg text-zinc-200 border border-gray-500 w-7 h-7 flex items-center justify-center rounded-md">
                                <HiOutlineUserGroup color="gray" />
                            </div>
                            <h1 className="ml-2 font-bold text-gray-800">Customer Activity</h1>
                        </div>
                    </div>

                    {/* Activity Chart */}
                    <AreaChart data={chart.data} labels={chart.labels} />
                </div>

                {/* Recent Transactions */}
                <div className="w-[50%] ml-5">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsandReports;
