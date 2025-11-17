import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar1Icon, Clock, ClockIcon, HandFist, HandFistIcon, TagIcon } from "lucide-react";

const ChallegeCard = ({challenge}) => {
    return (
        <div className='border border-gray-200 rounded-xl p-6 space-y-4'>
            <div className='relative'>
                <img
                    src={challenge.imageUrl}
                    className='w-full aspect-video border border-gray-200 rounded-md'
                    alt=''
                />
                <div className='flex items-center justify-center gap-2 absolute top-0 right-0 bg-white border border-gray-200 rounded-full p-2 px-3 text-xs m-2'>
                    <ClockIcon className='' size={12} /> {challenge.duration}{" "}
                    days
                </div>
            </div>
            <div>
                <span className='bg-green-50 p-2 rounded-full flex items-center w-fit  gap-2'>
                    <TagIcon size={14} />
                    {challenge.category}{" "}
                </span>
            </div>
            <h1 className='text-2xl font-semibold'> {challenge.title} </h1>
            <p className='text-gray-600'> {challenge.description} </p>
            <p className='flex items-center justify-start gap-2 text-gray-700 '>
                <span>
                    {" "}
                    <HandFistIcon size={16} />{" "}
                </span>{" "}
                <span className='line-clamp-1'>{challenge.target}</span>
            </p>

            <div className='flex items-center gap-2'>
                <span>
                    <Calendar1Icon size={16} />
                </span>
                <span>
                    {" "}
                    {format(new Date(challenge.startDate), "dd/MM/yyyy")} -{" "}
                    {format(new Date(challenge.endDate), "dd/MM/yyyy")}{" "}
                </span>
            </div>
            <Button variant='outline' size={"lg"} className={"w-full"}>
                View Challenge
            </Button>
        </div>
    );
};

export default ChallegeCard;