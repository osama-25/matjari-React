import SideNav from "./SideNav";
import ProfileTopNav from "./TopNav";

const ProfilePicture = ({ pic }) => {
    return (
        <div className="relative bg-gray-200 w-full h-32 flex items-end justify-center overflow-visible rounded-lg">
            <img
                src={pic}
                alt="Profile"
                className="absolute w-32 h-32 rounded-full border-4 border-white bottom-[-30px]"
            />
        </div>
    );
}

export default function ProfileLayout({ children }) {
    return (
        <>
            <ProfileTopNav />
            <div className="flex">
                <div className="flex-initial w-1/5">
                    <SideNav />
                </div>
                <div className="flex-1 p-4">
                    <ProfilePicture pic="/favicon.ico" />
                    {children}
                </div>
            </div>
        </>
    );
}