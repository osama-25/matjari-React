'use client';
import { useState } from 'react';
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa';

const images = [
    '/Resources/8.jpg',
    '/Resources/5.jpg',
    '/Resources/4.jpg',
    '/Resources/0.jpeg',
];

const ProductPage = ({ params }) => {
    // State for the main product image
    const [mainImage, setMainImage] = useState(images[0]); // default to the first image
    const [Heart, setHeart] = useState(0);

    return (
        <div className="flex justify-center p-8 bg-gray-100">
            <div className="flex max-w-6xl bg-white p-8 rounded-lg gap-x-16">
                {/* Product Image */}
                <div className="w-1/2">
                    <div className="w-full h-80 flex justify-center">
                        <img src={mainImage} alt="Product" className="w-fit rounded-lg" />
                    </div>
                    <div className="flex justify-between mt-4">
                        {images.map((image, index) => (
                            <div className="w-20 h-20 cursor-pointer" onClick={() => setMainImage(image)}>
                                <img src={image} className="w-full h-full object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-1/2 ml-8 flex flex-col">
                    <h1 className="text-3xl font-bold">Trendy Armchair</h1>
                    <p className="text-2xl font-semibold mt-4">$580</p>
                    <p className="mt-4 text-gray-600">
                        Check out the Corlett velvet sofa, which adds a fresh, modern twist
                        to the classic style. Rich velvet upholstery, a unique tufted design
                        of roll arms.
                    </p>

                    {/* Buttons */}
                    <div className="flex mt-6 justify-between h-full items-end">
                        <button className="h-16 w-28 flex flex-row items-center justify-center gap-2 bg-gray-800 text-white text-lg rounded-md hover:bg-gray-700">
                            <FaComment />
                            <span className="text-lg font-bold">Chat</span>
                        </button>
                        <button onClick={() => setHeart(!Heart)} className="h-16 w-20 flex flex-row items-center justify-center bg-white text-red-500 hover:bg-gray-100 rounded-md shadow-lg">
                            {Heart ? <FaHeart size={24} color={'crimson'} /> : <FaRegHeart size={26} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
