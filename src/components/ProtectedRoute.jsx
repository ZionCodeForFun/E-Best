import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { superbase } from "../SuperbaseClient";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      // 1. Get logged-in user (Supabase v2)
      const {
        data: { user },
        error,
      } = await superbase.auth.getUser();

      if (error || !user) {
        setLoading(false);
        return;
      }

      // 2. Check if user exists in admins table
      const { data: admin, error: adminError } = await superbase
        .from("admins")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!adminError && admin) {
        setAllowed(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return null;
  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
