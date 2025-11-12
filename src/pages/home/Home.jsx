import WhyGoGreenSection from "./components/WhyGoGreenSection";
import RecentChallenges from "./components/RecentChallagnes";
import axiosInstance from "@/config/axios.config";
import { Suspense } from "react";

export default function Home() {
    let challengesPromise = axiosInstance.get("/challenges/active").then(res => res.data);
    return (
        <>
            <WhyGoGreenSection />
            <section className='p-20'>
                <h1 className='text-4xl font-semibold text-center'>
                    How it works
                </h1>
                <div className='flex items-center justify-center gap-10 my-12 flex-wrap'>
                    <div className='flex flex-col items-center border border-gray-200 shadow px-16 py-8 rounded-md justify-center gap-4'>
                        <h2 className='text-2xl font-semibold'>
                            Join challenges
                        </h2>
                        <p>Find and join eco-friendly challenges</p>
                    </div>
                    <div className='flex flex-col items-center border border-gray-200 shadow px-16 py-8 rounded-md justify-center gap-4'>
                        <h2 className='text-2xl font-semibold'>
                            Track progress
                        </h2>
                        <p>Track your progress and see how you're doing</p>
                    </div>
                    <div className='flex flex-col items-center border border-gray-200 shadow px-16 py-8 rounded-md justify-center gap-4'>
                        <h2 className='text-2xl font-semibold'>Share tips</h2>
                        <p>Share your tips and experiences with others</p>
                    </div>
                </div>
            </section>
            <Suspense fallback={<div>Loading recent challenges...</div>}>
                <RecentChallenges challengesPromise={challengesPromise} />
            </Suspense>
        </>
    );
}
