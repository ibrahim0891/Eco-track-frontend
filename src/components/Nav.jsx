import { Button } from "@/components/ui/button";
import { Link , NavLink } from "react-router";

const Nav = () => {
    return (
        <header className='w-full bg-white border px-12 py-4 flex items-center justify-between'>
            <div>
                <h1 className='font-bold tracking-wider text-green-600'>
                    {" "}
                    Ecotrack{" "}
                </h1>
            </div>
            <nav className=' items-center *:hover:underline flex gap-6'>
                <NavLink to={"/"}> Home </NavLink>
                <NavLink to={"/challenges"}> Challenges </NavLink>
                <NavLink to={"/my-activities"}> My Activities </NavLink>
            </nav>
            <div className='space-x-4'>
                <Link to={"/auth/login"}> <Button variant={'outline'}> Login </Button> </Link>
                <Link to={"/auth/register"}> <Button> Register </Button> </Link>
            </div>
        </header>
    );
};

export default Nav;
