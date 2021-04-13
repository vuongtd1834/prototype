import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "@Reducers/IStore";

import { fetchDataRequested } from "@Reducers/profile";

const Profile = (): JSX.Element => {
    const dispatch = useDispatch();
    const profile = useSelector((state: IStore) => state.profile.test);

    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(fetchDataRequested({ text: "Profile Page" }));
    }, [dispatch]);

    useEffect(() => {
        if (profile?.data) {
            setText(profile.data.text);
        }
    }, [profile]);

    return <div>{text}</div>;
};

export default Profile;
