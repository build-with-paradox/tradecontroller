"use client";

import React, { useState } from "react";

const Taxes_ShippingRules = () => {
  // State to manage rules
  const [taxRules, setTaxRules] = useState([
    {
      id: 1,
      category: "All Products",
      rate: "15%",
      description:
        "A standard tax rate of 15% will be applied to all products unless otherwise specified.",
    },
    {
      id: 2,
      category: "Electronics",
      rate: "18%",
      description:
        "Electronics products will incur an 18% tax rate due to government policy.",
    },
    {
      id: 3,
      category: "Clothing",
      rate: "12%",
      description:
        "Clothing items are taxed at a reduced rate of 12% due to specific tax exemptions.",
    },
    {
      id: 4,
      category: "Groceries, Books",
      rate: "0%",
      description:
        "Essential items like groceries and books are exempt from taxes.",
    },
  ]);

  const [shippingRules, setShippingRules] = useState([
    {
      id: 1,
      condition: "Order total > $100",
      charge: "$0 (Free Shipping)",
      description: "Orders above $100 are eligible for free shipping.",
    },
    {
      id: 2,
      condition: "All Orders",
      charge: "$10",
      description:
        "All orders under $100 will incur a flat shipping fee of $10.",
    },
    {
      id: 3,
      condition: "Local deliveries within the same city",
      charge: "$0 (Free Shipping)",
      description:
        "Orders that are shipped locally within the same city will receive free shipping.",
    },
    {
      id: 4,
      condition: "International Orders",
      charge: "Based on weight and destination",
      description:
        "Shipping charges for international orders will be calculated based on the weight of the items and the delivery location.",
    },
  ]);

  return (
    <>
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 mt-6 mx-auto max-w-4xl ml-16">
        <h1 className="text-3xl font-semibold text-gray-800">Taxes and Shipping Rules</h1>
        <p className="text-base text-gray-600 mt-2">
          Define the tax and shipping rules for your platform to ensure compliance and optimal shipping strategies.
        </p>

        {/* Tax Rules */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Tax Rules</h2>
          {taxRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{rule.category}</span>
                <span className="text-lg text-gray-600">{rule.rate} Tax Rate</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{rule.description}</p>
            </div>
          ))}
        </div>

        {/* Shipping Rules */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Shipping Rules</h2>
          {shippingRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{rule.condition}</span>
                <span className="text-lg text-gray-600">{rule.charge}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Taxes_ShippingRules;
