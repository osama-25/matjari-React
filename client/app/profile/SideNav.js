import Link from "next/link";
import React from "react";
import { IoBagHandleOutline, IoExitOutline, IoInformation, IonIcon } from "react-icons/io5"

const Button = ({ icon, text, link }) => {
    return (
        <Link href={link} className="focus:bg-gray-200 focus:text-blue-600 hover:bg-gray-200 hover:text-blue-600 text-black my-1 rounded">
            <div className="w-full h-12 flex flex-row justify-center items-center gap-2">
                {icon}
                <span className="hidden sm:block">{text}</span>
            </div>
        </Link>
    );
};

const SideNav = () => {
    return (
        <nav className="h-[calc(100vh-2.5rem)] w-full text-white flex flex-col px-2 py-4 shadow-lg">
            <Button text={'Information'} link={'/profile/info'} icon={<IoInformation/>}/>
            <Button text={'Store'} link={'/profile/store'} icon={<IoBagHandleOutline/>}/>
            <Button text={'Log out'} link={'./'} icon={<IoExitOutline/>}/>
        </nav>
    );
}
export default SideNav