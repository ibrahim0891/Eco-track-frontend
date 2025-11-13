import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import axiosInstance from '@/config/axios.config';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { PlusIcon } from 'lucide-react';
 

const AddChallenges = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    target: '',
    participants: '',
    impactMetric: '',
    createdBy: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    joinedUsers: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/challenges/add', formData)
      .then((response) => {
        navigate('/challenges');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Card className={'p-12 bg-white rounded-lg shadow-lg md:w-[400px] lg:w-[600px] mx-auto my-10'}>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Add Challenge</h1>
        <Button variant='ghost' className='p-2'>
          <PlusIcon className='h-6 w-6' />
        </Button>
      </div>

      <form action='' className='space-y-4 mt-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title' className='text-lg font-medium'>
            Challenge Title
          </label>
          <Input
            type='text'
            name='title'
            id='title'
            value={formData.title}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='category' className='text-lg font-medium'>
            Category
          </label>
          <select
            className='w-full bg-gray-100 p-2 rounded-lg mt-2'
            name='category'
            onChange={handleChange}
          >
            <option value=''>Select a category</option>
            <option value='energy-conservation'>Energy Conservation</option>
            <option value='water-conservation'>Water Conservation</option>
            <option value='food-waste-reduction'>Food Waste Reduction</option>
            <option value='green-transportation'>Green Transportation</option>
            <option value='recycling'>Recycling</option>
            <option value='safe-waste-disposal'>Safe Waste Disposal</option>
            <option value='safe-handling-of-chemicals'>
              Safe Handling of Chemicals
            </option>
            <option value='safe-disposal-of-electronics'>
              Safe Disposal of Electronics
            </option>
            <option value='safe-landfill-disposal'>Safe Landfill Disposal</option>
          </select>
        </div>
        <div>
          <label htmlFor='description' className='text-lg font-medium'>
            Challenge Description
          </label>
          <Textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          ></Textarea>
        </div>
        <div>
          <label htmlFor='duration' className='text-lg font-medium'>
            Duration
          </label>
          <Input
            type='number'
            name='duration'
            id='duration'
            value={formData.duration}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='target' className='text-lg font-medium'>
            Target
          </label>
          <Input
            type='text'
            name='target'
            id='target'
            value={formData.target}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='participants' className='text-lg font-medium'>
            Participants
          </label>
          <Input
            type='number'
            name='participants'
            id='participants'
            value={formData.participants}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='impactMetric' className='text-lg font-medium'>
            Impact Metric
          </label>
          <Input
            type='text'
            name='impactMetric'
            id='impactMetric'
            value={formData.impactMetric}
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor="createdBy" className='text-lg font-medium'>
            Created By
          </label>
          <Input
            type="text"
            name="createdBy"
            id="createdBy"
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor="startDate" className='text-lg font-medium'>
            Start date
          </label>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor="endDate" className='text-lg font-medium'>
            End date
          </label>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className='text-lg font-medium'>
            Image URL
          </label>
          <Input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={handleChange}
            className='mt-2 bg-gray-100 p-2 rounded-lg'
          />
        </div>
        <Button type='submit' className='mt-4 w-full'>
          Add Challenge
        </Button>
      </form>
    </Card>
  );
};

export default AddChallenges;
