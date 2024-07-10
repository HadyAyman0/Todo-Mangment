import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./GoogleToken.slice";



const UserTokenSlice =  createSlice({
    name : "UserToken",
    initialState : {
        usertoken : localStorage.getItem("UserToken"),
    },

    reducers : {
        SetUserToken : function(perivousState , action){
            perivousState.usertoken = action.payload;
            localStorage.setItem("UserToken",perivousState.usertoken)
        },
        LogOut : function(perivousState , action){
            perivousState.usertoken = null;
            localStorage.removeItem("UserToken");
            localStorage.removeItem("GoogleToken");

        },

    }

})

export const UserToken = UserTokenSlice.reducer;
export const UserTokenActions = UserTokenSlice.actions 