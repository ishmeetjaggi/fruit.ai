

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css';  // Ensure the path to your CSS is correct
// import AboutModal from './AboutModal';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="homepage-container">
//       <header className="header">
//         <h1>Fruit.AI</h1>
//         <p>"Be Healthy!"</p>
//       </header>

//       <div className="card-container">
//         <div className="card chat-card" onClick={() => navigate('/signup')}>
//           <h2>Chat</h2>
//         </div>
//         <div className="card empty-card1"></div>
        
//         <div className="card translate-card" onClick={() => alert('Translate Clicked')}>
//           <img src="translate-icon.png" alt="Translate" />
//         </div>
//         <div className="card empty-card2"></div>
//         <div className="card empty-card3"></div>
//         <div className="card faqs-card" onClick={() => navigate('/faqs')}>
//           <h2>FAQs</h2>
//         </div>
//         <div className="card empty-card4"></div>
//         <div className="card about-card" onClick={openAboutModal}>
//           <h2>About</h2>
//         </div>
//         {/* Empty Cards */}
        
        
//       </div>

//       <div className="dots">
//         <span className="dot"></span>
//         <span className="dot"></span>
//         <span className="dot"></span>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from 'react';
import './HomePage.css';  // Ensure the path to your CSS is correct
import About from './about'; // Import the About component directly
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showAboutModal, setShowAboutModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();  // Initialize navigate function from react-router-dom

  const openAboutModal = () => {
    setShowAboutModal(true); // Opens the modal when the About card is clicked
  };

  const closeAboutModal = () => {
    setShowAboutModal(false); // Closes the modal when the close button or overlay is clicked
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Fruit.AI</h1>
        <p>"Be Healthy!"</p>
      </header>

      <div className="card-container">
        {/* Navigate to Chat page on click */}
        <div className="card chat-card" onClick={() => navigate('/chat')}>
          <h2>Chat</h2>
        </div>
        <div className="card empty-card1"></div>

        {/* Placeholder for Translate card */}
        <div className="card translate-card" onClick={() => alert('Translate Clicked')}>
          <h2>Translate</h2>
        </div>
        <div className="card empty-card2"></div>
        <div className="card empty-card3"></div>

        {/* Navigate to FAQs page on click */}
        <div className="card faqs-card" onClick={() => navigate('/faqs')}>
          <h2>FAQs</h2>
        </div>
        <div className="card empty-card4"></div>

        {/* Open the About modal */}
        <div className="card about-card" onClick={openAboutModal}>
          <h2>About</h2>
        </div>
      </div>

      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      {/* Render the About modal if showAboutModal is true */}
      {showAboutModal && <About closeModal={closeAboutModal} />}
    </div>
  );
};

export default HomePage;
