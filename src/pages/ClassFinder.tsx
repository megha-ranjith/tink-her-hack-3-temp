import React from 'react';
import { MapPin, Star, Calendar } from 'lucide-react';
import type { Class } from '../types';

export default function ClassFinder() {
  const classes: Class[] = [
    {
      id: '1',
      name: 'Yoga Flow',
      type: 'Yoga',
      location: {
        address: '123 Wellness St, New York',
        lat: 40.7128,
        lng: -74.0060
      },
      price: 25,
      schedule: ['Mon 9:00 AM', 'Wed 9:00 AM', 'Fri 9:00 AM'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Dance Fitness',
      type: 'Dance',
      location: {
        address: '456 Health Ave, New York',
        lat: 40.7142,
        lng: -74.0064
      },
      price: 20,
      schedule: ['Tue 6:00 PM', 'Thu 6:00 PM', 'Sat 10:00 AM'],
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Find Your Perfect Class</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{classItem.name}</h3>
                  <p className="text-gray-600">{classItem.type}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{classItem.rating}</span>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <p className="ml-2 text-gray-600">{classItem.location.address}</p>
              </div>
              
              <div className="flex items-start mb-4">
                <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                <div className="ml-2">
                  {classItem.schedule.map((time, index) => (
                    <p key={index} className="text-gray-600">{time}</p>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-pink-500">${classItem.price}</p>
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}