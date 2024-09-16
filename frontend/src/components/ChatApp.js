// import React, { useState, useEffect } from 'react';

// import axios from 'axios';
// import './ChatApp.css'

// const ChatApp = () => {
//   const [activeChat, setActiveChat] = useState('Chatbot');  // Default chat is Chatbot
//   const [fruits, setFruits] = useState([]);

//   useEffect(() => {
//     if (activeChat === 'Chatbot') {
//       // Fetch fruits from the backend when "Chatbot" is clicked
//       axios.get('http://localhost:8000/fruits/')
//         .then((response) => {
//             console.log(response.data);
//           setFruits(response.data);
//         })
//         .catch((error) => {
//           console.error('There was an error fetching the fruits!', error);
//         });
//     }
//   }, [activeChat]);

//   const dummyChats = ['Craig', 'John Doe', 'Chat Group', 'Will Jenkins', 'Chatbot'];

//   return (
//     <div className="app-container">
//       <div className="chat-list">
//         <h2>Chats</h2>
//         {dummyChats.map((chat, index) => (
//           <div 
//             key={index} 
//             className={`chat-item ${activeChat === chat ? 'active' : ''}`}
//             onClick={() => setActiveChat(chat)}
//           >
//             {chat}
//           </div>
//         ))}
//       </div>

//       <div className="chat-window">
//         {activeChat === 'Chatbot' ? (
//           <div>
//             <h3>Fruit Information</h3>
//             {fruits.length > 0 ? (
//               fruits.map((fruit) => (
//                 <div key={fruit.id} className="fruit-card">
//                   <img src={fruit.image_url} alt={fruit.name} className="fruit-image"/>
//                   <div className="fruit-details">
//                     <h4>{fruit.name}</h4>
//                     <p>Price: ${fruit.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>Loading fruits...</p>
//             )}
//           </div>
//         ) : (
//           <p>Select a chat to start the conversation.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatApp;












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










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ChatApp.css';

// const ChatApp = () => {
//   const [activeChat, setActiveChat] = useState(''); // No default active chat
//   const [fruits, setFruits] = useState([]);
//   const [messages, setMessages] = useState([]); // Store the messages between user and chatbot
//   const [userInput, setUserInput] = useState(''); // Store user input
//   const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile

//   const [quantity, setQuantity] = useState(1); // Default quantity is 1
//   const [selectedFruit, setSelectedFruit] = useState(null); // Store selected fruit

//   // Detect if the device is mobile based on window width
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Mobile view for screens <= 768px
//     };

//     handleResize(); // Call initially
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch fruits from the backend when "Chatbot" chat is opened
//   useEffect(() => {
//     if (activeChat === 'Chatbot') {
//       axios.get('http://localhost:8000/fruits/')
//         .then((response) => {
//           setFruits(response.data);

//           // Add fruit information to the message list
//           const fruitMessages = response.data.map(fruit => ({
//             sender: 'bot',
//             text: `Here is the fruit information:`,
//             fruit: fruit
//           }));

//           setMessages(fruitMessages); // Display all fruits when user enters Chatbot
//         })
//         .catch((error) => {
//           console.error('There was an error fetching the fruits!', error);
//         });
//     }
//   }, [activeChat]);

//   const handleSendMessage = () => {
//     if (!userInput.trim()) return;

//     // Add user's message to message list
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: userInput }
//     ]);

//     // Find fruit based on user input
//     const foundFruit = fruits.find(fruit => fruit.name.toLowerCase() === userInput.toLowerCase());

//     if (foundFruit) {
//       setSelectedFruit(foundFruit);
//       setQuantity(1); // Reset quantity to 1 when selecting a fruit

//       // If fruit is found, show fruit card with quantity
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: `Here is the fruit information:`, fruit: foundFruit, quantity: 1 }
//       ]);
//     } else {
//       // If fruit is not found, send a "not available" message
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: `Sorry, ${userInput} is not available.` }
//       ]);
//     }

//     setUserInput(''); // Clear input field
//   };

//   // Update quantity and recalculate price
//   const updateQuantity = (increment) => {
//     setQuantity((prevQuantity) => {
//       const newQuantity = Math.max(prevQuantity + increment, 1); // Ensure quantity doesn't go below 1

//       // Update the selected fruit message with the new quantity
//       setMessages((prevMessages) => prevMessages.map((message) => {
//         if (message.fruit && message.fruit.name === selectedFruit.name) {
//           return {
//             ...message,
//             quantity: newQuantity
//           };
//         }
//         return message;
//       }));

//       return newQuantity;
//     });
//   };

//   const dummyChats = ['Craig', 'John Doe', 'Chat Group', 'Will Jenkins', 'Chatbot'];

//   // Function to go back to the chat list on mobile
//   const handleBackToChats = () => {
//     setActiveChat(''); // Deselect chat to return to chat list
//   };

//   return (
//     <div className="app-container">
//       {/* Conditionally show the chat list or chat window based on active chat and mobile state */}
//       {!isMobile || activeChat === '' ? (
//         <div className="chat-list">
//           <h2>Chats</h2>
//           {dummyChats.map((chat, index) => (
//             <div 
//               key={index} 
//               className={`chat-item ${activeChat === chat ? 'active' : ''}`}
//               onClick={() => setActiveChat(chat)}
//             >
//               {chat}
//             </div>
//           ))}
//         </div>
//       ) : null}

//       {activeChat !== '' && (
//         <div className="chat-window">
//           {isMobile && activeChat !== '' && (
//             <button className="back-button" onClick={handleBackToChats}>
//               Back to Chats
//             </button>
//           )}

//           {activeChat === 'Chatbot' ? (
//             <div className="chat-content">
//               <h2>Chatbot</h2>
//               <div className="chat-messages">
//                 {messages.map((message, index) => (
//                   <div key={index} className={`message ${message.sender}`}>
//                     {message.sender === 'user' ? (
//                       <p>{message.text}</p>
//                     ) : message.fruit ? (
//                       <div className="fruit-card">
//                         <img src={message.fruit.image_url} alt={message.fruit.name} className="fruit-image" />
//                         <div className="fruit-details">
//                           <h4>{message.fruit.name}</h4>

//                           {/* Display price and quantity on the same row */}
//                           <div className="fruit-price-quantity">
//                             <p>Price per unit: ${message.fruit.price.toFixed(2)}</p>
//                             <div className="quantity-controls">
//                               <button onClick={() => updateQuantity(-1)}>-</button>
//                               <span>{message.quantity}</span>
//                               <button onClick={() => updateQuantity(1)}>+</button>
//                             </div>
//                           </div>

//                           {/* Display total price below the counter */}
//                           <p className="total-price">Total Price: ${(message.fruit.price * message.quantity).toFixed(2)}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <p>{message.text}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="chat-input">
//                 <input
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   placeholder="Enter fruit name..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//               </div>
//             </div>
//           ) : (
//             <p>Select a chat to start the conversation.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;
