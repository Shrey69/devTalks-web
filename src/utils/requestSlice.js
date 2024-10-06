import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        acceptRequest: (state, action)=> {
            return action.payload;
        },
        rejectRequest: (state, action) => {
            const newArray = state.filter((r) => r._id != action.payload)
            return newArray
        },
    }
})

export const {acceptRequest, rejectRequest} = requestSlice.actions;

export default requestSlice.reducer;