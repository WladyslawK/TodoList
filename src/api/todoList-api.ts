import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "ad9132f6-46f4-4f27-ad35-67db1aaf2e70"
    }
})

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
    },

    updateTask(todoListId: string, taskId: string, model: {}){
        return instance.put<ResponseTaskType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    logIn(data: LoginData){
        return instance.post<ResponseType<LoginType>>('auth/login', data)
    },

    logOut(){
        return instance.delete<ResponseType>('auth/login')
    },

    me(){
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    }
}

type MeResponseType = {
    id: number
    login: string
    email: string
}

type LoginType = {
    userId: number
}

export type LoginData = {
    email: string
    password: string
    rememberMe?: boolean
}

export type TodoListType = {
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

type GetTasksResponseType<T = {}> = {
    error: string
    items: Array<T>
    totalCount: number
}

export type ResponseTaskType<T = {}> = {
    data: {item: T}
    fieldsErrors: string[]
    messages:string[]
    resultCode: number
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

export type updateTaskType = {
    description?: string
    priority?: TaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
    deadline?: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities{
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4

}