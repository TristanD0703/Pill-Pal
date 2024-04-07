import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./AuthContext.tsx";
import React from "react";

export function Protected({children}){
    const {user} = useContext(Context);

    if(!user){
        return <Navigate to="/signin" replace/>
    }else{
        return children;
    }
}