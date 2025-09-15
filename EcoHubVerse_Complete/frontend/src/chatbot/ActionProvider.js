class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleMessage = async (message) => {
    const response = await this.sendMessageToBackend(message);
    const botMessage = this.createChatBotMessage(response);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  sendMessageToBackend = async (message) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error sending message to backend:', error);
      return "I'm sorry, I'm having trouble connecting to my brain right now.";
    }
  };
}

export default ActionProvider;
