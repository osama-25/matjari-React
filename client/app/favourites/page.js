import React from "react";
import FavTopNav from "./TopNav";
import { Item } from "../Item";

const items = [
    { id: 1, name: 'Electronics', image: '/favicon.ico', link: '/electronics' },
    { id: 2, name: 'Fashion', image: '/favicon.ico', link: '/fashion' },
    { id: 3, name: 'Home', image: '/favicon.ico', link: '/home' },
    { id: 4, name: 'Books', image: '/favicon.ico', link: '/books' },
];

const Profile = () => {
    return (
        <>
            <FavTopNav />
            <section className="flex flex-col gap-4 my-8 mx-8 rounded-md">
                {items.map(item => (
                    <Item key={item.id} name={item.name} image={item.image}
                        link={item.link} price={'$$$'} chatlink={'/chats'}
                        desc={'Some Description uyfyucytctiycciytc'} heart={true}
                    />
                ))}
            </section>
        </>
    );
}
export default Profile