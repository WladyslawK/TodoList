import {combineReducers, legacy_createStore} from "redux";
import {listsReducer} from "../components/Reducers/ListsReducer";
import {tasksReducer} from "../components/Reducers/TasksReducer";

const rootReducer = combineReducers({
    listsReducer,
    tasksReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)