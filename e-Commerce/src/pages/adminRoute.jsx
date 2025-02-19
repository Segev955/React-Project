import { Navigate, Outlet } from "react-router-dom";


function AdminRoute() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if(user && user.admin) {    
    return <Outlet />;
  }
  return <Navigate to="/products" replace />;
}

export default AdminRoute;
