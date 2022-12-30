import {configureStore, createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name : 'auth',
    initialState : {isLoggedIn:false},
    reducers:{
        login(state) {
            state.isLoggedIn = false
        },

        logout(state){
            state.isLoggedIn = true
        },
    }
})
export const authActions  = authSlice.actions

export const store = configureStore({
    reducer:authSlice.reducer
})