import { API } from "@/Services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { homeReducers, themeReducers } from "./reducers";
import { routeReducers } from "./reducers/route";
import { BUS_API } from "@/Services/busbase";
import { busStopReducers } from "./reducers/busstops";
import { stationReducers } from "./reducers/station";

const reducers = combineReducers({
  api: API.reducer,
  busapi: BUS_API.reducer,
  station: stationReducers,
  theme: themeReducers,
  home: homeReducers,
  route: routeReducers,
  busstops: busStopReducers,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "locations", "busapi"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware).concat(BUS_API.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export { store, persistor };
