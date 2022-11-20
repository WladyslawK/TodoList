import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../components/Reducers/TodoListsReducer";
import {tasksReducer} from "../components/Reducers/TasksReducer";

export const rootReducer = combineReducers({
    listsReducer: todoListsReducer,
    tasksReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)