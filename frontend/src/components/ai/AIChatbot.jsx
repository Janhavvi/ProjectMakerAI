// src/components/ai/AIChatbot.jsx

import {
  useState
} from 'react';

import './AIChatbot.css';

function AIChatbot() {

  const [messages, setMessages] =
    useState([
      {
        sender: 'AI',
        text:
          'Hello! How can I help you build your website today?'
      }
    ]);

  const [input, setInput] =
    useState('');

  const sendMessage = () => {

    if (!input) return;

    setMessages([
      ...messages,
      {
        sender: 'User',
        text: input
      },

      {
        sender: 'AI',
        text:
          'AI assistant response coming soon...'
      }
    ]);

    setInput('');
  };

  return (
    <div className="ai-chatbot">

      <div className="chat-header">
        AI Assistant
      </div>

      <div className="chat-messages">

        {messages.map(
          (message, index) => (

            <div
              className={
                message.sender === 'AI'
                  ? 'message ai'
                  : 'message user'
              }

              key={index}
            >

              {message.text}

            </div>

          )
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask AI anything..."

          value={input}

          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default AIChatbot;