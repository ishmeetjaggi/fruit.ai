import React, { useState, useEffect } from 'react';
import './FAQ.css'; // Import the corresponding CSS

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [isAddFAQOpen, setIsAddFAQOpen] = useState(false); // For opening Add FAQ form
  const [newQuestion, setNewQuestion] = useState(''); // For new FAQ question
  const [newAnswer, setNewAnswer] = useState(''); // For new FAQ answer

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const response = await fetch('http://localhost:8000/faqs'); // Adjust URL as needed
    const data = await response.json();
    setFaqs(data);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id, question, answer) => {
    setEditId(id);
    setEditQuestion(question);
    setEditAnswer(answer);
  };

  const handleSave = async () => {
    await fetch(`http://localhost:8000/faqs/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: editQuestion, answer: editAnswer }),
    });
    fetchFAQs();
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/faqs/${id}`, { method: 'DELETE' });
    fetchFAQs();
  };

  const handleAddFAQ = async () => {
    const response = await fetch('http://localhost:8000/newfaq/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
    });

    if (response.ok) {
      setNewQuestion('');
      setNewAnswer('');
      setIsAddFAQOpen(false);
      fetchFAQs(); // Reload FAQs after adding a new one
    }
  };

  return (
    <div className="faqpage-container">
      <header className="header">
        <h1>FAQs</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <button onClick={() => setIsAddFAQOpen(true)} className="add-faq-button">
        Add FAQ
      </button>

      <div className="faq-container">
        {faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase())).map(faq => (
          <div key={faq.id} className="faq-item">
            <div className="faq-content">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
            <div className="faq-actions">
              <button onClick={() => handleEdit(faq.id, faq.question, faq.answer)}>Edit</button>
              <button onClick={() => handleDelete(faq.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editId && (
        <div className="edit-modal">
          <h2>Edit FAQ</h2>
          <input
            type="text"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <textarea
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}

      {isAddFAQOpen && (
        <div className="edit-modal">
          <h2>Add FAQ</h2>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <textarea
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddFAQ}>Add</button>
          <button onClick={() => setIsAddFAQOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
