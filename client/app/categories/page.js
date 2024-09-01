import React from "react";
import SearchFilter from "./SearchFilter";
import ItemDisplay from "./ItemDisplay";

const Categories = [
    { id: 1, name: 'Electronics', image: '/favicon.ico', link: '/categories/electronics' },
    { id: 2, name: 'Fashion', image: '/favicon.ico', link: '/categories/fashion' },
    { id: 3, name: 'Home', image: '/favicon.ico', link: '/categories/home' },
    { id: 4, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    { id: 5, name: 'Toys', image: '/favicon.ico', link: '/categories/toys' },
    { id: 6, name: 'Beauty', image: '/favicon.ico', link: '/categories/beauty' },
    { id: 7, name: 'Sports', image: '/favicon.ico', link: '/categories/sports' },
    { id: 8, name: 'Automotive', image: '/favicon.ico', link: '/categories/automotive' },
    // Add more categories as needed
];

export default function categories() {
    return (
        <>
            <SearchFilter Categories={Categories} />
            <ItemDisplay />
        </>
    );
}