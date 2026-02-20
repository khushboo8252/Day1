'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBell, FiHeart, FiHome, FiCalendar, FiFileText, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const router = useRouter();

  const doctors = [
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      specialization: "Cardiologist",
      available: true,
      experience: "Dr. Anjali has 10+ years of experience in heart care and treatment.",
      timeSlot: "10:00 AM - 06:00 PM",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      id: 2,
      name: "Dr. Rajiv Mehta",
      specialization: "Dermatologist",
      available: false,
      experience: "Dr. Rajiv specializes in skin treatments with 8+ years of practice.",
      timeSlot: "11:00 AM - 05:00 PM",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Dr. Neha Verma",
      specialization: "Pediatrician",
      available: true,
      experience: "Dr. Neha has 6+ years of experience treating children and newborns.",
      timeSlot: "09:00 AM - 03:00 PM",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "Dr. Arjun Singh",
      specialization: "Orthopedic Surgeon",
      available: true,
      experience: "Dr. Arjun focuses on bone and joint surgeries with 12+ years of experience.",
      timeSlot: "12:00 PM - 08:00 PM",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 5,
      name: "Dr. Kavita Rao",
      specialization: "Neurologist",
      available: false,
      experience: "Dr. Kavita has 9+ years of experience in neurological disorders and treatment.",
      timeSlot: "10:30 AM - 04:30 PM",
      image: "https://randomuser.me/api/portraits/women/22.jpg"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Add this function to handle doctor card click
  const handleDoctorClick = (doctor: any) => {
    // Store doctor data in sessionStorage
    sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    router.push('/doctor-profile');
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm px-4 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">P</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Hello, Priya</h1>
              <p className="text-sm text-gray-500">@Dombivali, Mumbai</p>
            </div>
          </div>
          <button className="p-2">
            <FiBell className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="bg-white px-4 pb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
          <input
  type="text"
  placeholder="Search Doctors"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
/>
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex-1 px-4 py-4 pb-20">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No doctors found matching your search.</p>
          </div>
        ) : (
          filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="flex gap-4">
                {/* Doctor Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                      {doctor.available && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-1">
                          Available today
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when clicking heart
                        toggleFavorite(doctor.id);
                      }}
                      className="p-1"
                    >
                      <FiHeart 
                        className={`w-5 h-5 ${favorites.includes(doctor.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {doctor.experience}
                  </p>

                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {doctor.timeSlot}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2">
            <FiHome className="w-6 h-6 text-blue-600" />
            <span className="text-xs mt-1 text-blue-600">Find a Doctor</span>
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