import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";

export default configureStore({
    reducer: {
        product: productReducer,
    },
});

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    product: productReducer,
});

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};
