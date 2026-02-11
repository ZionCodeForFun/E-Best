import { useState } from "react";
import { superbase } from "../../../SuperbaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
     setLoading(true)
    try {
      const { data, error } = await superbase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

        const { data: adminData } = await superbase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (!adminData) {
      await superbase.auth.signOut();
      setErrorMsg("Access denied.");
      return;
    }
      setLoading(false)
      navigate("/admin"); 
    } catch (error) {
      setErrorMsg(error.message || "Login failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg("Please enter your email to reset password");
      return;
    }

    const { error } = await superbase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setErrorMsg("Check your email for password reset link");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a1f44", // deep blue background
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff", // form white
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#0a1f44",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          Admin Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#0a1f44",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#0a1f44",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "8px",
              backgroundColor: "#e63946", // accent red
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#d62839")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#e63946")
            }
          >
            {loading? "Logging..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleForgotPassword}
          style={{
            marginTop: "1rem",
            background: "transparent",
            border: "none",
            color: "#e63946",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "500",
            textDecoration: "underline",
            display: "block",
            width: "100%",
            textAlign: "center",
          }}
        >
          Forgot Password?
        </button>

        {errorMsg && (
          <p
            style={{ color: "#e63946", marginTop: "1rem", textAlign: "center" }}
          >
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
