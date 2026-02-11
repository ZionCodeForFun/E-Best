import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { superbase } from "../../../SuperbaseClient";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await superbase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a1f44", // deep blue
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
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
          Reset Password
        </h2>

        <form
          onSubmit={handleReset}
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
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d62839")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e63946")}
          >
            Update Password
          </button>
        </form>

        {message && (
          <p
            style={{
              color: "#e63946",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
