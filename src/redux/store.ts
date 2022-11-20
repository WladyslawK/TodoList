import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../components/Reducers/TodoListsReducer";
import {tasksReducer} from "../components/Reducers/TasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
    listsReducer: todoListsReducer,
    tasksReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type ThunkAppDispatchType = ThunkDispatch<rootReducerType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()