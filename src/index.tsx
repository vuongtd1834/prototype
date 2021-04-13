import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// store
import configureAppStore from "./configureStore";
import App from "./App";

const store = configureAppStore();

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
