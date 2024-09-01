'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";

export const HomeItem = ({ name, image, link, price }) => {
    return (
        <Link href={link} className="flex flex-col items-center hover:bg-gray-200 rounded-md p-5">
            <div className="relative w-28 h-24 sm:w-36 sm:h-32 lg:w-44 lg:h-40 items-center flex justify-center mb-2 border-stone-500 border-4 rounded-lg">
                <img src={image} alt={name} className="w-9/12" />
                <span className="absolute bottom-0 right-0 m-2 bg-white rounded p-1 shadow-lg">{price}</span>
            </div>
            <p className="text-center text-sm">{name}</p>
        </Link>
    );
}

export const Item = ({ link, desc, name, image, price, chatlink, heart }) => {
    const router = useRouter();
    const [Heart, setHeart] = useState(heart);

    const handleButtonClick = (event) => {
        event.stopPropagation();
        router.push(chatlink);
    }

    const handleHeartClick = (event) => {
        event.stopPropagation();
        setHeart(!Heart);
    }

    const handleItemClick = () => {
        router.push(link);
    }

    return (
        <div onClick={handleItemClick} className="flex flex-col sm:flex-row items-start md:items-center hover:bg-gray-200 rounded-md p-5 gap-4 md:m-4 bg-white border shadow-lg cursor-pointer">
            <div className="relative w-24 h-24 sm:w-16 sm:h-16 lg:w-44 lg:h-40 flex justify-between justify-self-center mb-2 border-stone-500 border-4 rounded-lg gap-x-4">
                <img src={image} alt={name} className="object-cover w-full h-full rounded-lg" />
                <span className="absolute bottom-0 right-0 m-2 bg-white rounded p-1 shadow-lg">{price}</span>
            </div>
            <div className="flex flex-col justify-start break-words w-full">
                <p className="text-lg font-bold self-start w-full">{name}</p>
                <p className="text-md w-full">{desc}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <button onClick={handleButtonClick} className="w-10 h-8 sm:w-32 sm:h-12 rounded flex flex-row items-center justify-center gap-2 bg-slate-400 shadow-lg">
                        <FaComment />
                        <span className="text-lg font-bold hidden sm:block">Chat</span>
                    </button>
                    <div onClick={handleHeartClick} className="w-10 h-8 md:w-12 md:h-12 rounded flex flex-row items-center justify-center bg-slate-400 shadow-lg">
                        {Heart ? <FaHeart size={24} color={'crimson'} /> : <FaRegHeart size={26} />}
                    </div>
                </div>
            </div>
        </div>
    );
}