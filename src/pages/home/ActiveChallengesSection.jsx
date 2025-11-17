import ChallegeCard from "@/components/ChallegeCard";

import React, { use } from "react";

const ActiveChallengesSection = ({ activeChallengesPromise }) => {
    const activeChallenges = use(activeChallengesPromise);
    console.log(activeChallenges);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 container mx-auto text-left ">
            {activeChallenges.map((challenge) => {
                return (
                   <ChallegeCard challenge={challenge} />
                );
            })}
        </div>
    );
};

export default ActiveChallengesSection;
