import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      // ✅ store admin data
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="card login-card shadow">
        <div className="card-body p-4">

          {/* HEADER */}
          <div className="text-center mb-4">
            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle mb-0">
              Sign in to your dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text">✉</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">🔒</span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="d-grid">
              <button
                className="btn btn-login"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

          </form>

          {/* FOOTER */}
          <div className="text-center mt-3">
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;