// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css"; 

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberPassword, setRememberPassword] = useState(false);
//   const navigate = useNavigate(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://fruit-ai-backend-eigz.onrender.com/login/", {
//         username: email,
//         password,
//       });

//       const token = response.data.access_token;
//       localStorage.setItem("token", token); // Store the token in localStorage
//       navigate("/home");  // Redirect to home page on success
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <p>By signing in you are agreeing to our <a href="#">Term and privacy policy</a></p>

//         <div className="input-group">
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="input-group">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="remember-forgot">
//           <label>
//             <input
//               type="checkbox"
//               checked={rememberPassword}
//               onChange={() => setRememberPassword(!rememberPassword)}
//             />
//             Remember password
//           </label>
//         </div>

//         <button type="submit" className="login-button">Login</button>
//       </form>
//     </div>
    
//   );
// };

// export default LoginPage;



// src/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fruit-ai-backend-eigz.onrender.com/login/", {
        username: email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token); // Store the token in localStorage
      navigate("/home");  // Redirect to home page on success
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <p>By signing in you are agreeing to our <a href="/terms">Terms and Privacy Policy</a></p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
            Remember password
          </label>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
