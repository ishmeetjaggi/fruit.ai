import LoginPage from './components/LoginPage';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatApp from './components/ChatApp';
import FAQ from './components/FAQ';
import Verification from './components/verification';
import AuthForm from './components/AuthForm';
import About from './components/about';

function App() {
  return (
    // <div className="App">

    
      
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/chat" element={<ChatApp/>}/>
        <Route path="/faqs" element={<FAQ/>}/>
        <Route path="/verification" element={<Verification/>}/>
        <Route path="/signup" element={<AuthForm />} />  {/* New route for signup */}
        <Route path="/signin" element={<AuthForm />} /> 
        <Route path="/about" element={<About/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;