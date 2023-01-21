import {
    ADD_TODOLIST,
    addTodoListACType,
    deleteListACType,
    SET_TODOLISTS,
    setTodoListEntityStatus,
    setTodoListsACType
} from "./TodoListsReducer";
import {tasksAPI, TaskType, updateTaskType} from "../../api/todoList-api";
import {Dispatch} from "redux";
import {rootReducerType, ThunkAppDispatchType} from "../../app/store";
import {changeAppStatus, setAppError} from "../../app/appSlice";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";

const DELETE_TASK = "DELETE-TASK"
const ADD_NEW_TASK = "ADD-NEW-TASK"
const UPDATE_TASK = "UPDATE_TASK"
const SET_TASKS = "SET-TASKS"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case DELETE_TASK:
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(task =>
                    task.id !== action.payload.taskId)
            }
        case ADD_NEW_TASK:
            return {...state, [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]]}
        case UPDATE_TASK:
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].map(task =>
                    task.id === action.payload.taskId ? {...task, ...action.payload.task} : task)
            }
        case ADD_TODOLIST:
            return {...state, [action.payload.todolist.id]: []}
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.todoLists.forEach(todoList => {
                stateCopy[todoList.id] = []
            })
            return stateCopy
        }
        case "DELETE-LIST": {
            const copyState = {...state}
            delete copyState[action.payload.listID]
            return copyState
        }
        case SET_TASKS:
            return {...state, [action.payload.todoListId]: action.payload.tasks}
        default:
            return state
    }
}

//actions
export const deleteTaskAC = (todoListId: string, taskId: string) =>
    ({type: DELETE_TASK, payload: {todoListId, taskId}} as const)

export const addNewTaskAC = (todoListId: string, task: TaskType) =>
    ({type: ADD_NEW_TASK, payload: {todoListId, task}} as const)

export const updateTaskAC = (todoListId: string, taskId: string, task: updateTaskType) =>
    ({type: UPDATE_TASK, payload: {todoListId, taskId, task}} as const)

export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: SET_TASKS, payload: {todoListId, tasks}} as const)

//thunks
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus({status: "loading" }))
    tasksAPI.getTasks(todoListId)
        .then(res => {

            dispatch(setTasksAC(todoListId, res.data.items))
            dispatch(changeAppStatus({status: "succeeded"}))
        }).catch(error => {
        dispatch(setAppError(error.message))
        dispatch(changeAppStatus({status: "failed"}))
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus({status: "loading"}))
    dispatch(setTodoListEntityStatus(todolistId, "loading"))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(changeAppStatus({status: "succeeded"}))
                dispatch(setTodoListEntityStatus(todolistId, "succeeded"))
            }else{
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            dispatch(setAppError(error.message))
            dispatch(changeAppStatus({status: "failed"}))
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatus({status: "loading"}))
    dispatch(setTodoListEntityStatus(todolistId, "loading"))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0){
                console.log(res.data)
                dispatch(addNewTaskAC(todolistId, res.data.data.item))
                dispatch(changeAppStatus({status: "succeeded"}))
                dispatch(setTodoListEntityStatus(todolistId, "succeeded"))
            }else{
                handleServerAppError(res.data, dispatch)
            }

        }).catch(error => {
        handleNetworkError(error.message, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, updates: updateTaskType) => (dispatch: Dispatch, getState: () => rootReducerType) => {

    const state = getState()
    const task = state.tasksReducer[todolistId].find(task => task.id === taskId)

    if(!task){
        console.warn('task not found in the state')
        return
    }

    const model: updateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...updates
    }

    dispatch(setTodoListEntityStatus(todolistId, "loading"))
    dispatch(changeAppStatus({status: "loading"}))
    tasksAPI.updateTask(todolistId, task.id, model)
        .then(res => {
            console.log(res)
            if(res.data.resultCode === 0){

                dispatch(updateTaskAC(todolistId, res.data.data.item.id, model))
                dispatch(changeAppStatus({status: "succeeded"}))
                dispatch(setTodoListEntityStatus(todolistId, "succeeded"))
            }else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch)
        })
}


//types

export type TasksStateType = {
    [id: string]: TaskType[]
}

type ActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | addTodoListACType
    | setTodoListsACType
    | deleteListACType
