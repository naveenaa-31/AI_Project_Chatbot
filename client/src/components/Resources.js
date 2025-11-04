import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Download, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Resources = ({ userMood }) => {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [userMood]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const mood = userMood || 'general';
      const response = await axios.get(`http://localhost:5000/api/resources/${mood}`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      // Fallback resources
      setResources({
        title: "General Mental Health Resources",
        techniques: [
          "Practice mindfulness and meditation",
          "Maintain regular sleep schedule",
          "Stay connected with supportive people",
          "Engage in regular physical activity"
        ],
        activities: [
          "Journaling your thoughts and feelings",
          "Creative expression through art or music",
          "Spending time in nature",
          "Learning new skills or hobbies"
        ],
        apps: [
          "Headspace - Meditation and mindfulness",
          "Moodpath - Mental health tracking",
          "7 Cups - Online therapy and support",
          "Calm - Sleep and meditation"
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const generalResources = {
    crisis: {
      title: "Crisis Support Resources",
      description: "If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.",
      resources: [
        {
          title: "National Suicide Prevention Lifeline",
          description: "24/7 crisis support",
          contact: "988",
          type: "phone"
        },
        {
          title: "Crisis Text Line",
          description: "Text HOME to 741741",
          contact: "741741",
          type: "text"
        },
        {
          title: "Emergency Services",
          description: "For immediate danger",
          contact: "911",
          type: "emergency"
        }
      ]
    },
    breathing: {
      title: "Breathing Exercises",
      techniques: [
        {
          name: "4-7-8 Breathing",
          steps: [
            "Inhale through your nose for 4 counts",
            "Hold your breath for 7 counts",
            "Exhale through your mouth for 8 counts",
            "Repeat 3-4 times"
          ]
        },
        {
          name: "Box Breathing",
          steps: [
            "Inhale for 4 counts",
            "Hold for 4 counts",
            "Exhale for 4 counts",
            "Hold for 4 counts",
            "Repeat"
          ]
        },
        {
          name: "Diaphragmatic Breathing",
          steps: [
            "Place one hand on chest, one on belly",
            "Breathe deeply so belly rises",
            "Chest should move minimally",
            "Focus on slow, deep breaths"
          ]
        }
      ]
    },
    grounding: {
      title: "Grounding Techniques",
      techniques: [
        {
          name: "5-4-3-2-1 Technique",
          steps: [
            "Name 5 things you can see",
            "Name 4 things you can touch",
            "Name 3 things you can hear",
            "Name 2 things you can smell",
            "Name 1 thing you can taste"
          ]
        },
        {
          name: "Body Scan",
          steps: [
            "Start at your toes",
            "Notice sensations in each body part",
            "Move slowly up to your head",
            "Focus on physical feelings"
          ]
        }
      ]
    }
  };

  if (loading) {
    return (
      <div className="resources-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="loading"></div>
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h2>Mental Health Resources</h2>
        <p>Tools, techniques, and apps to support your mental well-being</p>
      </div>

      {resources && (
        <div className="resource-section">
          <h3>{resources.title}</h3>
          
          {resources.techniques && (
            <div className="resource-category">
              <h4>
                <BookOpen size={20} />
                Coping Techniques
              </h4>
              <ul className="resource-list">
                {resources.techniques.map((technique, index) => (
                  <li key={index} className="resource-item">
                    {technique}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resources.activities && (
            <div className="resource-category">
              <h4>
                <Play size={20} />
                Helpful Activities
              </h4>
              <ul className="resource-list">
                {resources.activities.map((activity, index) => (
                  <li key={index} className="resource-item">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resources.apps && (
            <div className="resource-category">
              <h4>
                <Download size={20} />
                Recommended Apps
              </h4>
              <ul className="resource-list">
                {resources.apps.map((app, index) => (
                  <li key={index} className="resource-item">
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="resource-section">
        <h3>Breathing Exercises</h3>
        <div className="breathing-exercises">
          {generalResources.breathing.techniques.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <h4>{exercise.name}</h4>
              <ol className="exercise-steps">
                {exercise.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <div className="resource-section">
        <h3>Grounding Techniques</h3>
        <div className="grounding-techniques">
          {generalResources.grounding.techniques.map((technique, index) => (
            <div key={index} className="technique-card">
              <h4>{technique.name}</h4>
              <ol className="technique-steps">
                {technique.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <div className="resource-section">
        <h3>Additional Resources</h3>
        <div className="additional-resources">
          <div className="resource-card">
            <h4>Professional Help</h4>
            <ul>
              <li>Find a therapist through Psychology Today</li>
              <li>Contact your insurance provider for covered services</li>
              <li>Look for community mental health centers</li>
              <li>Consider online therapy platforms (BetterHelp, Talkspace)</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>Self-Care Tips</h4>
            <ul>
              <li>Maintain a regular sleep schedule</li>
              <li>Eat nutritious meals regularly</li>
              <li>Stay hydrated throughout the day</li>
              <li>Limit alcohol and caffeine intake</li>
              <li>Practice good hygiene and grooming</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>Building Support</h4>
            <ul>
              <li>Join support groups (online or in-person)</li>
              <li>Connect with friends and family regularly</li>
              <li>Consider volunteering to help others</li>
              <li>Engage in community activities</li>
              <li>Practice active listening with others</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .resources-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .resources-header h2 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .resources-header p {
          color: #666;
        }
        
        .resource-category {
          margin-bottom: 2rem;
        }
        
        .resource-category h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #667eea;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .breathing-exercises,
        .grounding-techniques,
        .additional-resources {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .exercise-card,
        .technique-card,
        .resource-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 15px;
          border-left: 4px solid #667eea;
        }
        
        .exercise-card h4,
        .technique-card h4,
        .resource-card h4 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .exercise-steps,
        .technique-steps {
          padding-left: 1.5rem;
        }
        
        .exercise-steps li,
        .technique-steps li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        
        .resource-card ul {
          list-style: none;
          padding: 0;
        }
        
        .resource-card li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e9ecef;
        }
        
        .resource-card li:last-child {
          border-bottom: none;
        }
        
        @media (max-width: 768px) {
          .breathing-exercises,
          .grounding-techniques,
          .additional-resources {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Resources;
