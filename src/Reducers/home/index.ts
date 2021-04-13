import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const INITIAL_STATE = {
    isFetching: false,
    data: {},
    errors: {},
};

const homeSlice = createSlice({
    name: "home",
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
} = homeSlice.actions;

export default combineReducers({
    test: homeSlice.reducer,
});
