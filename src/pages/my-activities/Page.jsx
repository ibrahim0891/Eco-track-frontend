import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { auth } from "@/config/firebase.config";
import { PlusIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

const MyActivities = () => {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user activities from an API or data source
        const fetchActivities = async () => {
            try {
                axiosInstance
                    .get("/challenges/user/" + auth.currentUser.uid)
                    .then((response) => {
                        setActivities(response.data.data);
                        console.log(response.data.data);
                    });
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='p-8'>
            <div className='flex items-center justify-between'>
                <h1>My Activities</h1>
                <Link to={"/challenge/add"}>
                    <Button variant={"ghost"}>
                        <PlusIcon className='' /> Add Challenge
                    </Button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {activities.map((activity) => (
                    <div
                        key={activity._id}
                        className='border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300'
                    >
                        <img
                            src={activity.challenge.imageUrl}
                            alt={activity.challenge.title}
                            className='w-full h-48 object-cover mb-4 rounded-lg bg-gray-100'
                        />
                        <h2 className='text-lg font-semibold mb-2'>
                            {activity.challenge.title}
                        </h2>
                        <p className='text-gray-600'>
                            {activity.challenge.description}
                        </p>
                        <p className='text-sm text-gray-500'>
                            Duration: {activity.challenge.duration} days
                        </p>
                        <p className='text-sm text-gray-500'>
                            Status: {activity.status}
                        </p>
                    </div>
                ))}
            </div>
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default MyActivities;
