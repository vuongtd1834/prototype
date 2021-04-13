import { fork, ForkEffect } from "redux-saga/effects";
import home from "./home";
import profile from "./profile";

export default function* root(): Generator<ForkEffect<void>, void, unknown> {
    yield fork(home);
    yield fork(profile);
}
