const axios = require('axios');

exports.detectIntent = async (message) => {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'phi3:mini',
      prompt: `You are an intent detection system. Analyze the following user message and classify it into one of these intents:
        - General Inquiry
        - Feedback/Suggestion
        - Collaboration Opportunity
        - Portfolio Appreciation
        - Complaint or Issue
        - Job/Internship Opportunity
        - Personal Message
        - Technical Support
        - Business Inquiry
        - Networking Request
        - Event Invitation
        - Other

        Message: "${message}"

        Reply ONLY with the intent category. Do not include any extra explanation.`,
      stream: false
    });

    const result = response.data.response.trim();
    console.log("🧠 Detected Intent:", result);
    return result;
  } catch (error) {
    console.error("Intent detection failed:", error.message);
    return "Unknown Intent";
  }
};
