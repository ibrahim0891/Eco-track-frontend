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

const Nav = () => {
    const { logout, user } = useAuth();
    
    return (
        <header className='w-full bg-white border px-12 py-4 flex items-center justify-between'>
            <div>
                <h1 className='font-bold tracking-wider text-green-600'>
                    Ecotrack
                </h1>
            </div>
            <nav className=' items-center *:hover:underline flex gap-6'>
                <NavLink to={"/"}> Home </NavLink>
                <NavLink to={"/challenges"}> Challenges </NavLink>
                <NavLink to={"/my-activities"}> My Activities </NavLink>
            </nav>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={'icon'}>
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className='w-8 h-8 rounded-full'
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link to={'/profile'}>Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem> <Link to={'/my-activities'}>My Activities</Link> </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout} className={'text-red-500 bg-red-50 font-semibold hover:bg-red-100 hover:text-red-600'}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className='space-x-4'>
                    <Link to={"/auth"}>
                        <Button variant={"outline"}> Login </Button>
                    </Link>
                    <Link to={"/auth/register"}>
                        <Button> Register </Button>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Nav;
