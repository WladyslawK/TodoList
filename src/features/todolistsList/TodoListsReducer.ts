import {todoListAPI, TodoListType} from "../../api/todoList-api";
import {Dispatch} from "redux";
import {ThunkAppDispatchType} from "../../app/store";
import {changeAppStatus, setAppError, StatusType} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";

const DELETE_LIST = "DELETE-LIST"
const CHANGE_FILTER = "CHANGE-FILTER"
const CHANGE_LIST_TITLE = "CHANGE-LIST-TITLE"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const SET_TODOLISTS = "SET-TODOLISTS"
const SET_TODOLISTS_ENTITY_STATUS = "SET-TODOLISTS-ENTITY-STATUS"

const initialState: Array<TodoListsDomainType> = []

export const todoListsReducer = (state: Array<TodoListsDomainType> = initialState, action: ActionsTpe): Array<TodoListsDomainType> => {
    switch (action.type) {
        case DELETE_LIST:
            return state.filter(list => list.id !== action.payload.listID)
        case CHANGE_FILTER:
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                filter: action.payload.filterValue
            } : list)
        case CHANGE_LIST_TITLE:
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                title: action.payload.newTitle
            } : list)
        case ADD_TODOLIST:
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case SET_TODOLISTS:
            return action.todoLists.map(list => ({...list, filter: "all", entityStatus: "idle"}))
        case SET_TODOLISTS_ENTITY_STATUS:
            return [
                ...state.map(list => list.id === action.payload.todolistId ? {
                    ...list,
                    entityStatus: action.payload.status
                } : list)]
        default:
            return state
    }
}


//actions
export const deleteListAC = (listID: string) => ({type: DELETE_LIST, payload: {listID}} as const)
export const changeFilterAC = (listID: string, filterValue: FilterType) =>
    ({type: CHANGE_FILTER, payload: {listID, filterValue}} as const)
export const changeListTitleAC = (listID: string, newTitle: string) =>
    ({type: CHANGE_LIST_TITLE, payload: {listID, newTitle}} as const)
export const addTodoListAC = (todolist: TodoListType) => ({type: ADD_TODOLIST, payload: {todolist}} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: SET_TODOLISTS, todoLists} as const)
export const setTodoListEntityStatus = (todolistId: string, status: StatusType) => ({
    type: SET_TODOLISTS_ENTITY_STATUS,
    payload: {todolistId, status}
} as const)

//thunks
export const getTodoListsTC = () => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatus("loading"))
    todoListAPI.getToDoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(changeAppStatus("succeeded"))
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatus("loading"))
    dispatch(setTodoListEntityStatus(todolistId, "loading"))
    todoListAPI.deleteToDoList(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteListAC(todolistId))
                dispatch(changeAppStatus("succeeded"))
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus("loading"))
    todoListAPI.createToDoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(changeAppStatus("succeeded"))
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus("loading"))
    dispatch(setTodoListEntityStatus(todolistId, "loading"))
    todoListAPI.changeToDoListTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeListTitleAC(todolistId, title))
                dispatch(changeAppStatus("succeeded"))
                dispatch(setTodoListEntityStatus(todolistId, "succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

//types

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export type deleteListACType = ReturnType<typeof deleteListAC>

type ActionsTpe =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeListTitleAC>
    | addTodoListACType
    | setTodoListsACType
    | deleteListACType
    | ReturnType<typeof setTodoListEntityStatus>

export type FilterType = "all" | "completed" | "active"

export type TodoListsDomainType = TodoListType & {
    filter: FilterType
    entityStatus: StatusType
}
