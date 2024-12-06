import React from "react";
import NavBar from "../home/NavBar";
import SearchFilter from "../search/SearchFilter";

export default function CatLayout({ children }) {
    return (
        <>
            <NavBar />
            <div className="flex flex-row relative">
                {children}
            </div>
        </>
    );
}