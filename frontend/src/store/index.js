import  {configureStore,createSlice} from '@reduxjs/toolkit';
import  {getToken} from '../getToken';
import {saveToken} from '../saveToken'
const authSlice=createSlice({
    name:'auth',
    initialState: {
        isLoggedIn:getToken() ? true : false,
        name:null,
        email:null
    },
    reducers:{
        login(state, action)
        {
           state.isLoggedIn = true;
           
        //    localStorage.setItem("token", action.payload.token);
            saveToken(action.payload.token)
           state.name = action.payload.name;
           state.email = action.payload.email
        },
        logout(state, action){
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            state.name = null;
            state.email = null;
        }
    }
} )


export const authActions = authSlice.actions;
const  store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})

export default store;