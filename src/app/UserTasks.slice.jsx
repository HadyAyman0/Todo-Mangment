import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";


export const addTask = createAsyncThunk("UserTasks/addTask", async function ({ values, usertoken }) {

    try {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes`,
            method: "POST",
            headers: {
                token: `3b8ny__${usertoken}`,
            },
            data: values,
        }
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }
})


export const getTask = createAsyncThunk("UserTasks/getTask", async function ({ usertoken }) {
    try {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes`,
            method: "GET",
            headers: {
                token: `3b8ny__${usertoken}`,
            }
        }
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }
})

export const deleteTask = createAsyncThunk("UserTasks/deleteTask", async function ({ usertoken, id }) {

    try {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            method: "DELETE",
            headers: {
                token: `3b8ny__${usertoken}`,
            },
        }
        const { data } = await axios.request(options);
        return data

    } catch (error) {
        console.log(error);
    }

})

export const updateTask = createAsyncThunk("UserTasks/updateTask", async function ({ usertoken, id, values }) {

    try {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            method: "PUT",
            headers: {
                token: `3b8ny__${usertoken}`,
            },
            data: values,
        }
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }

})


const UserTasks = createSlice({
    name: "UserTasks",
    initialState: {
        addTaskData: null,
        isLoading: false,
        getTaskData: null,

    },

    extraReducers: function (builder) {
        builder.addCase(addTask.fulfilled, function (perivousState, action) {
            perivousState.addTaskData = action.payload;
        })
        builder.addCase(addTask.pending, function (perivousState, action) {
            perivousState.isLoading = true;
        })
        builder.addCase(addTask.rejected, function (perivousState, action) {
            perivousState.isLoading = false;
        })
        builder.addCase(getTask.fulfilled, function (perivousState, action) {
            perivousState.getTaskData = action.payload;
            perivousState.isLoading = false
        })
        builder.addCase(getTask.pending, function (perivousState, action) {
            perivousState.isLoading = true;

        })

    }
})

export const usertask = UserTasks.reducer
export const usertaskactions = UserTasks.actions
