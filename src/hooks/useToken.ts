import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearTokenAfterLogout } from "../redux/slice/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";

const useToken = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const token: any = useSelector((state: any) => state.token);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
      const decodedJWT: any = jwtDecode(token);
      if (decodedJWT.exp * 1000 < Date.now()) {
        setIsAuth(false);
        localStorage.removeItem("token");
        dispatch(clearTokenAfterLogout());
        navigate("/login", { replace: true });
      }
    } else {
      setIsAuth(false);
      dispatch(clearTokenAfterLogout());
      navigate('/login', {replace: true});
    }
  }, []);

  return {
    isAuth: isAuth,
  };
};

export default useToken;
