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

type DeleteResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type CreateTodoListType = {
    data: {item : TodoListType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type UpdateTodoList = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type ResponseType<D> = {
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