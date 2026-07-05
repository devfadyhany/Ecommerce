import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { token, userRole } = useContext(AuthContext);

  if (!token || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
