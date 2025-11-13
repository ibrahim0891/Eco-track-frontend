import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/config/axios.config";
import { auth } from "@/config/firebase.config";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Challenges = () => {
    const [loading, setLoading] = React.useState(true);
    const [challenges, setChallenges] = React.useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        function fetchChallenges() {
            axiosInstance
                .get("/challenges")
                .then((response) => {
                    setChallenges(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching challenges:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        fetchChallenges();
    }, []);

    function joinChallenge(challengeId) {
        axiosInstance
            .post(`/challenges/join/${challengeId}` , {
                userId : auth.currentUser.uid
            })
            .then((response) => {
                if(response.data.data == null){
                    toast.error("You have already joined this challenge.");
                    return;
                }
               toast.success("Successfully joined the challenge!");
            })
            .catch((error) => {
                console.error("Error joining challenge:", error);
                toast.error("Failed to join the challenge.");
            });
    }
    return (
        <div className='p-8'>
            <h1>Challenges</h1>
            {loading ? (
                <p>Loading challenges...</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {challenges.map((challenge) => (
                        <div key={challenge._id} className='border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
                            <img src={challenge.imageUrl} alt={challenge.title} className='w-full h-48 object-cover mb-4 rounded-lg bg-gray-100' />
                            <h2 className='text-lg font-semibold mb-2'>{challenge.title}</h2>
                            <p className='text-gray-600'>{challenge.description}</p>
                            <p className='text-sm text-gray-500'>Duration: {challenge.duration} days</p>
                            <Button className='mt-4 w-full' onClick={() => joinChallenge(challenge._id)}>Join Challenge</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Challenges;
