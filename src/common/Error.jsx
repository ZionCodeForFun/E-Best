import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>

      <Link to="/" style={{ color: "#16447e" }}>
        Go back home
      </Link>
    </div>
  );
}
