import React from 'react';
import './about.css'; // Ensure this CSS file is linked

const About = ({ closeModal }) => {
  return (
    <>
      {/* Background overlay with blur */}
      <div className="modal-overlay" onClick={closeModal}></div>

      {/* Modal content */}
      <div className="modal-content">
        <h2>About Us</h2>
        <p>
          Welcome to Fruit.AI! We aim to provide the best AI-powered solutions to make your life easier and healthier.
          Our services include real-time chat, translations, and more to help you stay connected and informed.
        </p>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </>
  );
};

export default About;
