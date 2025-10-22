import React from 'react';
import type { EmergencyContact } from '../types';
import SOSButton from './SOSButton';
import EmergencyCallButton from './EmergencyCallButton';

interface HomeScreenProps {
  contacts: EmergencyContact[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ contacts }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">In Case of Emergency</h2>
            <p className="text-gray-600 mt-2 max-w-sm">Press the large <span className="font-bold text-red-600">SOS</span> button to alert your contacts with your location.</p>
        </div>
        <SOSButton contacts={contacts} />
        <EmergencyCallButton />
    </div>
  );
};

export default HomeScreen;
