import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

const Chat = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with our AI Assistant</h2>
      <div style={{ maxWidth: '350px', margin: 'auto' }}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default Chat;
