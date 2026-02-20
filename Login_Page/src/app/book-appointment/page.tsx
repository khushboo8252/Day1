'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiHome, FiFileText, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  available: boolean;
  experience: string;
  timeSlot: string;
  image: string;
}

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  const dates = [
    { day: 13, dayOfWeek: 'MON' },
    { day: 14, dayOfWeek: 'TUE' },
    { day: 16, dayOfWeek: 'WED' },
    { day: 17, dayOfWeek: 'WED' },
    { day: 18, dayOfWeek: 'WED' },
  ];

  const morningSlots = [
    { time: '09:30 AM - 9:45AM', available: true },
    { time: '10:00 AM - 10:15AM', available: true },
    { time: '10:30 AM - 10:45AM', available: true },
    { time: '11:00 AM - 11:15AM', available: false },
    { time: '11:30 AM - 11:45AM', available: true },
    { time: '12:00 PM - 12:15PM', available: true },
    { time: '12:30 PM - 12:45PM', available: false },
    { time: '01:00 PM - 01:15PM', available: true },
  ];

  const eveningSlots = [
    { time: '11:30 AM - 11:45AM', available: true },
    { time: '12:00 PM - 12:15PM', available: true },
    { time: '01:00 PM - 01:15PM', available: true },
    { time: '01:00 PM - 01:15PM', available: true },
  ];

  useEffect(() => {
    // Get doctor data from sessionStorage
    const storedDoctor = sessionStorage.getItem('selectedDoctor');
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    } else {
      // If no doctor data, redirect back to doctor list
      router.push('/doctor-list');
    }
  }, [router]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-400 px-4 py-6 flex items-center"
      >
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-white"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-white ml-2">Book Appointment</h1>
      </motion.div>

      {/* Doctor Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-lg shadow-md mx-4 -mt-8 p-4 z-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization} - Dombivali</p>
            <p className="text-sm text-gray-500">MBBS,MD (Internal Medicine)</p>
          </div>
          <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Date Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-4 mt-4"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Date</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date.day)}
              className={`flex flex-col items-center p-3 rounded-lg min-w-[60px] transition-colors ${
                selectedDate === date.day
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <span className="text-xs font-medium">{date.dayOfWeek}</span>
              <span className="text-lg font-bold">{date.day}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Morning Slots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-4 mt-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Morning</h3>
        <div className="grid grid-cols-2 gap-3">
          {morningSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => slot.available && setSelectedSlot(slot.time)}
              disabled={!slot.available}
              className={`p-3 rounded-lg text-sm transition-colors ${
                !slot.available
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : selectedSlot === slot.time
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Evening Slots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-4 mt-6 mb-24"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Evening</h3>
        <div className="grid grid-cols-2 gap-3">
          {eveningSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => slot.available && setSelectedSlot(slot.time)}
              disabled={!slot.available}
              className={`p-3 rounded-lg text-sm transition-colors ${
                !slot.available
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : selectedSlot === slot.time
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Confirm Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="fixed bottom-20 left-4 right-4"
      >
        <button 
          className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md"
          onClick={() => {
            if (selectedSlot) {
              alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedSlot}`);
              // You can add navigation to a confirmation page here
            } else {
              alert('Please select a time slot');
            }
          }}
        >
          Confirm
        </button>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2">
            <FiHome className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Find a Doctor</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <FiCalendar className="w-6 h-6 text-blue-600" />
            <span className="text-xs mt-1 text-blue-600">Appoint...</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <FiFileText className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Records</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <FiUser className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}