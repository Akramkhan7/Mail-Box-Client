import reducer, { authActions } from "./Auth-Slice";
import authReducer from "./Auth-Slice"
import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./Mail-Slice"

 const store = configureStore({
    reducer: {
        auth : authReducer,
        mail : mailReducer,
    }
 })

 export default store;