import React from "react";

const categories = [
    { id: 1, name: 'Electronics', image: '/favicon.ico', link: '/categories/electronics' },
    { id: 2, name: 'Fashion', image: '/favicon.ico', link: '/categories/fashion' },
    { id: 3, name: 'Home', image: '/favicon.ico', link: '/categories/home' },
    { id: 4, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    { id: 5, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    { id: 6, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    { id: 7, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    { id: 8, name: 'Books', image: '/favicon.ico', link: '/categories/books' },
    
    // Add more categories as needed
];

const CategoryItem = ({ name, image, link }) => (
    <a href={link} className="flex flex-col items-center">
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center mb-2 bg-indigo-200">
            <img src={image} alt={name} className="w-9/12" />
        </div>
        <p className="text-center text-sm">{name}</p>
    </a>
);

const Categories = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
        {categories.map(category => (
            <CategoryItem key={category.id} name={category.name} image={category.image} link={category.link} />
        ))}
    </div>
);
export default Categories