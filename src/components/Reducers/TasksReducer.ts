import {ADD_TODOLIST, addTodoListACType} from "./TodoListsReducer";
import {TaskType} from "../../todoList-api";
const DELETE_TASK = "DELETE-TASK"
const ADD_NEW_TASK = "ADD-NEW-TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const EDIT_TASK_TITLE = "EDIT_TASK_TITLE"


export type TasksStateType = {
    [id: string]: TaskType[]
}



const initialState: TasksStateType = {
  /*  [listID1]: [
        {id: "1", title: "HTML&CSS", isDone: true},
        {id: "2", title: "React", isDone: false},
        {id: "3", title: "JS", isDone: true},
    ],
    [listID2]: [
        {id: "4", title: "Milk", isDone: false},
        {id: "5", title: "Bread", isDone: true},
        {id: "6", title: "Meat", isDone: true},
    ]*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case DELETE_TASK:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
            }
       /* case ADD_NEW_TASK:
            return {
                ...state,
                [action.payload.listID]: [{
                    id: v1(),
                    title: action.payload.title
                }, ...state[action.payload.listID]]
            }*/
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.newValue
                } : task)
            }
        case EDIT_TASK_TITLE:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.payload.listId]: []
            }
        default:
            return state
    }
}

type ActionsType =
    deleteTaskACType
    | addNewTaskACType
    | changeTaskStatusACType
    | editTaskTitleACType
    | addTodoListACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: DELETE_TASK,
        payload: {
            todoListId,
            taskId
        }
    } as const
}

type addNewTaskACType = ReturnType<typeof addNewTaskAC>
export const addNewTaskAC = (todoListId: string, title: string) => {
    return {
        type: ADD_NEW_TASK,
        payload: {
            todoListId,
            title
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, newValue: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            todoListId,
            taskId,
            newValue
        }
    } as const
}

type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>
export const editTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: EDIT_TASK_TITLE,
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    } as const
}