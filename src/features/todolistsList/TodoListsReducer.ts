import {todoListAPI, TodoListType} from "../../api/todoList-api";
import {Dispatch} from "redux";
import {ThunkAppDispatchType} from "../../app/store";
import {changeAppStatus, setAppError, StatusType} from "../../app/appSlice";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListsDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        deleteListAC: (state, action: PayloadAction<{listID: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.listID)
            if(index > -1){
                state.splice(index, 1)
            }
        },
        changeFilterAC: (state, action: PayloadAction<{listID: string, filterValue: FilterType}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.listID)
            state[index].filter = action.payload.filterValue
        },
        changeListTitleAC: (state, action: PayloadAction<{listID: string, newTitle: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.listID)
            state[index].title = action.payload.newTitle
        },
        addTodoListAC: (state, action: PayloadAction<{todolist: TodoListType}>) => {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        setTodoListEntityStatus: (state, action: PayloadAction<{todoListId: string, status: StatusType}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            state[index].entityStatus = action.payload.status
        },
        setTodoListsAC: (state, action: PayloadAction<{todoLists: Array<TodoListType>}>) => {
            return action.payload.todoLists.map(todo => ({...todo, filter: 'all' as FilterType, entityStatus: 'idle' as StatusType}))
        }
    }
})

export const todoListsReducer = slice.reducer
export const {setTodoListsAC, deleteListAC, addTodoListAC, setTodoListEntityStatus, changeListTitleAC, changeFilterAC} = slice.actions

//thunks
export const getTodoListsTC = () => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatus({ status: "loading"}))
    todoListAPI.getToDoLists()
        .then(res => {
            dispatch(setTodoListsAC({ todoLists: res.data}))
            dispatch(changeAppStatus({status: "succeeded"}))
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const deleteTodolistTC = (todoListId: string) => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatus({status: "loading"}))
    dispatch(setTodoListEntityStatus({todoListId, status: "loading"}))
    todoListAPI.deleteToDoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteListAC({listID: todoListId}))
                dispatch(changeAppStatus({status: "succeeded"}))
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus({status: "loading"}))
    todoListAPI.createToDoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC( {todolist: res.data.data.item}))
                dispatch(changeAppStatus({status: "succeeded"}))
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus({status: "loading"}))
    dispatch(setTodoListEntityStatus({todoListId, status: "loading"}))
    todoListAPI.changeToDoListTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeListTitleAC({listID: todoListId, newTitle: title}))
                dispatch(changeAppStatus({status: "succeeded"}))
                dispatch(setTodoListEntityStatus({todoListId, status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

//types

export type FilterType = "all" | "completed" | "active"

export type TodoListsDomainType = TodoListType & {
    filter: FilterType
    entityStatus: StatusType
}
