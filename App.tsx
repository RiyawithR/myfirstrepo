import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import type { EmergencyContact, Screen } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import Chatbot from './components/Chatbot';
import Settings from './components/Settings';

const App = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [contacts, setContacts] = useLocalStorage<EmergencyContact[]>('emergency-contacts', []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'chatbot':
        return <Chatbot />;
      case 'settings':
        return <Settings contacts={contacts} setContacts={setContacts} />;
      case 'home':
      default:
        return <HomeScreen contacts={contacts} />;
    }
  };

  return (
    <div className="h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow p-4 pb-20 overflow-y-auto">
        {renderScreen()}
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
