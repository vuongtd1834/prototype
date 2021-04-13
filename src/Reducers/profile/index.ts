import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const INITIAL_STATE = {
    isFetching: false,
    data: {},
    errors: {},
};

const profileSlice = createSlice({
    name: "profile",
    initialState: INITIAL_STATE,
    reducers: {
        fetchDataRequested: (
            state,
            action: PayloadAction<{ text: string }>
        ) => ({
            ...state,
            isFetching: !!action,
        }),
        fetchDataReceived: (
            state,
            action: PayloadAction<{ text: string }>
        ) => ({
            ...state,
            isFetching: false,
            data: { ...action.payload },
        }),
        fetchDataFailure: (state, action: PayloadAction<{ text: string }>) => ({
            ...state,
            isFetching: false,
            errors: { ...action.payload },
        }),
        reset: state => ({
            ...state,
            ...INITIAL_STATE,
        }),
    },
});

export const {
    fetchDataRequested,
    fetchDataReceived,
    fetchDataFailure,
} = profileSlice.actions;

export default combineReducers({
    test: profileSlice.reducer,
});
