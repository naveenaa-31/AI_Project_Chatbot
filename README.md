# Mindful Companion - Mental Health Chatbot

A supportive mental health chatbot application designed to provide emotional support, mood tracking, and mental health resources.

## Features

### 🤖 Intelligent Chatbot
- Context-aware responses based on user's emotional state
- Crisis detection and appropriate resource recommendations
- Supportive conversation flow with helpful suggestions
- Real-time mood detection from conversation

### 📊 Mood Tracking
- Visual mood selection with emoji-based interface
- Daily mood logging with optional notes
- Mood history and pattern analysis
- Personal insights and statistics

### 📚 Mental Health Resources
- Personalized resources based on current mood
- Breathing exercises and grounding techniques
- Coping strategies and helpful activities
- Recommended mental health apps

### 🚨 Emergency Support
- 24/7 crisis hotline information
- International emergency contacts
- Safety planning guidance
- Immediate access to professional help

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, CSS3
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Install backend dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run server
```
The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```
The frontend will run on `http://localhost:3000`

### Full Stack Development
From the root directory, run both servers simultaneously:
```bash
npm run dev
```

## Usage

### Chat Interface
- Start a conversation by typing your thoughts or feelings
- The chatbot will respond with supportive messages
- Use the suggested responses for quick interactions
- The system detects your mood and adjusts responses accordingly

### Mood Tracking
- Select your current mood from the visual interface
- Add optional notes about what's contributing to your feelings
- View your mood history and patterns
- Track your emotional well-being over time

### Resources
- Access personalized mental health resources
- Learn breathing exercises and grounding techniques
- Discover helpful activities and coping strategies
- Find recommended mental health apps

### Emergency Support
- Access crisis hotlines and emergency contacts
- Learn about creating a safety plan
- Get immediate help when needed
- Find professional mental health resources

## API Endpoints

### Chat
- `POST /api/chat` - Send a message to the chatbot
  - Body: `{ message: string, userMood: string, conversationHistory: array }`
  - Returns: Chatbot response with suggestions

### Resources
- `GET /api/resources/:mood` - Get resources for specific mood
  - Returns: Personalized mental health resources

### Emergency
- `GET /api/emergency` - Get emergency contact information
  - Returns: Crisis hotlines and emergency contacts

## Mental Health Features

### Crisis Detection
The chatbot is trained to detect crisis situations and respond appropriately by:
- Providing immediate crisis resources
- Encouraging professional help
- Offering supportive, non-judgmental responses

### Mood-Aware Responses
The system adapts its responses based on detected mood:
- **Anxiety**: Breathing exercises, grounding techniques
- **Depression**: Encouragement, small positive activities
- **Stress**: Time management, relaxation techniques
- **Loneliness**: Connection strategies, self-compassion

### Safety Features
- Crisis hotline integration
- Emergency contact information
- Safety planning guidance
- Professional resource recommendations

## Important Disclaimers

⚠️ **This chatbot is not a replacement for professional mental health care.**

- For immediate crisis situations, contact emergency services (911) or a crisis hotline
- This tool is designed to provide support and resources, not medical advice
- Always consult with qualified mental health professionals for treatment
- If you're having thoughts of self-harm, please reach out for immediate help

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you need help with this application or have questions about mental health resources, please:
- Contact a mental health professional
- Reach out to crisis support services
- Consult with your healthcare provider

## Crisis Resources

### United States
- **Suicide & Crisis Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

### International
- **UK**: 116 123 (Samaritans)
- **Canada**: 1-833-456-4566
- **Australia**: 13 11 14

Remember: You are not alone, and help is available 24/7.
