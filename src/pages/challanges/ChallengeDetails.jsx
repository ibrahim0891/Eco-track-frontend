import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '@/config/axios.config';
import { auth } from '@/config/firebase.config';
import toast from 'react-hot-toast';

const ChallengeDetails = () => {
    const [challenge, setChallenge] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { challengeId } = useParams();

    useEffect(() => {
        function fetchChallenge() {
            axiosInstance
                .get(`/challenges/${challengeId}`)
                .then((response) => {
                    setChallenge(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching challenge:", error);
                    setError("Failed to fetch challenge.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        fetchChallenge();
    }, [challengeId]);
    function joinChallenge(challengeId) {
        axiosInstance
            .post(`/challenges/join/${challengeId}`, {
                userId: auth.currentUser.uid,
            })
            .then((response) => {
                if (response.data.data == null) {
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
            <h1 className='text-2xl font-semibold mb-2'>{challenge.title}</h1>
            <p className='text-gray-600'>{challenge.category}</p>
            <p className='text-gray-600'>{challenge.description}</p>
            <p className='text-gray-600'>Duration: {challenge.duration} days</p>
            <p className='text-gray-600'>Target: {challenge.target}</p>
            <img src={challenge.imageUrl} alt={challenge.title} className='w-full h-64 object-cover mt-4 mb-4 rounded-lg' />
            <Button onClick={() => joinChallenge(challengeId)}>Join Challenge</Button>
        </div>
    );
};

export default ChallengeDetails;