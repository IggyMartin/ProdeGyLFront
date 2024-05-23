import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '../services/cookiesService'
import { jwtDecode } from 'jwt-decode'

const token = getCookies("jwt")
const decodedToken = jwtDecode(token)

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: decodedToken
  },
  reducers: {
    saveUserData: (state, action) => {
        state.user = action.payload
        console.log(state.user)
    },
    updateUserLoginProcess: (state, action) => {
      state.user.loginProcess = action.payload
    }
  }
})

export const  { saveUserData, updateUserLoginProcess } = userSlice.actions

export default userSlice.reducer