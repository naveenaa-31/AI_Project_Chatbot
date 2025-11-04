import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar } from 'lucide-react';

const MoodTracker = ({ userMood, setUserMood }) => {
  const [selectedMood, setSelectedMood] = useState(userMood);
  const [moodHistory, setMoodHistory] = useState([]);
  const [notes, setNotes] = useState('');

  const moodOptions = [
    { id: 'excellent', emoji: '😊', label: 'Excellent', color: '#4CAF50' },
    { id: 'good', emoji: '😌', label: 'Good', color: '#8BC34A' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: '#FFC107' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#FF9800' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: '#2196F3' },
    { id: 'stressed', emoji: '😤', label: 'Stressed', color: '#F44336' },
    { id: 'depressed', emoji: '😔', label: 'Depressed', color: '#9C27B0' },
    { id: 'angry', emoji: '😠', label: 'Angry', color: '#E91E63' }
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.id);
    setUserMood(mood.id);
  };

  const saveMoodEntry = () => {
    if (!selectedMood) return;

    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      notes: notes,
      timestamp: new Date(),
      date: new Date().toLocaleDateString()
    };

    const updatedHistory = [newEntry, ...moodHistory].slice(0, 30); // Keep last 30 entries
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    setNotes('');
    
    // Show success message
    alert('Mood entry saved successfully!');
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;

    const last7Days = moodHistory.slice(0, 7);
    const moodCounts = {};
    
    last7Days.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );

    return {
      totalEntries: moodHistory.length,
      last7Days: last7Days.length,
      mostCommonMood: mostCommonMood
    };
  };

  const stats = getMoodStats();

  return (
    <div className="mood-tracker">
      <div className="mood-header">
        <h2>Mood Tracker</h2>
        <p>Track your emotional well-being and identify patterns</p>
      </div>

      <div className="mood-selection">
        <h3>How are you feeling right now?</h3>
        <div className="mood-options">
          {moodOptions.map((mood) => (
            <div
              key={mood.id}
              className={`mood-option ${selectedMood === mood.id ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood)}
              style={{ 
                borderColor: selectedMood === mood.id ? mood.color : '#e9ecef',
                backgroundColor: selectedMood === mood.id ? `${mood.color}15` : 'white'
              }}
            >
              <div className="mood-emoji">{mood.emoji}</div>
              <div className="mood-label">{mood.label}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedMood && (
        <div className="mood-notes">
          <h3>Add a note (optional)</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's contributing to how you're feeling? Any thoughts you'd like to remember?"
            rows="3"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e9ecef',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              minHeight: '80px'
            }}
          />
        </div>
      )}

      <div className="mood-actions">
        <button
          onClick={saveMoodEntry}
          disabled={!selectedMood}
          style={{
            background: selectedMood ? '#667eea' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: selectedMood ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease'
          }}
        >
          Save Mood Entry
        </button>
      </div>

      {stats && (
        <div className="mood-stats">
          <h3>Your Mood Insights</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalEntries}</div>
                <div className="stat-label">Total Entries</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.last7Days}</div>
                <div className="stat-label">Last 7 Days</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Heart size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {moodOptions.find(m => m.id === stats.mostCommonMood)?.emoji}
                </div>
                <div className="stat-label">Most Common</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {moodHistory.length > 0 && (
        <div className="mood-history">
          <h3>Recent Entries</h3>
          <div className="history-list">
            {moodHistory.slice(0, 5).map((entry) => {
              const mood = moodOptions.find(m => m.id === entry.mood);
              return (
                <div key={entry.id} className="history-item">
                  <div className="history-mood">
                    <span className="history-emoji">{mood?.emoji}</span>
                    <span className="history-label">{mood?.label}</span>
                  </div>
                  <div className="history-date">{entry.date}</div>
                  {entry.notes && (
                    <div className="history-notes">{entry.notes}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        .mood-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .mood-header h2 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .mood-header p {
          color: #666;
        }
        
        .mood-selection h3 {
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .mood-notes {
          margin: 2rem 0;
        }
        
        .mood-notes h3 {
          color: #333;
          margin-bottom: 1rem;
        }
        
        .mood-actions {
          text-align: center;
          margin: 2rem 0;
        }
        
        .mood-stats {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 15px;
        }
        
        .mood-stats h3 {
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }
        
        .stat-card {
          background: white;
          padding: 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .stat-icon {
          color: #667eea;
        }
        
        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #666;
        }
        
        .mood-history {
          margin: 2rem 0;
        }
        
        .mood-history h3 {
          color: #333;
          margin-bottom: 1rem;
        }
        
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .history-item {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
          border-left: 4px solid #667eea;
        }
        
        .history-mood {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .history-emoji {
          font-size: 1.2rem;
        }
        
        .history-label {
          font-weight: 500;
          color: #333;
        }
        
        .history-date {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .history-notes {
          font-size: 0.9rem;
          color: #555;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default MoodTracker;
