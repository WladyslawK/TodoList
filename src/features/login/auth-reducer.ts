const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type){
        case "SET-LOGIN":
            return {
                ...state, isLoggedIn: action.payload.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const setLoginAC = (isLoggedIn) => ({type: "SET-LOGIN", payload: {isLoggedIn}}as const)

// thunks

//types
type InitialStateType = {
    isLoggedIn: boolean
}

type ActionType = ReturnType<typeof setLoginAC>