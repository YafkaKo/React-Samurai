import React, { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../redux/redux-store"


function authRedirect<T extends object>(WrappedComponent: React.ComponentType<T>):FC<T> {
  const RedirectComponent:FC<T> = (props) => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return isAuth ? <WrappedComponent {...props} /> : null;
  };

  return RedirectComponent;
}
export default authRedirect