import React from 'react';

const LogoImage = () => (
  <svg width="100%" height="100%" viewBox="0 0 220 200" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '150px' }}>
    {/* Background */}
    <rect width="220" height="200" fill="#7B00FF"/>
    
    {/* App Icon - shifted slightly left */}
    <rect x="20" y="40" width="120" height="120" rx="35" fill="#3A0075"/>
    <circle cx="80" cy="100" r="45" fill="#B85AFF"/>
    
    {/* Play button */}
    <path d="M65 70L105 100L65 130V70Z" fill="white" stroke="#3A0075" strokeWidth="4"/>
    
    {/* Circular highlight */}
    <circle cx="75" cy="80" r="8" fill="white" opacity="0.7"/>
    <circle cx="80" cy="100" r="45" stroke="white" strokeWidth="3" strokeDasharray="6 3"/>
    
    {/* TW Text with glitch effect - moved to ensure visibility */}
    <text x="145" y="130" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="bold" fill="white" stroke="#FF00FF" strokeWidth="1" opacity="0.9">TW</text>
    <text x="143" y="130" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="bold" fill="white" stroke="#00FFFF" strokeWidth="1" opacity="0.9">TW</text>
    <text x="144" y="130" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="bold" fill="white">TW</text>
  </svg>
);

export default LogoImage; 