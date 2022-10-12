import {ObjectTasksType} from "../../App";
import {v1} from "uuid";

const DELETE_TASK = "DELETE-TASK"
const ADD_NEW_TASK = "ADD-NEW-TASK"

export const tasksReducerTest = (state: ObjectTasksType, action: ActionsType) => {
    switch(action.type){
        case DELETE_TASK:
            return {...state, [action.payload.listID]: state[action.payload.listID].filter(task => task.id !== action.payload.taskId)}
        case ADD_NEW_TASK:
            return {...state, [action.payload.listID]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.listID]]}
        default:
            return state
    }
}

type ActionsType = deleteTaskACType | addNewTaskACType

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
