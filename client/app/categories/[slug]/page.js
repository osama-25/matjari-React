'use client';
import React, { useEffect, useRef, useState } from "react";
import SearchFilter from "../SearchFilter";
import ItemDisplay from "../ItemDisplay";

const FCategories = [
    { id: 1, name: 'Men Fashiom', image: '/favicon.ico', link: '/electronics' },
    { id: 2, name: 'Women Fashion', image: '/favicon.ico', link: '/fashion' },
    { id: 3, name: 'Children Fashion', image: '/favicon.ico', link: '/home' },
];

const ECategories = [
    { id: 1, name: 'Mobiles', image: '/favicon.ico', link: '/electronics' },
    { id: 2, name: 'Tablets', image: '/favicon.ico', link: '/fashion' },
    { id: 3, name: 'Tv', image: '/favicon.ico', link: '/home' },
    { id: 4, name: 'Chargers', image: '/favicon.ico', link: '/books' },
];


export default function SubCateg({ params }){
    const SubCategories = params.slug == 'electronics'? ECategories: FCategories;
    const [isPressed, setIsPressed] = useState(false);
    const searchFilterRef = useRef(null);

    const toggleOverlay = () => {
        setIsPressed(!isPressed);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchFilterRef.current && !searchFilterRef.current.contains(event.target)) {
                setIsPressed(false);
            }
        };

        if (isPressed) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPressed]);

    return(
        <>
            <div ref={searchFilterRef} className={`${isPressed? 'block': 'hidden'} w-2/4 absolute md:relative md:block md:w-1/4 block p-4 border-r border-gray-200 bg-white z-10`}>
                <SearchFilter Categories={SubCategories} Visible={isPressed} />
            </div>
            <ItemDisplay Visible={isPressed} onPress={toggleOverlay} />
        </>
    );
}