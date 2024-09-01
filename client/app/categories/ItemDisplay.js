import React from "react";
import { Item } from "../Item";

const items = [
    { id: 1, name: 'Electronics', image: '/favicon.ico', link: '/electronics' },
    { id: 2, name: 'Fashion', image: '/favicon.ico', link: '/fashion' },
    { id: 3, name: 'Home', image: '/favicon.ico', link: '/home' },
    { id: 4, name: 'Books', image: '/favicon.ico', link: '/books' },
];

const ItemDisplay = () => {
    return (
        <div className="flex flex-col overflow-x-auto px-6 py-2 w-full">
            <span className="flex justify-between items-center">
                <h1 className="text-3xl font-bold p-2 inline">Results</h1>
                <select className="p-2 border border-gray-300 rounded h-fit">
                    <option value="">Featured</option>
                    <option value="new-york">Price: Low to high</option>
                    <option value="los-angeles">Price: high to low</option>
                    <option value="chicago">Most Recent</option>
                </select>
            </span>
            <div className="flex flex-col gap-y-5">
                {items.map(item => (
                    <Item 
                        key={item.id} name={item.name} image={item.image}
                        link={item.link} price={'$$$'} chatlink={'/chats'}
                        desc={'oewnvonwovnoewnvownveyyubybuw'} heart={false}
                    />
                ))}
            </div>
        </div>
    );
}
export default ItemDisplay