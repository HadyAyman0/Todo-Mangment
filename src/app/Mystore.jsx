import { configureStore } from "@reduxjs/toolkit";
import { googleToken } from "./GoogleToken.slice";
import { UserToken } from "./UserToken.slice";
import { usertask } from "./UserTasks.slice";

export  const MyStore = configureStore({
    reducer:{
        googleToken,
        UserToken,
        usertask,
    }
})

