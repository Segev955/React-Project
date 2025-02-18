import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LogoutComp({setMainUser}) {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    setMainUser('')
    navigate('/')
  }, [navigate]);


  return (
    <>
    </>
  );
}

export default LogoutComp;
