import {ResponseType} from "../api/todoList-api";
import {ThunkAppDispatchType} from "../app/store";
import {changeAppStatus, setAppError} from "../app/appSlice";
import axios, {AxiosError} from "axios";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkAppDispatchType) => {
        if(data.messages.length){
            dispatch(setAppError({error: data.messages[0]}))
        }else {
            dispatch(setAppError({error: 'some error'}))
        }
        dispatch(changeAppStatus({status: 'failed'}))
}

export const handleNetworkError = (message: string, dispatch: ThunkAppDispatchType) => {
    dispatch(setAppError({error: message}))
    dispatch(changeAppStatus({status: 'failed'}))
}

export const handleNetworkErrors = (e: Error | AxiosError, dispatch: ThunkAppDispatchType) => {
    if (axios.isAxiosError(e)) {
        const error = e.response?.data ? (e.response.data as { error: string }).error : e.message
        handleNetworkError(error, dispatch)
    } else {
        handleNetworkError(`Native error ${e.message}`, dispatch)
    }
    dispatch(changeAppStatus({status: 'failed'}))
}