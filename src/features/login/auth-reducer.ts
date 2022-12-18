import {Dispatch} from "redux";
import {authAPI, LoginData, todoListAPI} from "../../api/todoList-api";
import {handleNetworkError, handleNetworkErrors, handleServerAppError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {changeAppStatus} from "../../app/app-reducer";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-LOGIN":
            return {
                ...state, isLoggedIn: action.payload.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const setLoginAC = (isLoggedIn: boolean) => ({type: "SET-LOGIN", payload: {isLoggedIn}} as const)

// thunks

export const loginTC = (data: LoginData) => async (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    try {
        const response = await authAPI.logIn(data)
        if (response.data.resultCode === 0) {
            console.log(response.data)
            dispatch(setLoginAC(true))
            dispatch(changeAppStatus('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        handleNetworkErrors(e as Error | AxiosError, dispatch)
    }
}

export const authMeTC = () => async (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    try{
        const response = await authAPI.me()
        if(response.data.resultCode === 0){
            dispatch(setLoginAC(true))
            dispatch(changeAppStatus('succeeded'))
        }else {
            dispatch(setLoginAC(false))
            dispatch(changeAppStatus('failed'))
        }

    }catch (e) {
        handleNetworkErrors(e as Error | AxiosError, dispatch)
    }
}

export const logOutTC = () => async(dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    try{
        const response = await authAPI.logOut()
        if(response.data.resultCode === 0){
            dispatch(setLoginAC(false))
            dispatch(changeAppStatus('succeeded'))
        }
    }catch (e) {
        handleNetworkErrors(e as Error | AxiosError, dispatch)

    }
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}

type ActionType = ReturnType<typeof setLoginAC>