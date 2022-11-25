import {v1} from "uuid";
import {todoListAPI, TodoListType} from "../../todoList-api";
import {Dispatch} from "redux";

const DELETE_LIST = "DELETE-LIST"
const CHANGE_FILTER = "CHANGE-FILTER"
const CHANGE_LIST_TITLE = "CHANGE-LIST-TITLE"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const SET_TODOLISTS = "SET-TODOLISTS"

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
            return [{
                id: action.payload.listId,
                title: action.payload.title,
                filter: "all",
                addedDate: "",
                order: 0
            }, ...state]
        case SET_TODOLISTS:
            return action.todoLists.map(list => ({...list, filter: "all"}))
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
export const addTodoListAC = (title: string) => ({type: ADD_TODOLIST, payload: {listId: v1(), title}} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: SET_TODOLISTS, todoLists} as const)

//thunks
export const getTodoListsTC = () => (dispatch: Dispatch) => {
    todoListAPI.getToDoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
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

export type FilterType = "all" | "completed" | "active"

export type TodoListsDomainType = TodoListType & {
    filter: FilterType
}
