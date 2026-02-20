'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; 

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '']); // FIXED: Added 4th element
  const [timer, setTimer] = useState(55);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) { // FIXED: Changed from 2 to 3
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleKeyPress = (num: string) => {
    const currentIndex = otp.findIndex(val => val === '');
    if (currentIndex !== -1 && currentIndex < 4) { // FIXED: Changed from 3 to 4
      handleOtpChange(currentIndex, num);
    }
  };

  const handleDelete = () => {
    const currentIndex = otp.findIndex(val => val === '');
    const deleteIndex = currentIndex === -1 ? 3 : currentIndex - 1; // FIXED: Changed from 2 to 3
    if (deleteIndex >= 0) {
      handleOtpChange(deleteIndex, '');
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) { // FIXED: Changed from 3 to 4
      alert(`OTP Verified: ${otpCode}`);
      // Add your verification logic here
      router.push('/doctor-list')
    } else {
      alert('Please enter all 4 digits');
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(55);
      setCanResend(false);
      setOtp(['', '', '', '']); // FIXED: Added 4th element
      alert('Code resent!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm px-4 py-3 flex items-center"
      >
        <button className="p-2 -ml-2">
          <FiArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 ml-2">OTP Code Verification</h1>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm">
              Code has been sent to +91 111 ******99
            </p>
          </div>

      
          {/* OTP Input Fields */}
<div className="flex justify-center gap-3 mb-8">
  {otp.map((digit, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <input
        id={`otp-${index}`}
        type="text"
        inputMode="numeric"
        pattern="[0-9]"
        maxLength={1}
        value={digit}
        onChange={(e) => handleOtpChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className="w-16 h-16 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-900 bg-white"
      />
    </motion.div>
  ))}
</div>

          {/* Resend Timer */}
          <div className="text-center mb-8">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm ${canResend ? 'text-blue-600 hover:text-blue-700' : 'text-gray-500'}`}
            >
              {canResend ? 'Resend code' : `Resend code in ${timer} s`}
            </button>
          </div>

          {/* Verify Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
          >
            Verify
          </motion.button>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKeyPress(num.toString())}
                className="bg-white border border-gray-300 rounded-full h-16 text-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {num}
              </motion.button>
            ))}
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleKeyPress('*')}
              className="bg-white border border-gray-300 rounded-full h-16 text-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              *
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleKeyPress('0')}
              className="bg-white border border-gray-300 rounded-full h-16 text-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              0
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="bg-white border border-gray-300 rounded-full h-16 text-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}