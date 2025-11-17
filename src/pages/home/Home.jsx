import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import FeauritedChallenge from "./FeaturedChallages";
import { impacts } from "@/constants/index.jsx";
import ActiveChallengesSection from "./ActiveChallengesSection";
import { Suspense } from "react";
import { ZapIcon } from "lucide-react";

let featuredChallengePromise = axiosInstance
    .get("/challenges/featured")
    .then((res) => res.data.data);

const activeChallagePromise = axiosInstance
    .get("/challenges/active")
    .then((res) => res.data.data);
export default function Home() {
    return (
        <div className='flex flex-col items-center justify-center  text-center '>
            <div className='h-screen   flex items-center justify-center flex-col gap-5 bg-no-repeat bg-cover w-full'>
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

            <div className='flex flex-col items-center justify-center gap-5 w-full my-20  '>
                <div className='py-20 pb-5  '>
                    <h2 className='tracking-widest text-green-500 text-sm'>
                        Statistics
                    </h2>
                    <p className='text-3xl font-bold mb-4'>
                        {" "}
                        Our impact at a glance{" "}
                    </p>
                    <p className='text-gray-700  max-w-2xl'>
                        Everyday, our community makes a difference. Just a small
                        step, small actions lead to big changes. You can be a
                        part of it tooo
                    </p>
                </div>

                <div className="bg-gray-100 w-screen py-20">
                <div className='  gap-10 container mx-auto grid grid-cols-1 sm:grid-cols-3 b'>
                    {impacts.map(({ icon, title, value }) => (
                        <div
                        key={title}
                        className=' p-10 text-left border border-gray-200 bg-white rounded-md flex items-start gap-3 flex-col '
                        >
                            <span className='bg-green-50 rounded-md p-4  text-green-600'>
                                {icon}
                            </span>
                            <p className='text-2xl font-bold text-green-800'>
                                {title}
                            </p>
                            <p className="text-4xl font-black p-2 border rounded-full px-4 flex items-center gap-4"> <ZapIcon className="inline text-green-600"/> {value}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <div>
                <div className='py-20 pb-10  '>
                    <h2 className='tracking-widest text-green-500 text-sm'>
                        Activce Challanges
                    </h2>
                    <p className='text-3xl font-bold mb-4'>
                        Actice Challages Going on Right now
                    </p>
                    <p className='text-gray-700  max-w-2xl mx-auto'>
                        These challages are going on right now, join them and be
                        the part of it
                    </p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <ActiveChallengesSection
                        activeChallengesPromise={activeChallagePromise}
                    />
                </Suspense>
            </div>
        </div>
    );
}
