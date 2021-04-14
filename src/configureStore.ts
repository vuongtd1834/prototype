import {
    configureStore,
    getDefaultMiddleware,
    EnhancedStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// root reducer
import reducers from "@Reducers";
// saga
import sagas from "@Sagas";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["home"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const configureAppStore = (): EnhancedStore => {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    // Create the store with saga middleware
    const middleware = [];
    middleware.push(sagaMiddleware);

    if (process.env.NODE_ENV !== "production") {
        middleware.push(logger);
    }

    const store = configureStore({
        reducer: persistedReducer,
        middleware: [
            ...getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
            ...middleware,
        ],
        devTools: process.env.NODE_ENV !== "production",
    });

    sagaMiddleware.run(sagas);

    return store;
};

export default configureAppStore;
