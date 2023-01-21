import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../features/todolistsList/TodoListsReducer";
import {tasksReducer} from "../features/todolistsList/TasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appSlice} from "./appSlice";
import {authSlice} from "../features/login/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    listsReducer: todoListsReducer,
    tasksReducer,
    app: appSlice,
    auth: authSlice
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})

export type ThunkAppDispatchType = ThunkDispatch<rootReducerType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()