import {
    takeLatest,
    all,
    put,
    AllEffect,
    ForkEffect,
} from "redux-saga/effects";
import {
    fetchDataRequested,
    fetchDataReceived,
    fetchDataFailure,
} from "@Reducers/profile";

import { PayloadAction } from "@reduxjs/toolkit";
interface IProfileData {
    text: string;
}

function* getProfileData(action: PayloadAction<IProfileData>) {
    try {
        yield put(fetchDataReceived({ text: action.payload.text }));
    } catch (error) {
        yield put(fetchDataFailure(yield error));
    }
}

export default function* profile(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
> {
    yield all([takeLatest(fetchDataRequested.type, getProfileData)]);
}
