"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  MdDashboard, MdPeople, MdStore, MdInventory, MdShoppingCart,
  MdPayments, MdLocalOffer, MdSupport, MdSettings, MdOutlineAnalytics,
  MdOutlinePeople, MdOutlineShoppingCart, MdOutlineCategory, MdOutlineReport,
  MdOutlineLocalOffer, MdOutlineSettings, MdOutlineGavel, MdOutlineAttachMoney
} from "react-icons/md";
import { useAuth } from "../context-apis/authentication/AuthProvider";
import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const menuItems = [
    {
      title: "Dashboard", icon: <MdDashboard />, links: [
        { name: "Overview", icon: <MdOutlineAnalytics />, path: "/" },
        { name: "Analytics & Reports", icon: <MdOutlineReport /> },
        { name: "Top-Selling Products", icon: <MdOutlineShoppingCart /> }
      ]
    },

    {
      title: "Users Management", icon: <MdPeople />, links: [
        { name: "All Users", icon: <MdOutlinePeople /> },
        { name: "Vendors & Sellers", icon: <MdStore /> },
        { name: "Customers", icon: <MdOutlineShoppingCart /> },
        { name: "Banned Users", icon: <MdOutlineGavel /> }
      ]
    },

    {
      title: "Sellers Management", icon: <MdStore />, links: [
        { name: "Seller Applications", icon: <MdOutlinePeople /> },
        { name: "Approved Sellers", icon: <MdStore /> },
        { name: "Rejected Sellers", icon: <MdOutlineGavel /> },
        { name: "Seller Performance", icon: <MdOutlineReport /> }
      ]
    },

    {
      title: "Products Moderation", icon: <MdInventory />, links: [
        { name: "All Products", icon: <MdOutlineCategory /> },
        { name: "Approved Products", icon: <MdStore /> },
        { name: "Reported Products", icon: <MdOutlineReport /> },
        { name: "Rejected Listings", icon: <MdOutlineGavel /> },
        // { name: "Search & Filter Products", icon: <MdOutlineSettings /> }
      ]
    },

    {
      title: "Orders & Transactions", icon: <MdShoppingCart />, links: [
        { name: "All Orders", icon: <MdOutlineShoppingCart /> },
        { name: "Pending Orders", icon: <MdOutlineReport /> },
        { name: "Completed Orders", icon: <MdOutlineAttachMoney /> },
        { name: "Cancelled Orders", icon: <MdOutlineGavel /> },
        { name: "Payment Transactions", icon: <MdPayments /> }
      ]
    },

    {
      title: "Platform Fees & Settings", icon: <MdPayments />, links: [
        { name: "Set Commission Rates", icon: <MdOutlineAttachMoney /> },
        { name: "Payment Gateways", icon: <MdPayments /> },
        { name: "Taxes & Shipping Rules", icon: <MdOutlineSettings /> }
      ]
    },

    {
      title: "Promotions & Discounts", icon: <MdLocalOffer />, links: [
        { name: "Discount Coupons", icon: <MdOutlineLocalOffer /> },
        { name: "Featured Products", icon: <MdOutlineShoppingCart /> },
        // { name: "Flash Sales", icon: <MdOutlineReport /> }
      ]
    },

    {
      title: "Support & Reports", icon: <MdSupport />, links: [
        { name: "Customer Complaints", icon: <MdOutlineReport /> },
        { name: "Fraudulent Sellers", icon: <MdOutlineGavel /> },
        { name: "Performance Reports", icon: <MdOutlineAnalytics /> }
      ]
    },

    {
      title: "General Settings", icon: <MdSettings />, links: [
        { name: "Website Configurations", icon: <MdOutlineSettings /> },
        { name: "Manage Categories", icon: <MdOutlineCategory /> },
        { name: "Localization", icon: <MdOutlineSettings /> }
      ]
    }
  ];

  return (
    isAuthenticated && (
      <aside className="w-64 bg-white shadow-md fixed left-0 top-0 h-screen p-4 flex flex-col">
        <div className="text-xl font-semibold text-gray-800 h-16">
          <Image className="ml-5" src='/assets/nest-control_logo.png' height={150} width={150} alt="nest control admin"/>
        </div>

        <hr className="w-[16.3rem] -ml-5 text-gray-200 mb-5"/>

        {/* Scrollable Content */}
        <nav className="flex-1 overflow-y-auto pr-2">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              {/* Section Title */}
              <div className="flex items-center space-x-2 text-gray-700 font-semibold text-md mb-1">
                {section.icon}
                <span>{section.title}</span>
              </div>

              {/* Sub-links */}
              <ul className="mb-4">
                {section.links.map((link, subIdx) => {
                  const linkPath = link.path || `/${link.name.toLowerCase().replace(/\s+/g, "-")}`;
                  const isActive = pathname === linkPath;
                  return (
                    <li key={subIdx}>
                      <Link
                        href={linkPath}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition 
                          ${isActive ? "bg-sky-200 bg-opacity-50 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:bg-opacity-50"}
                        `}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <hr className="w-[16.3rem] -ml-5 text-gray-200 mt-5"/>

        <div className="p-4 text-gray-600 text-sm">
          © 2025 NestControl. All Rights Reserved.
        </div>
      </aside>
    )
  );
};

export default Sidebar;
