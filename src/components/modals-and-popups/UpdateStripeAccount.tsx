"use client";

import React, { useState, FormEvent } from 'react';

// Define the onClose prop type explicitly
interface UpdateStripeAccountPopupProps {
  onClose: () => void;
  stripeAccountNumber?: string; // Make this prop optional
}

const Spinner: React.FC = () => (
  <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-t-4 border-green-600 rounded-full" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

export const UpdateStripeAccountPopup: React.FC<UpdateStripeAccountPopupProps> = ({ onClose, stripeAccountNumber }) => {
  const [stripeAccount, setStripeAccount] = useState<string>(stripeAccountNumber || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const stripeRegex = /^acct_[a-zA-Z0-9]{17}$/; // Valid Stripe account ID regex

    // Validate the Stripe account number
    if (!stripeAccount || !stripeRegex.test(stripeAccount)) {
      setError('Please enter a valid Stripe account ID.');
      setLoading(false);
      return;
    }

    console.log('Updating Stripe Account:', stripeAccount);
    
    try {
      // Simulating network delay with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      onClose(); // Close the popup after success
    } catch (error) {
      setError('Failed to update account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 ml-[16rem]">
      <div className=" bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Stripe Account</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="stripeAccount" className="block text-sm font-medium text-gray-800">
              Stripe Account
            </label>
            <input
              type="text"
              id="stripeAccount"
              placeholder="acct_1I6O5dG6qB5Q2W"
              value={stripeAccount}
              onChange={(e) => setStripeAccount(e.target.value)}
              className="w-full mt-1 bg-transparent text-blue-500 border border-slate-400 rounded-lg py-2 px-4 outline-none focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-red-200 text-red-500 cursor-pointer rounded-full px-4 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-200 text-blue-500 cursor-pointer rounded-full px-4 py-2 flex items-center justify-center  transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading && <Spinner />}
              {!loading && 'Update Account'}
              {loading && <span className="ml-2">Updating...</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
