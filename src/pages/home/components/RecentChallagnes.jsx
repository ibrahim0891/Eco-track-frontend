import React from "react";
import { use } from "react";

const RecentChallenges = ({ challengesPromise }) => {
    let { data } = use(challengesPromise);
    console.log(data);
    return (
        <div>
            <h1 className='text-4xl font-semibold text-center my-10'>
                Recent Challenges
            </h1>
            {data.map((challenge) => (
                <div
                    key={challenge.id}
                    className='border border-gray-200 shadow px-8 py-6 rounded-md my-4 mx-20'
                >
                    <h2 className='text-2xl font-semibold mb-2'>
                        {challenge.title}
                    </h2>
                    <p className='mb-2'>{challenge.description}</p>
                    <p className='text-sm text-gray-500'>
                        Duration: {challenge.duration} days
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RecentChallenges;
