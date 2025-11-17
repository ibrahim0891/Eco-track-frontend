import { use } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
    MapPinIcon,
    CalendarDaysIcon,
    BadgeCheckIcon,
    ArrowRightIcon,
} from "lucide-react";
import { format } from "date-fns";

const FeauritedChallenge = ({ featuredChallengePromise }) => {
    const featuredChallenges = use(featuredChallengePromise);
    console.log(featuredChallenges);
    return (
        <div className=''>
            <Carousel className='relative h-full'>
                <CarouselContent>
                    {featuredChallenges.map((challenge, index) => (
                        <CarouselItem key={index}>
                            <div
                                key={challenge.id}
                                className='relative  h-[350px] md:h-[800px]   overflow-hidden text-white'
                            >
                                <img
                                    src={challenge.imageUrl}
                                    alt={challenge.title}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />

                                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent' />

                                <div className='relative z-10 flex flex-col justify-center h-full p-8 md:p-12'>
                                    <p className='text-sm font-medium text-slate-200 uppercase tracking-wider mb-2'>
                                        {challenge.category}
                                    </p>

                                    <h2 className='text-3xl md:text-4xl font-bold mb-4 line-clamp-2'>
                                        {challenge.title}
                                    </h2>

                                    <p className='text-base md:text-lg text-gray-200 mb-6 max-w-3xl line-clamp-3 mx-auto'>
                                        {challenge.description}
                                    </p>

                                    <div className='flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300 mb-8 mx-auto'>
                                        <div className='  items-center gap-2 hidden md:flex'>
                                            <MapPinIcon className='h-4 w-4' />
                                            <span>
                                                {challenge.location ?? "Global"}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <CalendarDaysIcon className='h-4 w-4' />
                                            <span>
                                                {format(
                                                    new Date(
                                                        challenge.startDate
                                                    ),
                                                    "dd/MM/yyyy"
                                                )}{" "}
                                                -{" "}
                                                {format(
                                                    new Date(challenge.endDate),
                                                    "dd/MM/yyyy"
                                                )}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span>{challenge.status}</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant='outline'
                                        size='lg'
                                        className='bg-transparent mx-auto text-white border-white hover:bg-white hover:text-gray-900 transition-colors duration-300 group w-fit'
                                    >
                                        View Challenge
                                        <ArrowRightIcon className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='absolute opacity-40 md:opacity-70 left-0 bottom-0 ml-4' />
                <CarouselNext className='absolute opacity-40 md:opacity-70 right-0 bottom-0 mr-4' />
            </Carousel>
        </div>
    );
};
export default FeauritedChallenge;
