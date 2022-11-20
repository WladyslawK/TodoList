import {v1} from "uuid";
import {todoListAPI, TodoListType} from "../../todoList-api";
import {Dispatch} from "redux";
const DELETE_LIST = "DELETE-LIST"
const CHANGE_FILTER = "CHANGE-FILTER"
const CHANGE_LIST_TITLE = "CHANGE-LIST-TITLE"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const SET_TODOLISTS = "SET-TODOLISTS"

export type FilterType = "all" | "completed" | "active"

export type TodoListsDomainType = TodoListType & {
    filter: FilterType
}

const initialState: Array<TodoListsDomainType> = []

export const todoListsReducer = (state: Array<TodoListsDomainType> = initialState, action: ActionsTpe): Array<TodoListsDomainType> => {
    switch (action.type) {
        case DELETE_LIST:
            return state.filter(list => list.id !== action.payload.listID)
        case CHANGE_FILTER:
            return state.map(list => list.id === action.payload.listID ? {...list, filter: action.payload.filterValue} : list)
        case CHANGE_LIST_TITLE:
            return state.map(list => list.id === action.payload.listID ? {...list, title: action.payload.newTitle} : list)
        case ADD_TODOLIST:
            return [{id: action.payload.listId, title: action.payload.title, filter: "all", addedDate: "", order: 0}, ...state]
        case SET_TODOLISTS:
            return action.todoLists.map(list => ({...list, filter: "all"}))
        default:
            return state
    }
}

type ActionsTpe = deleteListACType
    | changeFilterACType
    | changeListTitleACType
    | addTodoListACType
    | setTodoListsACType


export type deleteListACType = ReturnType<typeof deleteListAC>
export const deleteListAC = (listID: string) => {
    return {
        type: DELETE_LIST,
        payload: {
            listID
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listID: string, filterValue: FilterType) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            listID,
            filterValue
        }
    } as const
}

type changeListTitleACType = ReturnType<typeof changeListTitleAC>
export const changeListTitleAC = (listID: string, newTitle: string) => {
    return {
        type: CHANGE_LIST_TITLE,
        payload: {
            listID,
            newTitle
        }
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {

    return {
        type: ADD_TODOLIST,
        payload: {
            listId: v1(),
            title
        }
    } as const
}


export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: SET_TODOLISTS, todoLists} as const)



export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListAPI.getToDoLists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}






