import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute() {
  const user = sessionStorage.getItem("user");

  if(user) {    
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
