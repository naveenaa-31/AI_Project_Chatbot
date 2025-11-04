import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Globe, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/emergency');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      // Fallback emergency contacts
      setContacts({
        us: {
          suicide: "988 - Suicide & Crisis Lifeline",
          crisis: "988 - Crisis Text Line (text HOME to 741741)",
          general: "211 - Community Resources and Information"
        },
        international: {
          uk: "116 123 - Samaritans",
          canada: "1-833-456-4566 - Crisis Services Canada",
          australia: "13 11 14 - Lifeline Australia"
        },
        note: "If you're in immediate danger, please call emergency services (911 in the US) or go to your nearest emergency room."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (number) => {
    // Extract phone number from the contact string
    const phoneNumber = number.split(' - ')[0];
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleText = (number) => {
    // For text lines, open messaging app
    const phoneNumber = number.split(' - ')[0];
    window.open(`sms:${phoneNumber}`, '_self');
  };

  if (loading) {
    return (
      <div className="emergency-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="loading"></div>
          <p>Loading emergency contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="emergency-container">
      <div className="emergency-warning">
        <AlertTriangle size={32} />
        <h3>Emergency Support Available 24/7</h3>
        <p>If you're in immediate danger or having thoughts of self-harm, please reach out for help right away. You are not alone, and there are people who want to help you.</p>
      </div>

      {contacts && (
        <>
          <div className="contact-section">
            <h4>
              <Phone size={20} />
              United States Crisis Lines
            </h4>
            <div className="contact-list">
              <div className="contact-item emergency">
                <div className="contact-info">
                  <div className="contact-name">Emergency Services</div>
                  <div className="contact-description">For immediate danger</div>
                  <div className="contact-number">911</div>
                </div>
                <button 
                  className="contact-button emergency-btn"
                  onClick={() => handleCall('911')}
                >
                  <Phone size={20} />
                  Call Now
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">Suicide & Crisis Lifeline</div>
                  <div className="contact-description">24/7 crisis support</div>
                  <div className="contact-number">{contacts.us.suicide}</div>
                </div>
                <button 
                  className="contact-button"
                  onClick={() => handleCall(contacts.us.suicide)}
                >
                  <Phone size={20} />
                  Call
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">Crisis Text Line</div>
                  <div className="contact-description">Text support 24/7</div>
                  <div className="contact-number">{contacts.us.crisis}</div>
                </div>
                <button 
                  className="contact-button text-btn"
                  onClick={() => handleText('741741')}
                >
                  <MessageSquare size={20} />
                  Text
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">Community Resources</div>
                  <div className="contact-description">Local support and information</div>
                  <div className="contact-number">{contacts.us.general}</div>
                </div>
                <button 
                  className="contact-button"
                  onClick={() => handleCall(contacts.us.general)}
                >
                  <Phone size={20} />
                  Call
                </button>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h4>
              <Globe size={20} />
              International Crisis Lines
            </h4>
            <div className="contact-list">
              {Object.entries(contacts.international).map(([country, number]) => (
                <div key={country} className="contact-item">
                  <div className="contact-info">
                    <div className="contact-name">
                      {country.charAt(0).toUpperCase() + country.slice(1)}
                    </div>
                    <div className="contact-description">Crisis support</div>
                    <div className="contact-number">{number}</div>
                  </div>
                  <button 
                    className="contact-button"
                    onClick={() => handleCall(number)}
                  >
                    <Phone size={20} />
                    Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="emergency-info">
        <h4>What to Expect When You Call</h4>
        <div className="info-grid">
          <div className="info-card">
            <h5>Immediate Response</h5>
            <p>Crisis counselors are available 24/7 to listen and provide support.</p>
          </div>
          <div className="info-card">
            <h5>Confidential</h5>
            <p>Your conversation is private and confidential. You can share as much or as little as you want.</p>
          </div>
          <div className="info-card">
            <h5>Non-Judgmental</h5>
            <p>Crisis counselors are trained to listen without judgment and provide compassionate support.</p>
          </div>
          <div className="info-card">
            <h5>Resources</h5>
            <p>They can help connect you with local mental health resources and support services.</p>
          </div>
        </div>
      </div>

      <div className="safety-plan">
        <h4>Creating a Safety Plan</h4>
        <div className="safety-steps">
          <div className="safety-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h5>Warning Signs</h5>
              <p>Identify your personal warning signs that indicate you might be in crisis.</p>
            </div>
          </div>
          <div className="safety-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h5>Coping Strategies</h5>
              <p>List activities and strategies that help you feel better when you're struggling.</p>
            </div>
          </div>
          <div className="safety-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h5>Support People</h5>
              <p>Identify trusted friends, family members, or professionals you can reach out to.</p>
            </div>
          </div>
          <div className="safety-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h5>Professional Help</h5>
              <p>Have contact information for mental health professionals and crisis services.</p>
            </div>
          </div>
          <div className="safety-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h5>Safe Environment</h5>
              <p>Remove or limit access to means of self-harm and create a safe space.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="emergency-note">
        <p><strong>Important:</strong> {contacts?.note}</p>
      </div>

      <style jsx>{`
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .contact-item {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 15px;
          border-left: 4px solid #667eea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .contact-item.emergency {
          border-left-color: #ff6b6b;
          background: linear-gradient(135deg, #ff6b6b15 0%, #ee5a2415 100%);
        }
        
        .contact-info {
          flex: 1;
        }
        
        .contact-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.25rem;
        }
        
        .contact-description {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .contact-number {
          font-weight: bold;
          color: #667eea;
          font-size: 1.1rem;
        }
        
        .contact-item.emergency .contact-number {
          color: #ff6b6b;
        }
        
        .contact-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .contact-button:hover {
          background: #5a6fd8;
          transform: scale(1.05);
        }
        
        .contact-button.emergency-btn {
          background: #ff6b6b;
        }
        
        .contact-button.emergency-btn:hover {
          background: #ff5252;
        }
        
        .contact-button.text-btn {
          background: #4CAF50;
        }
        
        .contact-button.text-btn:hover {
          background: #45a049;
        }
        
        .emergency-info {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 15px;
        }
        
        .emergency-info h4 {
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .info-card {
          background: white;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
        }
        
        .info-card h5 {
          color: #667eea;
          margin-bottom: 0.5rem;
        }
        
        .info-card p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .safety-plan {
          margin: 2rem 0;
        }
        
        .safety-plan h4 {
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .safety-steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .safety-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .step-number {
          background: #667eea;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .step-content h5 {
          color: #333;
          margin-bottom: 0.25rem;
        }
        
        .step-content p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .emergency-note {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 10px;
          padding: 1rem;
          text-align: center;
          color: #856404;
        }
        
        @media (max-width: 768px) {
          .contact-item {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .contact-button {
            align-self: center;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EmergencyContacts;
