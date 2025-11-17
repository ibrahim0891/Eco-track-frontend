import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link, NavLink } from "react-router";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    HandFistIcon,
    HomeIcon,
    LeafIcon,
    LogOutIcon,
    MenuIcon,
    ShieldCheckIcon,
    XIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Nav = () => {
    const { logout, user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <header className='w-full bg-white/50 backdrop-blur-sm container mx-auto   px-6 py-4 flex items-center justify-between sticky top-0'>
            <div>
                <h1 className='font-semibold tracking-wider text-green-600 flex items-center  gap-2'>
                    <LeafIcon size={20}></LeafIcon>
                    <span> EcoTrack </span>
                </h1>
            </div>
            <nav className=' items-center *:hover:underline gap-6 hidden md:flex'>
                <NavLink to={"/"}> Home </NavLink>
                <NavLink to={"/challenges"}> Challenges </NavLink>
                <NavLink to={"/my-activities"}> My Activities </NavLink>
            </nav>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className='w-8 h-8 rounded-full'
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                            {user?.displayName}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={"/profile"}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {" "}
                            <Link to={"/my-activities"}>
                                My Activities
                            </Link>{" "}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={logout}
                            className={
                                "text-red-500 bg-red-50 font-semibold hover:bg-red-100 hover:text-red-600"
                            }
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className='space-x-4 hidden md:block'>
                    <Link to={"/auth"}>
                        <Button variant={"outline"}> Login </Button>
                    </Link>
                    <Link to={"/auth/register"}>
                        <Button> Register </Button>
                    </Link>
                </div>
            )}

            <div className='md:hidden z-500'>
                <div>
                    <MenuIcon onClick={() => setSidebarOpen(!sidebarOpen)} />
                </div>
                {/* sidebar panel  */}
                <div
                    className={cn(
                        sidebarOpen ? " w-2/3" : "w-0",
                        "absolute top-0 left-0 bg-white h-screen transition-all duration-300 shadow-md border border-gray-100 overflow-hidden flex flex-col items-between"
                    )}
                >
                    <div className="px-8 py-4 pt-8 flex justify-between items-center">
                        <h1 className='font-semibold tracking-wider text-green-600 flex items-center  gap-2'>
                            <LeafIcon size={20}></LeafIcon>
                            <span> EcoTrack </span>
                        </h1>
                        <div>
                            <XIcon className="text-gray-500 " size={16} onClick={() => setSidebarOpen(false)} />
                        </div>
                    </div>

                    <nav className=' items-center *:hover:underline gap-6 *:flex *:items-center *:gap-3 flex-1 p-6'>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `py-4 px-4  mb-2 hover:bg-green-50 ${
                                    isActive ? "text-green-600 bg-green-50 rounded-md font-semibold" : ""
                                }`
                            }
                        >
                            <HomeIcon size={20} />{" "}
                            <span> Home </span>
                        </NavLink>
                        <NavLink
                            to={"/challenges"}
                            className={({ isActive }) =>
                                `py-4 px-4  mb-2 hover:bg-green-50 ${
                                    isActive ? "text-green-600 bg-green-50 rounded-md font-semibold" : ""
                                }`
                            }
                        >
                            <HandFistIcon size={20} />{" "}
                            <span> Challenges </span>
                        </NavLink>
                        <NavLink
                            to={"/my-activities"}
                            className={({ isActive }) =>
                                `py-4 px-4  mb-2 hover:bg-green-50 ${
                                    isActive ? "text-green-600 bg-green-50 rounded-md font-semibold" : ""
                                }`
                            }
                        >
                            <ShieldCheckIcon size={20} />{" "}
                            <span> My Activities </span>
                        </NavLink>
                    </nav>

                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-2">
                        <img
                            src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
                            }
                            alt={"Dummy User"}
                            className="size-9"
                        />
                        <div>
                            <p className="font-bold text-sm">Dummy User</p>
                            <p className="text-xs">dummy@email.com</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size={'icon'} variant={"outline"}><LogOutIcon/> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
