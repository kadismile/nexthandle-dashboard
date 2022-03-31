import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import vendorReducer from "./vendorSlice";
import categoryReducer from "./categorySlice";

const rootReducer = combineReducers({
 user: userReducer,
 product: productReducer,
 vendor: vendorReducer,
 category: categoryReducer,
});

const persistConfig = {
 key: "root",
 storage,
 whitelist: ["user"],
 // "product","vendor", "category"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
 middleware: getDefaultMiddleware({
  serializableCheck: {
   ignoredActions: ["persist/PERSIST"],
  },
 }),
});

const persistor = persistStore(store);
export { store, persistor };
