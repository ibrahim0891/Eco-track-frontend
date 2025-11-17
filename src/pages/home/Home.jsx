import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import FeauritedChallenge from "./FeaturedChallages";
import { HandFistIcon, SparkleIcon, Trash2Icon } from "lucide-react";
import { impacts } from "@/constants";

let featuredChallengePromise = axiosInstance
    .get("/challenges/featured")
    .then((res) => res.data.data);

export default function Home() {
    return (
        <div className='flex flex-col items-center justify-center  text-center '>
            <div className='h-screen hidden flex items-center justify-center flex-col gap-5 bg-no-repeat bg-cover w-full'>
                <h2 className='text-3xl font-bold mb-4 max-w-5xl mx-auto'>
                    Eco Track, A sustainable platform where unity makes a
                    difference
                </h2>
                <p className='text-lg text-gray-600 mb-4'>
                    Join us in our mission to create a sustainable future for
                    our planet.
                </p>
                <Button className='' variant={"outline"} size={"lg"}>
                    Get Started
                </Button>
            </div>
            
            <FeauritedChallenge
                featuredChallengePromise={featuredChallengePromise}
            />

            <div className="flex flex-col items-center justify-center gap-5">
                <div className="py-20 pb-10  ">
                    <h2 className="tracking-widest text-green-500 text-sm">Statistics</h2>
                    <p className="text-3xl font-bold mb-4"> Our impact at a glance </p>
                    <p className="text-gray-700  max-w-2xl">Everyday, our community makes a difference. Just a small step, small actions lead to big changes. You can be a part of it tooo</p>
                </div>
                <div className="  gap-10 container mx-auto grid grid-cols-1 sm:grid-cols-3">
                    {impacts.map(({icon, title, value}) => (
                        <div key={title} className=" p-10 text-left border border-gray-200 rounded-md flex items-start gap-3 flex-col ">
                        <span className="bg-green-50 rounded-md p-4  text-green-600">
                            {icon}
                        </span>
                        <p className="text-2xl font-bold text-green-800">{title}</p>
                        <p>{value}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
