import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import FeauritedChallenge from "./FeaturedChallages";


let featuredChallengePromise = axiosInstance.get("/challenges/featured").then(res=> res.data.data);

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center  text-center space-y-4">
       
             <FeauritedChallenge featuredChallengePromise={featuredChallengePromise} />
        </div>
    );
}
