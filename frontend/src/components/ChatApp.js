





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatApp.css';

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState('Chatbot');
  const [fruits, setFruits] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedFruit, setSelectedFruit] = useState(null);

  useEffect(() => {
    if (activeChat === 'Chatbot') {
      axios.get('https://fruit-ai-backend-eigz.onrender.com/fruits/')
        .then((response) => {
          setFruits(response.data);
          const fruitMessages = response.data.map(fruit => ({
            sender: 'bot',
            text: `Here is the fruit information:`,
            fruit: fruit,
          }));
          setMessages(fruitMessages);
        })
        .catch((error) => {
          console.error('There was an error fetching the fruits!', error);
        });
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);

    const foundFruit = fruits.find(fruit => fruit.name.toLowerCase() === userInput.toLowerCase());

    if (foundFruit) {
      setSelectedFruit(foundFruit);
      setQuantity(1);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Here is the fruit information:`, fruit: foundFruit, quantity: 1 },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Sorry, ${userInput} is not available.` },
      ]);
    }

    setUserInput('');
  };

  const updateQuantity = (increment) => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity + increment, 1);

      setMessages((prevMessages) => prevMessages.map((message) => {
        if (message.fruit && message.fruit.name === selectedFruit?.name) {
          return {
            ...message,
            quantity: newQuantity,
          };
        }
        return message;
      }));

      return newQuantity;
    });
  };

  const dummyChats = ['Craig', 'John Doe', 'Chat Group', 'Will Jenkins', 'Chatbot'];

  return (
    <div className="app-container">
      <div className="chat-list">
        <h2>Chats</h2>
        {dummyChats.map((chat, index) => (
          <div
            key={index}
            className={`chat-item ${activeChat === chat ? 'active' : ''}`}
            onClick={() => setActiveChat(chat)}
          >
            {chat}
          </div>
        ))}
      </div>

      <div className="chat-window">
        {activeChat === 'Chatbot' ? (
          <div className="chat-content">
            <h2>Chatbot</h2>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'user' ? (
                    <p>{message.text}</p>
                  ) : message.fruit ? (
                    <div className="fruit-card">
                      <img src={message.fruit.image_url} alt={message.fruit.name} className="fruit-image"/>
                      <div className="fruit-details">
                        <h4>{message.fruit.name}</h4>

                        <div className="fruit-price-quantity">
                          <p>Price per unit: ${message.fruit.price.toFixed(2)}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(-1)}>-</button>
                            <span>{message.quantity || quantity}</span> {/* Display quantity here */}
                            <button onClick={() => updateQuantity(1)}>+</button>
                          </div>
                        </div>

                        <p className="total-price">Total Price: ${(message.fruit.price * (message.quantity || quantity)).toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter fruit name..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a chat to start the conversation.</p>
        )}
      </div>
    </div>
  );
};

export default ChatApp;



