import {ResponseType} from "../api/todoList-api";
import {ThunkAppDispatchType} from "../app/store";
import {changeAppStatus, setAppError} from "../app/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkAppDispatchType) => {
        if(data.messages.length){
            dispatch(setAppError(data.messages[0]))
        }else {
            dispatch(setAppError("some error"))
        }
        dispatch(changeAppStatus("failed"))
}

export const handleNetworkError = (message: string, dispatch: ThunkAppDispatchType) => {
    dispatch(setAppError(message))
    dispatch(changeAppStatus("failed"))
}