import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {usertoken} = useSelector(function(store){
        return store.UserToken
    })

    if(usertoken){
        return children ;
    }else{
       return <Navigate to="/auth/login" />
    }



}
