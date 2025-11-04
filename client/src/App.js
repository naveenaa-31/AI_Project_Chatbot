import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';
import EmergencyContacts from './components/EmergencyContacts';
import { Heart, MessageCircle, BookOpen, Phone } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [userMood, setUserMood] = useState(null);

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'emergency', label: 'Emergency', icon: Phone }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Heart className="logo-icon" />
            <h1>Mindful Companion</h1>
          </div>
          <p className="tagline">Your supportive mental health companion</p>
        </div>
      </header>

      <nav className="tab-navigation">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="tab-icon" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <main className="main-content">
        {activeTab === 'chat' && (
          <ChatInterface userMood={userMood} setUserMood={setUserMood} />
        )}
        {activeTab === 'mood' && (
          <MoodTracker userMood={userMood} setUserMood={setUserMood} />
        )}
        {activeTab === 'resources' && (
          <Resources userMood={userMood} />
        )}
        {activeTab === 'emergency' && (
          <EmergencyContacts />
        )}
      </main>

      <footer className="app-footer">
        <p>
          <strong>Important:</strong> This chatbot is not a replacement for professional mental health care. 
          If you're in crisis, please contact emergency services or a mental health professional.
        </p>
      </footer>
    </div>
  );
}

export default App;