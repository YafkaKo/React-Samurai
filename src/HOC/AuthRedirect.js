import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const authRedirect = (Component ) =>{
  return (props) =>{
      const navigate = useNavigate()
      const isAuth = useSelector(state => state.auth.isAuth);

      useEffect(() => {
        if (isAuth === false) {
          navigate("/login");
        }
      }, [isAuth, navigate]);
      return isAuth ? <Component {...props}/> : null
  }
}

export default authRedirect