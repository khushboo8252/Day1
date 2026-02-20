'use client';

import { motion } from 'framer-motion';
import { FiArrowLeft, FiUsers, FiAward, FiStar, FiMessageSquare, FiHome, FiCalendar, FiFileText, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  available: boolean;
  experience: string;
  timeSlot: string;
  image: string;
}

export default function DoctorProfile() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

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
        <h1 className="text-xl font-semibold text-white ml-2">Doctor Profile</h1>
      </motion.div>

      {/* Doctor Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-lg shadow-md mx-4 -mt-8 p-4 z-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-blue-600">{doctor.specialization}</p>
            <p className="text-sm text-blue-400">MBBS, MD (Specialist)</p>
          </div>
          <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{doctor.experience}</p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mx-4 mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <FiUsers className="w-6 h-6 text-blue-400 mb-1" />
          <p className="text-md font-semibold text-gray-800">5,000+</p>
          <p className="text-xs text-gray-500 text-center">patients</p>
        </div>
        <div className="flex flex-col items-center">
          <FiAward className="w-6 h-6 text-blue-400 mb-1" />
          <p className="text-md font-semibold text-gray-800">10+</p>
          <p className="text-xs text-gray-500 text-center">years exper...</p>
        </div>
        <div className="flex flex-col items-center">
          <FiStar className="w-6 h-6 text-blue-400 mb-1" />
          <p className="text-md font-semibold text-gray-800">4.8</p>
          <p className="text-xs text-gray-500 text-center">rating</p>
        </div>
        <div className="flex flex-col items-center">
          <FiMessageSquare className="w-6 h-6 text-blue-400 mb-1" />
          <p className="text-md font-semibold text-gray-800">4,942</p>
          <p className="text-xs text-gray-500 text-center">reviews</p>
        </div>
      </div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-4 mt-4 p-4 bg-white rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {doctor.experience}
        </p>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-4 mt-4 p-4 bg-white rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Availability</h3>
        <p className="text-sm text-gray-600">
          {doctor.available ? (
            <span className="text-green-600 font-medium">Available today</span>
          ) : (
            <span className="text-red-600 font-medium">Not available today</span>
          )}
        </p>
        <p className="text-sm text-gray-500 mt-1">{doctor.timeSlot}</p>
      </motion.div>

      {/* Book Appointment Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-4 mt-6 mb-24"
      >
        <button 
  onClick={() => {
    // Store current doctor data before navigating
    if (doctor) {
      sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    }
    router.push('/book-appointment');
  }}
  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md"
>
  Book Appointment
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
            <FiCalendar className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Appoint...</span>
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