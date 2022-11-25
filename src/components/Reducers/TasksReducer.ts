import {ADD_TODOLIST, addTodoListACType, deleteListACType, SET_TODOLISTS, setTodoListsACType} from "./TodoListsReducer";
import {tasksAPI, TaskStatuses, TaskType} from "../../todoList-api";
import {Dispatch} from "redux";

const DELETE_TASK = "DELETE-TASK"
const ADD_NEW_TASK = "ADD-NEW-TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const EDIT_TASK_TITLE = "EDIT_TASK_TITLE"
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
        case CHANGE_TASK_STATUS:
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].map(task =>
                    task.id === action.payload.taskId ? {...task, status: action.payload.status} : task)
            }
        case EDIT_TASK_TITLE:
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].map(task =>
                    task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)
            }
        case ADD_TODOLIST:
            return {...state, [action.payload.listId]: []}
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

export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) =>
    ({type: CHANGE_TASK_STATUS, payload: {todoListId, taskId, status}} as const)

export const editTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) =>
    ({type: EDIT_TASK_TITLE, payload: {todoListId, taskId, newTitle}} as const)

export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: SET_TASKS, payload: {todoListId, tasks}} as const)

//thunks
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todoListId)
        .then(res => {
            console.log(res)
            dispatch(setTasksAC(todoListId, res.data.items))
        })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todoListId, taskId))
            }
        })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            console.log(res)
            dispatch(addNewTaskAC(todoListId, res.data.data.item))
        })
}

export const updateTaskTC = (todoListId: string, task: TaskType, status: TaskStatuses) => (dispatch: Dispatch) => {
    const model = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    tasksAPI.updateTask(todoListId, task.id, model)
        .then(res => {
            console.log(res)
            dispatch(changeTaskStatusAC(todoListId, res.data.data.item.id, status))
        })
}


//types

export type TasksStateType = {
    [id: string]: TaskType[]
}

type ActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof editTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | addTodoListACType
    | setTodoListsACType
    | deleteListACType
