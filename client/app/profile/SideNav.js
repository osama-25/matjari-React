"use client";


import Link from "next/link";
import React from "react";
import { IoBagHandleOutline, IoExitOutline, IoInformation } from "react-icons/io5";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import logout from '../login/logout.jsx'

const Button = ({ icon, text, link, onClick }) => {
    return (
        <div onClick={onClick} className="focus:bg-gray-200 focus:text-blue-600 hover:bg-gray-200 hover:text-blue-600 text-black my-1 rounded cursor-pointer">
            <Link href={link} className="w-full h-12 flex flex-row justify-center items-center gap-2">
                {icon}
                <span className="hidden sm:block">{text}</span>
            </Link>
        </div>
    );
};

const SideNav = () => {

    const router = useRouter();
    function handleLogout() {

        console.log("Faisal hani ahmed");

        localStorage.removeItem("token");
        router.push('/login'); // Redirect to the login page

    }

    return (
        <nav className="h-[calc(100vh-2.5rem)] w-full text-white flex flex-col px-2 py-4 shadow-lg">
            <Button text={'Information'} link={'/profile/info'} icon={<IoInformation />} />
            <Button text={'Store'} link={'/profile/store'} icon={<IoBagHandleOutline />} />
            <Button text={'Log out'} link={'/login'} icon={<IoExitOutline />} onClick={handleLogout} />
            {/* <Button> <logout>logout</logout></Button> */}

        </nav>
    );
}

export default SideNav;
