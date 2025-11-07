// Sentiment Analysis Library
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// -------------------------------
// Mental Health Chatbot Logic
// -------------------------------

const responses = {
  greeting: [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Hi there! I'm your mental health companion. What's on your mind?",
    "Welcome! I'm here to help you through whatever you're experiencing. How can I support you today?"
  ],

  anxiety: [
    "I understand that anxiety can feel overwhelming. Let's try some breathing exercises together. Take a deep breath in for 4 counts, hold for 4, and exhale for 6. Would you like to try this?",
    "Anxiety is a natural response, but it doesn't have to control you. What specific thoughts or situations are making you feel anxious right now?",
    "It's okay to feel anxious. Let's focus on what you can control in this moment. Can you name three things you can see around you?"
  ],

  depression: [
    "I hear that you're going through a difficult time. Depression can make everything feel heavy, but you're not alone in this. What's one small thing that brought you even a tiny bit of comfort recently?",
    "Depression can feel like a dark cloud, but remember that feelings are temporary. Have you been able to maintain any routines that help you feel grounded?",
    "It takes courage to talk about depression. What would you like to do today that might help you feel even slightly better?"
  ],

  stress: [
    "Stress can feel overwhelming, but let's break it down. What's the most pressing thing on your mind right now?",
    "When we're stressed, our minds can race. Let's try a grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "Stress is your body's way of responding to challenges. What are some healthy ways you've coped with stress in the past?"
  ],

  loneliness: [
    "Feeling lonely can be really difficult. Remember that reaching out like this is a positive step.",
    "Loneliness is a common human experience. What activities or interests make you feel most like yourself?",
    "You're not alone in feeling lonely. What would help you feel more connected today?"
  ],

  general: [
    "Thank you for sharing that with me. How does talking about it make you feel?",
    "I'm listening. Can you tell me more about what's been on your mind?",
    "That sounds really challenging. What would be most helpful for you right now?",
    "I appreciate you opening up. What's one thing that might help you feel better today?"
  ],

  crisis: [
    "I'm concerned about your safety. If you're having thoughts of hurting yourself, please reach out to a crisis helpline immediately.",
    "Your safety is the most important thing. Please contact emergency services or a crisis helpline if you're in immediate danger."
  ]
};


// -------------------------------
// Mood Resources (FULL VERSION)
// -------------------------------

const moodResources = {
  anxiety: {
    title: "Anxiety Support Resources",
    techniques: [
      "4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8",
      "Progressive Muscle Relaxation",
      "5-4-3-2-1 Grounding Technique",
      "Mindful meditation for 5-10 minutes"
    ],
    activities: [
      "Gentle yoga or stretching",
      "Walking in nature",
      "Journaling your thoughts",
      "Listening to calming music"
    ],
    apps: [
      "Headspace - Guided meditation",
      "Calm - Sleep and meditation",
      "Insight Timer - Free meditation app",
      "Breathe2Relax - Breathing exercises"
    ]
  },

  depression: {
    title: "Depression Support Resources",
    techniques: [
      "Behavioral Activation - Do one small positive activity",
      "Gratitude journaling - Write 3 things you're grateful for",
      "Social connection - Reach out to one person",
      "Physical activity - Even a short walk helps"
    ],
    activities: [
      "Maintain a regular sleep schedule",
      "Eat regular, nutritious meals",
      "Spend time in sunlight or nature",
      "Engage in creative activities"
    ],
    apps: [
      "Moodpath - Depression screening and tracking",
      "Daylio - Mood and activity tracking",
      "Sanvello - Anxiety and depression support",
      "7 Cups - Online therapy and support"
    ]
  },

  stress: {
    title: "Stress Management Resources",
    techniques: [
      "Time management and prioritization",
      "Setting healthy boundaries",
      "Problem-solving approach",
      "Mindfulness and present-moment awareness"
    ],
    activities: [
      "Regular exercise or physical activity",
      "Hobbies and creative outlets",
      "Social support and connection",
      "Adequate rest and relaxation"
    ],
    apps: [
      "MyLife - Stress and mood tracking",
      "Ten Percent Happier - Meditation for skeptics",
      "Stop, Breathe & Think - Mindfulness app",
      "Forest - Focus and productivity"
    ]
  }
};


// -------------------------------
// Sentiment Score Function
// -------------------------------

function getSentimentScore(message) {
  const result = sentiment.analyze(message);
  return result.score;
}


// -------------------------------
// Mood Detection
// -------------------------------

function detectMood(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("suicide") || lowerMessage.includes("kill myself") ||
      lowerMessage.includes("end it all") || lowerMessage.includes("not worth living")) {
    return "crisis";
  }

  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") ||
      lowerMessage.includes("worried") || lowerMessage.includes("panic")) {
    return "anxiety";
  }

  if (lowerMessage.includes("depressed") || lowerMessage.includes("depression") ||
      lowerMessage.includes("sad") || lowerMessage.includes("hopeless") ||
      lowerMessage.includes("empty")) {
    return "depression";
  }

  if (lowerMessage.includes("stressed") || lowerMessage.includes("stress") ||
      lowerMessage.includes("overwhelmed") || lowerMessage.includes("pressure")) {
    return "stress";
  }

  if (lowerMessage.includes("lonely") || lowerMessage.includes("alone") ||
      lowerMessage.includes("isolated") || lowerMessage.includes("disconnected")) {
    return "loneliness";
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") || lowerMessage.includes("start")) {
    return "greeting";
  }

  return "general";
}


// -------------------------------
// Chatbot Response
// -------------------------------

function getChatbotResponse(message, userMood = null, conversationHistory = []) {
  let detectedMood = userMood || detectMood(message);

  // ✅ Sentiment Analysis Integration
  const score = getSentimentScore(message);

  // Negative sentiment → depression
  if (score < -3 && detectedMood === "general") detectedMood = "depression";

  // Very positive → greeting
  if (score > 3 && detectedMood === "general") detectedMood = "greeting";

  const moodResponses = responses[detectedMood] || responses.general;
  const randomResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)];

  let finalResponse = randomResponse;

  if (conversationHistory.length > 0) {
    const last = conversationHistory[conversationHistory.length - 1];
    if (last.type === "crisis") {
      finalResponse = "I'm still here with you. How are you feeling now?";
    }
  }

  return {
    message: finalResponse,
    type: detectedMood,
    sentiment: score,
    timestamp: new Date().toISOString(),
    suggestions: getSuggestions(detectedMood)
  };
}


// -------------------------------
// Suggestions
// -------------------------------

function getSuggestions(mood) {
  const suggestions = {
    anxiety: ["Try breathing exercises", "Practice grounding techniques", "Take a short walk"],
    depression: ["Do one small positive activity", "Reach out to someone you trust", "Get some sunlight"],
    stress: ["Take a break", "Practice time management", "Try relaxation techniques"],
    loneliness: ["Connect with a friend", "Join a community activity", "Practice self-compassion"],
    general: ["Take care of yourself", "Be patient with yourself", "Remember you're not alone"]
  };

  return suggestions[mood] || suggestions.general;
}


// -------------------------------
// Mood Resources Function
// -------------------------------

function getMoodResources(mood) {
  return moodResources[mood] || {};
}


// -------------------------------
// ✅ Emergency Contacts Function (FIXED)
// -------------------------------

function getEmergencyContacts() {
  return emergencyContacts;
}


// -------------------------------
// Exports
// -------------------------------

module.exports = {
  getChatbotResponse,
  getMoodResources,
  getEmergencyContacts,
  detectMood
};
