import React, { useState, useEffect, useRef } from 'react';
import chatbot from './bot.js';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([{
            type: 'bot',
            text: `Welcome to ${config.companyInfo.name}! How can I assist you with your web development needs today?`,
            timestamp: new Date().toLocaleTimeString()
        }]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { 
            type: 'user', 
            text: input,
            timestamp: new Date().toLocaleTimeString()
        }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await chatbot(userMessage);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: response,
                timestamp: new Date().toLocaleTimeString()
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: `I apologize, but I encountered an issue. Please contact us at ${config.companyInfo.email}`,
                timestamp: new Date().toLocaleTimeString()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-black p-4 rounded-t-lg flex items-center space-x-3">
                <div className="w-8 h-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
                        <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100c55.2 0 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80s80 35.9 80 80s-35.9 80-80 80z"/>
                        <path d="M150 90H50c-5.5 0-10 4.5-10 10s4.5 10 10 10h100c5.5 0 10-4.5 10-10s-4.5-10-10-10z"/>
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-white">{config.companyInfo.name}</h2>
            </div>
            
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-3 p-3 rounded-lg ${
                            message.type === 'user'
                                ? 'bg-blue-100 ml-auto max-w-[80%]'
                                : 'bg-gray-200 mr-auto max-w-[80%]'
                        }`}
                    >
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">
                                {message.timestamp}
                            </span>
                            <div className="break-words">
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="bg-gray-200 w-16 p-3 rounded-lg animate-pulse">
                        typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                >
                    Send
                </button>
            </form>

            {/* Contact Info */}
            <div className="mt-4 text-sm text-gray-500 text-center">
                <p>Need immediate assistance?</p>
                <p>Contact us: {config.companyInfo.email} | {config.companyInfo.phone}</p>
            </div>
        </div>
    );
};

export default ChatInterface;