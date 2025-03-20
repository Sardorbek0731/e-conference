import "./Login.css";
import { useState } from "react";
import { login } from "../../services/authService";
import logo from "../../assets/logo/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = (boolean) => {
    localStorage.setItem("logined", JSON.stringify(boolean));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.accessToken) {
        window.location = "/manage-articles";
        setLogin(true);
      }
    } catch (err) {
      alert("Email yoki parol xato kiritildi, iltimos qaytadan tekshiring !");
      console.log(err);
    }
  };

  return (
    <section className="login">
      <div className="loginLogo">
        <img src={logo} alt="Logo Image" />
      </div>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            className="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Next</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
