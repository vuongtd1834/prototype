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
} from "@Reducers/home";

import { PayloadAction } from "@reduxjs/toolkit";
interface IHomeData {
    text: string;
}

function* getHomeData(action: PayloadAction<IHomeData>) {
    try {
        yield put(fetchDataReceived({ text: action.payload.text }));
    } catch (error) {
        yield put(fetchDataFailure(yield error));
    }
}

export default function* home(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
> {
    yield all([takeLatest(fetchDataRequested.type, getHomeData)]);
}
