import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../features/todolistsList/TodoListsReducer";
import {tasksReducer} from "../features/todolistsList/TasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";

export const rootReducer = combineReducers({
    listsReducer: todoListsReducer,
    tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type ThunkAppDispatchType = ThunkDispatch<rootReducerType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()