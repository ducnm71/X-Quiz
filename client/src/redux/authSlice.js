import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

let initialState = {
    user:'',
    token:'',
    loading:false
}

const url = process.env.REACT_APP_SERVER_URL + '/user'

export const loginUser = createAsyncThunk('user', async (body) => {
    let res =   await fetch(url + '/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem('token')
        },
        addUser: (state, action) => {
            state.user = localStorage.getItem('user')
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loading= true
        },
        [loginUser.fulfilled]:(state, {payload}) => {
            state.loading = false;
            state.token = payload.token;
            state.user = payload
            localStorage.setItem('token', JSON.stringify(payload.token))
            localStorage.setItem('user', JSON.stringify(payload))
        } ,
        [loginUser.rejected]: (state, action) => {
            state.loading= true
        }
    }
})

export const {addToken, addUser} = authSlice.actions

export default authSlice.reducer