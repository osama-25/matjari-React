import React from "react";
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
    return(
        <>
            <SearchFilter Categories={SubCategories}/>
            <ItemDisplay />
        </>
    );
}