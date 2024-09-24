//------------------------------------------------------------------
// Import necessary sources, dependencies, libraries, other components
import React, { useState } from 'react';

// Sample FAQ data (this can be expanded as needed)
const faqData = [
  { question: 'What is the repair process?', answer: 'Our repair process involves diagnosing the issue, ordering parts if needed, and repairing your phone in 3-5 business days.' },
  { question: 'How much does a repair cost?', answer: 'Repair costs vary depending on the issue and model of your phone. Please contact us for an estimate.' },
  { question: 'Do you provide a warranty?', answer: 'Yes, we offer a 90-day warranty on all repairs.' },
  { question: 'Can I track my repair status?', answer: 'Yes, you can track your repair status by entering your job number on our website.' },
];

//------------------------------------------------------------------
// FUNCTIONAL COMPONENT
export const Demo5 = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I assist you today?' },
  ]);

  //----------------------------
  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  //----------------------------
  // Handle chat submission
  const handleChatSubmit = (event) => {
    event.preventDefault();

    // Add user's message to chat history
    setChatHistory([...chatHistory, { sender: 'user', message: userInput }]);

    // Check for matching FAQ
    const faqResponse = faqData.find((faq) =>
      faq.question.toLowerCase().includes(userInput.toLowerCase())
    );

    // Bot's response
    const botResponse = faqResponse
      ? faqResponse.answer
      : "I'm sorry, I don't have the answer to that question.";

    // Add bot's response to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'bot', message: botResponse },
    ]);

    // Clear user input
    setUserInput('');
  };

  //----------------------------
  // Render HTML: Outputs the HTML/JSX to the DOM.
  return (
    <div style={demo5Style}>
      <h2>Chatbot - Ask Me Anything!</h2>

      {/* Chat History */}
      <div style={chatHistoryStyle}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={chat.sender === 'user' ? userMessageStyle : botMessageStyle}
          >
            <p>{chat.message}</p>
          </div>
        ))}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleChatSubmit} style={chatFormStyle}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your question..."
          style={chatInputStyle}
          required
        />
        <button type="submit" style={sendButtonStyle}>Send</button>
      </form>
    </div>
  );
};

//-----------------------------------------------------------------
// Define CSS styles
const demo5Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  minHeight: '70vh',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '10px',
};

const chatHistoryStyle = {
  width: '100%',
  maxWidth: '600px',
  height: '300px',
  border: '2px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  overflowY: 'auto',
  backgroundColor: '#f9f9f9',
};

const chatFormStyle = {
  display: 'flex',
  width: '100%',
  maxWidth: '600px',
  marginTop: '20px',
};

const chatInputStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const sendButtonStyle = {
  padding: '10px 20px',
  marginLeft: '10px',
  fontSize: '16px',
  backgroundColor: '#1a73e8',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const userMessageStyle = {
  textAlign: 'right',
  margin: '5px 0',
};

const botMessageStyle = {
  textAlign: 'left',
  margin: '5px 0',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  padding: '5px',
};

//------------------------------------------------------------------
// Export this Component
export default Demo5;
