"use client";

import React, { useState } from "react";

// Helper function to generate random discount code
const generateDiscountCode = (value: number): string => {
  // Create a unique code with "TRADE-NEST-" and a random number
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TRADE-NEST-${value}-${randomCode}`;
};

const Discount_Coupons = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [discountValue, setDiscountValue] = useState(10); // Default discount value
  const [couponCount, setCouponCount] = useState(1); // Default to 1 coupon

  const handleGenerateCoupons = () => {
    const newCoupons = [];

    for (let i = 0; i < couponCount; i++) {
      const code = generateDiscountCode(discountValue);
      newCoupons.push({
        code,
        value: `${discountValue}%`,
        expiration: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
      });
    }

    setCoupons(newCoupons);
  };

  return (
    <div className="flex justify-center items-center ml-24 min-h-screen">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-6 mx-auto max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-gray-800">Discount Coupons</h1>
        <p className="text-base text-gray-600 mt-2">
          Generate discount coupons for your users with customizable values and expiration dates.
        </p>

        {/* Coupon generation form */}
        <div className="mt-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">Discount Value (%)</label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                min={1}
                max={100}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">Number of Coupons</label>
              <input
                type="number"
                value={couponCount}
                onChange={(e) => setCouponCount(Number(e.target.value))}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                min={1}
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCoupons}
            className="mt-4 py-2 px-4 cursor-pointer bg-blue-200 text-blue-600 rounded-full shadow transition-colors duration-200"
          >
            Generate Coupons
          </button>
        </div>

        {/* Display generated coupons */}
        {coupons.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Generated Coupons</h2>
            <div className="mt-4">
              {coupons.map((coupon, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Coupon Code: {coupon.code}</span>
                    <span className="text-lg text-gray-600">{coupon.value} Discount</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Expiration: {coupon.expiration.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discount_Coupons;
