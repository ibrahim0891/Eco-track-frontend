import React from 'react';
import { Button } from '@/components/ui/button';

const WhyGoGreenSection = () => {
    return (
        <section className='flex flex-col items-center justify-center  gap-4 p-20 text-center'>
            <h1 className='text-4xl font-semibold'> Why go green? </h1>
            <p className='text-gray-500 max-w-3xl '>
                To live a more sustainable lifestyle, start by reducing your
                waste and using eco-friendly products.
            </p>
            <p>
                <ul className='flex items-center gap-4 my-8'>
                    <li className='border border-gray-200 shadow px-16 py-8 rounded-md '>
                        Reduce your carbon footprint
                    </li>
                    <li className='border border-gray-200 shadow px-16 py-8 rounded-md '>
                        Save money on energy bills
                    </li>
                    <li className='border border-gray-200 shadow px-16 py-8 rounded-md '>
                        Protect the environment
                    </li>
                </ul>
            </p>
            <Button className='px-10 py-8'>Get Started</Button>
        </section>
    );
};

export default WhyGoGreenSection;