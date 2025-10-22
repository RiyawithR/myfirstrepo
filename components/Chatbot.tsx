import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/geminiService';
import { SendIcon, UserIcon, BotIcon } from './icons';
import OfflineGuide from './OfflineGuide';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I am your emergency guide. How can I help you? Please remember, if this is a life-threatening emergency, call your local emergency number immediately." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToAI(input);
      // Decode the response to ensure HTML entities are rendered correctly.
      const botMessage: Message = { text: decodeHtml(botResponse), sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I couldn't connect. Please check your connection and try again.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOnline) {
    return <OfflineGuide />;
  }

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{maxHeight: 'calc(100vh - 150px)'}}>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800 text-center">Emergency Guide Chat</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>}
              <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md break-words ${msg.sender === 'user' ? 'bg-red-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                {/* Security Fix: Only render bot messages as HTML. User messages are rendered as plain text. */}
                {msg.sender === 'user' ? (
                  <div className="text-sm">{msg.text}</div>
                ) : (
                  <div className="text-sm chatbot-content" dangerouslySetInnerHTML={{ __html: msg.text }} />
                )}
              </div>
               {msg.sender === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"><UserIcon className="w-5 h-5"/></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>
              <div className="px-4 py-3 bg-gray-200 rounded-lg flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask for guidance..."
            className="flex-1 px-4 py-2 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-900"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;