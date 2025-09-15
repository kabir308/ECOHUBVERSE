import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hello! I'm the EcoHubVerse assistant. How can I help you today?`)],
  botName: 'EcoHubVerse Assistant',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#37b782',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;
