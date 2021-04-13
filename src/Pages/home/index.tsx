import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "@Reducers/IStore";

import { fetchDataRequested } from "@Reducers/home";

const Home = (): JSX.Element => {
    const dispatch = useDispatch();
    const home = useSelector((state: IStore) => state.home.test);

    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(fetchDataRequested({ text: "Home Page" }));
    }, [dispatch]);

    useEffect(() => {
        if (home?.data) {
            setText(home.data.text);
        }
    }, [home]);

    return <div>{text}</div>;
};

export default Home;
