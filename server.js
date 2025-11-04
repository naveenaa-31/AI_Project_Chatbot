const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import chatbot logic
const { getChatbotResponse, getMoodResources, getEmergencyContacts } = require('./chatbot/mentalHealthBot');

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userMood, conversationHistory } = req.body;
    const response = await getChatbotResponse(message, userMood, conversationHistory);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again.',
      type: 'error'
    });
  }
});

app.get('/api/resources/:mood', (req, res) => {
  try {
    const { mood } = req.params;
    const resources = getMoodResources(mood);
    res.json(resources);
  } catch (error) {
    console.error('Resources error:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.get('/api/emergency', (req, res) => {
  try {
    const contacts = getEmergencyContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Emergency contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch emergency contacts' });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
