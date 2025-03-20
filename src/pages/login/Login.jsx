// CSS
import "./Login";

// React Hooks
import { useState } from "react";

// Methods
import { login } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.accessToken) {
        window.location = "/manage-articles";
      }
    } catch (error) {
      alert("Parol xato kiritildi: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
