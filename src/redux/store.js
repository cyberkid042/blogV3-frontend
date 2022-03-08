import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSlice from "./features/userSlice";
import CheckStatusSlice from "./features/checkErrorAndStatus";
import PostSlice from "./features/postSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: UserSlice,
  status: CheckStatusSlice,
  posts: PostSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["posts"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
