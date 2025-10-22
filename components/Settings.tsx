import React, { useState } from 'react';
import type { EmergencyContact } from '../types';
import { TrashIcon } from './icons';

interface SettingsProps {
  contacts: EmergencyContact[];
  setContacts: React.Dispatch<React.SetStateAction<EmergencyContact[]>>;
}

const Settings: React.FC<SettingsProps> = ({ contacts, setContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!phone && !email)) {
      alert("Please provide a name and at least a phone number or an email.");
      return;
    }
    const newContact: EmergencyContact = { id: Date.now().toString(), name, phone, email };
    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
    setEmail('');
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Emergency Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-gray-900" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., +15551234567" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g., contact@example.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-gray-900" />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Add Contact
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Contacts</h2>
        {contacts.length === 0 ? (
          <p className="text-gray-500">You haven't added any contacts yet.</p>
        ) : (
          <ul className="space-y-3">
            {contacts.map(contact => (
              <li key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-semibold text-gray-900">{contact.name}</p>
                  {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                  {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
                </div>
                <button onClick={() => deleteContact(contact.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
       <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-r-lg">
          <h3 className="font-bold">Privacy Note</h3>
          <p className="text-sm">Your contact information is stored only on this device in your browser's local storage. It is not sent to any server.</p>
        </div>
    </div>
  );
};

export default Settings;