import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    //  Temporarily reading the token and role from localStorage until the AuthContext is ready.  
    
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role'); 

    if (!token || userRole !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

