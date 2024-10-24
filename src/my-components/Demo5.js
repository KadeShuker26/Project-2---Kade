//------------------------------------------------------------------
// Import necessary sources, dependencies, libraries, other components
import React, {useState} from 'react';
import Fuse from 'fuse.js'; // Import Fuse.js

// Sample FAQ data (expanded with more questions and answers)
const faqData = [
  { question: 'What is Phone Fix?', answer: 'Phone Fix is a system for booking phone repairs.' },
  { question: 'How long does a repair take?', answer: 'Repairs typically take between 2 to 5 days, depending on the issue.' },
  { question: 'Can I track the status of my repair?', answer: 'Yes, once your phone is in for repair, you can track its status through our website using your booking reference.' },
  { question: 'What types of phones can be repaired?', answer: 'We repair all major brands including Apple, Samsung, Google, Huawei, and more.' },
  { question: 'Do you offer a warranty on repairs?', answer: 'Yes, we offer a 6-month warranty on all repairs. The warranty covers any defects in workmanship or replacement parts.' },
  { question: 'How much does a typical repair cost?', answer: 'The cost of a repair depends on the type of repair needed. Screen repairs start at $150, while battery replacements start at $70.' },
  { question: 'Can I get a courtesy phone while my phone is being repaired?', answer: 'Yes, we offer courtesy phones for customers while their phone is being repaired. A small bond may be required.' },
  { question: 'What should I do if my phone is not charging?', answer: 'If your phone is not charging, it may need a battery replacement or a charging port repair. Please bring it to us for diagnosis.' },
  { question: 'Do you repair water-damaged phones?', answer: 'Yes, we can attempt to repair water-damaged phones, but success depends on the extent of the damage. It\'s best to bring it in as soon as possible.' },
  { question: 'Is my data safe during the repair?', answer: 'Yes, we take data privacy seriously and your data is safe with us. However, we recommend backing up your phone before bringing it in for repair.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and online payments. Cash payments are also accepted at our repair centers.' },
  { question: 'How can I contact customer service?', answer: 'You can contact our customer service team via phone at 123-456-7890, or email us at support@phonefix.com.' },
  { question: 'Do you repair tablets and other devices?', answer: 'Yes, in addition to phones, we also repair tablets, smartwatches, and other mobile devices.' },
  { question: 'Can I cancel my repair booking?', answer: 'Yes, you can cancel your booking up to 24 hours before your scheduled repair appointment. Please contact us to do so.' },
  { question: 'Do I need an appointment for a repair?', answer: 'While walk-ins are welcome, we recommend booking an appointment to ensure prompt service.' },
  { question: 'Do you use genuine parts for repairs?', answer: 'Yes, we use genuine or high-quality OEM parts for all our repairs to ensure the best performance.' },
  { question: 'What if the problem with my phone is not fixed?', answer: 'If the problem persists after the repair, please bring your phone back, and we will re-evaluate it under our warranty policy.' },
  { question: 'How do I prepare my phone for a repair?', answer: 'We recommend that you back up your phone and remove any personal data or sensitive information before bringing it in for repair.' },
  { question: 'What happens if I miss my repair appointment?', answer: 'If you miss your appointment, please contact us to reschedule. We will do our best to accommodate your new schedule.' },
  { question: 'Do you offer same-day repairs?', answer: 'Yes, we offer same-day repairs for many common issues such as screen or battery replacements, depending on parts availability.' },
  { question: 'What is the repair process?', answer: 'Our repair process involves diagnosing the issue, ordering parts if needed, and repairing your phone in 3-5 business days.' },
  { question: 'How much does a repair cost?', answer: 'Repair costs vary depending on the issue and model of your phone. Please contact us for an estimate.' },
  { question: 'Do you provide a warranty?', answer: 'Yes, we offer a 90-day warranty on all repairs.' },
  { question: 'Can I track my repair status?', answer: 'Yes, you can track your repair status by entering your job number on our website.' },
];

// Initialize Fuse.js options
const fuseOptions = {
  keys: ['question'],
  threshold: 0.4, // Adjust based on desired fuzziness
};

// Initialize Fuse instance
const fuse = new Fuse(faqData, fuseOptions);

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

    if (userInput.trim() === '') return;

    // Add user's message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'user', message: userInput },
    ]);

    // Perform fuzzy search with Fuse.js
    const fuseResults = fuse.search(userInput);

    // Determine bot's response
    let botResponse = "I'm sorry, I don't have the answer to that question.";

    if (fuseResults.length > 0) {
      const bestMatch = fuseResults[0].item;
      botResponse = bestMatch.answer;
    }

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
