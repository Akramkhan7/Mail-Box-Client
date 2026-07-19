import reducer, { authActions } from "./Auth-Slice";
import authReducer from "./Auth-Slice"
import { configureStore } from "@reduxjs/toolkit";

 const store = configureStore({
    reducer: {
        auth : authReducer,
    }
 })

 export default store;