import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const GoogleToken =  createSlice({
    name : "GoogleToken",
    initialState : {
        response : JSON.parse(localStorage.getItem("GoogleToken")),
    },
    reducers : {
        SetResponse : function(previousState , action){
            previousState.response = action.payload;
            // localStorage.setItem("GoogleToken",JSON.stringify(previousState.response = action.payload))
        }
    }

})

export const googleToken =  GoogleToken.reducer;
export const actions = GoogleToken.actions;



