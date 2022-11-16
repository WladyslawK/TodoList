import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "ad9132f6-46f4-4f27-ad35-67db1aaf2e70"
    }
})

type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export const todoListAPI = {
    getToDoLists(){
        return instance.get<Array<TodoListType>>("todo-lists")
    },

    createToDoList(title: string){
      return instance.post<ResponseType<{item: TodoListType}>>("todo-lists", {title})
    },

    deleteToDoList(listID: string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${listID}`)
    },

    changeToDoListTitle(listID: string, title: string){
        return instance.put<ResponseType<{}>>(`todo-lists/${listID}`, {title})
    }
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

type GetTasksResponseType<T = {}> = {
    error: string
    items: Array<T>
    totalCount: number
}

type ResponseTaskType<T = {}> = {
    data: {item: T}
    fieldsErrors: string[]
    messages:string[]
    resultCode: number
}

export const tasksAPI = {

    getTasks(todolistId: string){
        return instance.get<GetTasksResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string){
        return instance.post<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    changeTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }

}