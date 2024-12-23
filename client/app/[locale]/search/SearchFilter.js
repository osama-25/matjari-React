'use client';
import React, { useState } from "react";
import { FaFilter, FaXmark } from "react-icons/fa6";

const SearchFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={toggleFilter}
                className="absolute top-6 left-6 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition md:hidden z-50"
            >
                <FaFilter size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleFilter}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                ></div>
            )}
            <div className={`fixed inset-y-0 left-0 bg-white md:bg-transparent flex flex-col p-6 w-full max-w-sm transform transition-transform duration-300 z-50 md:relative md:transform-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
                    <button
                        onClick={toggleFilter}
                        className="text-black md:hidden"
                    >
                        <FaXmark size={24} />
                    </button>
                </div>
                {/* Price Range */}
                <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">Price Range</h4>
                    <div className="flex flex-col gap-4">
                        <label className="flex items-center">
                            <span className="w-24 text-gray-600">Min Price:</span>
                            <input
                                type="number"
                                name="min"
                                className="ml-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="0"
                            />
                        </label>
                        <label className="flex items-center">
                            <span className="w-24 text-gray-600">Max Price:</span>
                            <input
                                type="number"
                                name="max"
                                className="ml-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="1000"
                            />
                        </label>
                    </div>
                </div>

                {/* City */}
                <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">Location</h4>
                    <select
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        <option value="">Select a city</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                    </select>
                </div>

                {/* Delivery */}
                <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">Delivery</h4>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="delivery"
                                value="yes"
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="delivery"
                                value="no"
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Condition */}
                <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">Condition</h4>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="condition"
                                value="new"
                                className="mr-2"
                            />
                            New
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="condition"
                                value="used"
                                className="mr-2"
                            />
                            Used
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
