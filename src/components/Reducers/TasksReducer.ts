import {ObjectTasksType} from "../../App";
import {v1} from "uuid";

const DELETE_TASK = "DELETE-TASK"
const ADD_NEW_TASK = "ADD-NEW-TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const EDIT_TASK_TITLE = "EDIT_TASK_TITLE"

export const tasksReducerTest = (state: ObjectTasksType, action: ActionsType) => {
    switch(action.type){
        case DELETE_TASK:
            return {...state, [action.payload.listID]: state[action.payload.listID].filter(task => task.id !== action.payload.taskId)}
        case ADD_NEW_TASK:
            return {...state, [action.payload.listID]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.listID]]}
        case CHANGE_TASK_STATUS:
            return {...state, [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.newValue} : task)}
        case EDIT_TASK_TITLE:
            return {...state, [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)}
        default:
            return state
    }
}

type ActionsType = deleteTaskACType | addNewTaskACType | changeTaskStatusACType | editTaskTitleACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (listID: string, taskId: string) => {
    return {
        type: DELETE_TASK,
        payload: {
            listID,
            taskId
        }
    } as const
}

type addNewTaskACType = ReturnType<typeof addNewTask>
export const addNewTask = (listID: string, title: string) => {
    return {
        type: ADD_NEW_TASK,
        payload: {
            listID,
            title
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (listID: string, taskId: string, newValue: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            listID,
            taskId,
            newValue
        }
    } as const
}

type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>
export const editTaskTitleAC = (listID: string, taskId: string, newTitle: string) => {
    return {
        type: EDIT_TASK_TITLE,
        payload: {
            listID,
            taskId,
            newTitle
        }
    } as const
}