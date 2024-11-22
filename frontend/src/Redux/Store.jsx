import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { productReducer, productsReducer } from "./Reducers/Products";
import thunk from "redux-thunk"; // Middleware for async actions

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer, // Key represents state slice
  product: productReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with middleware
export const store = createStore(persistedReducer, applyMiddleware(thunk));

// Persistor for persisting store
export const persistor = persistStore(store);
