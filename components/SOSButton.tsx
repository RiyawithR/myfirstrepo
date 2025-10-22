import React, { useState, useEffect } from 'react';
import type { EmergencyContact } from '../types';
import { MailIcon, MessageIcon } from './icons';

interface SOSButtonProps {
  contacts: EmergencyContact[];
}

const SOSButton: React.FC<SOSButtonProps> = ({ contacts }) => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setTimeout> for the timer's type, which is compatible with browser environments and resolves the 'NodeJS' namespace error.
    let timer: ReturnType<typeof setTimeout>;
    if (confirmationVisible) {
      // After showing the confirmation, reset the component state after 5 seconds
      timer = setTimeout(() => {
        setLocation(null);
        setConfirmationVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [confirmationVisible]);

  const handleSOS = () => {
    if (contacts.length === 0) {
      alert("Please add emergency contacts in the Settings page first.");
      return;
    }
    
    setIsSending(true);
    setError(null);
    setLocation(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setIsSending(false);
      },
      (geoError) => {
        setError(`Could not get location: ${geoError.message}. Please check your device settings and grant location permission.`);
        setIsSending(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  const generateMessage = (lat: number, lon: number) => {
      const mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
      return `EMERGENCY! I need help. My current location is: ${mapsLink}`;
  };

  const getSmsHref = (phone: string, message: string) => {
    const userAgent = navigator.userAgent || navigator.vendor;
    // iOS uses '&' as a separator, while Android and others use '?'
    const separator = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream ? '&' : '?';
    return `sms:${phone}${separator}body=${encodeURIComponent(message)}`;
  }
  
  const getMailtoHref = (email: string, message: string) => {
    return `mailto:${email}?subject=EMERGENCY%20ALERT&body=${encodeURIComponent(message)}`;
  }
  
  const handleConfirmSent = () => {
    setConfirmationVisible(true);
  }

  if (confirmationVisible) {
    return (
        <div className="w-full max-w-md p-6 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg shadow-lg text-center animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Alerts Sent</h3>
            <p>Help has been notified. Stay as safe as possible and wait for assistance.</p>
        </div>
    )
  }

  if (location) {
     const message = generateMessage(location.lat, location.lon);
     return (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg text-center animate-fade-in">
            <h3 className="text-xl font-bold text-red-600 mb-2">Location Found!</h3>
            <p className="mb-4 text-gray-700">Tap below to send your alert. You must press 'send' in your messaging/email app.</p>
            <div className="space-y-3 mb-6">
            {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className="w-full p-3 bg-gray-100 rounded-md text-left shadow-sm"
                >
                  <p className="font-semibold text-gray-900 mb-2">{contact.name}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {contact.phone && (
                      <a
                        href={getSmsHref(contact.phone, message)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        <MessageIcon className="w-5 h-5" />
                        Send SMS
                      </a>
                    )}
                    {contact.email && (
                       <a
                        href={getMailtoHref(contact.email, message)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        <MailIcon className="w-5 h-5" />
                        Send Email
                      </a>
                    )}
                  </div>
                </div>
            ))}
            </div>
            <button onClick={handleConfirmSent} className="w-full px-6 py-3 text-md font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Confirm Alerts Sent
            </button>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        onClick={handleSOS}
        disabled={isSending}
        className="relative w-48 h-48 bg-red-600 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 disabled:bg-red-400 disabled:cursor-not-allowed"
      >
        {isSending && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )}
        SOS
      </button>
      {error && <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}
    </div>
  );
};

export default SOSButton;