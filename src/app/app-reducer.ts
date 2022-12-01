const CHANGE_APP_STATUS = "CHANGE-APP-STATUS"
const SET_APP_ERROR ="SET-APP-ERROR"

const initialAppState: InitialAppType= {
    status: "idle",
    error: null
}

export const appReducer = (state: InitialAppType = initialAppState, action: AppActionsType) => {
    switch (action.type){
        case CHANGE_APP_STATUS:
            return {
                ...state,
                status: action.payload.status
            }
        case SET_APP_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}


//actions
export const changeAppStatus = (status: StatusType) => ({type: CHANGE_APP_STATUS, payload: {status}} as const)

export const setAppError = (error: string | null) => ({type: SET_APP_ERROR, payload: {error}} as const)


//types
export type StatusType = "loading" | "idle" | "failed" | "succeeded"

export type InitialAppType = {
    status: StatusType
    error: string | null
}

type AppActionsType = ReturnType<typeof changeAppStatus>
    | ReturnType<typeof setAppError>