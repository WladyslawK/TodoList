import {Dispatch} from "redux";
import {authAPI, LoginData} from "../../api/todoList-api";
import {handleNetworkErrors, handleServerAppError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {changeAppStatus} from "../../app/appSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})
export const authSlice = slice.reducer

export const {setLoginAC} = slice.actions

// thunks

export const loginTC = (data: LoginData) => async (dispatch: Dispatch) => {
  dispatch(changeAppStatus({status: 'loading'}))
  try {
    const response = await authAPI.logIn(data)
    if (response.data.resultCode === 0) {
      console.log(response.data)
      dispatch(setLoginAC({isLoggedIn: true}))
      dispatch(changeAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(response.data, dispatch)
    }
  } catch (e) {
    handleNetworkErrors(e as Error | AxiosError, dispatch)
  }
}

export const authMeTC = () => async (dispatch: Dispatch) => {
  dispatch(changeAppStatus({status: 'loading'}))
  try {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
      dispatch(setLoginAC({isLoggedIn: true}))
      dispatch(changeAppStatus({status: 'succeeded'}))
    } else {
      dispatch(setLoginAC({isLoggedIn: false}))
      dispatch(changeAppStatus({status: 'failed'}))
    }

  } catch (e) {
    handleNetworkErrors(e as Error | AxiosError, dispatch)
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(changeAppStatus({status: 'loading'}))
  try {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
      dispatch(setLoginAC({isLoggedIn: false}))
      dispatch(changeAppStatus({status: 'succeeded'}))
    }
  } catch (e) {
    handleNetworkErrors(e as Error | AxiosError, dispatch)

  }
}

//types
type InitialStateType = {
  isLoggedIn: boolean
}

type ActionType = ReturnType<typeof setLoginAC>