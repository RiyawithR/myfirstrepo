import React from 'react';
import type { Screen } from '../types';
import { HomeIcon, ChatIcon, SettingsIcon } from './icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: 'home' as Screen, icon: HomeIcon, label: 'SOS' },
    { screen: 'chatbot' as Screen, icon: ChatIcon, label: 'Guide' },
    { screen: 'settings' as Screen, icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => setActiveScreen(item.screen)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors duration-200 ${
              activeScreen === item.screen ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
