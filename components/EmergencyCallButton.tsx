import React from 'react';
import { PhoneIcon } from './icons';

const EmergencyCallButton = () => {
    return (
        <a 
            href="tel:112"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:bg-gray-900 transition-colors duration-200"
        >
            <PhoneIcon className="h-6 w-6" />
            <span>Call 112 (Emergency)</span>
        </a>
    )
}

export default EmergencyCallButton;
