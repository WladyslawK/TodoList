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

export const todoListAPI = {
    getToDoLists(){
        return instance.get<Array<TodoListType>>("todo-lists")
    },

    createToDoList(title: string){
      return instance.post("todo-lists", {title})
    },

    deleteToDoList(listID: string){
        return instance.delete(`todo-lists/${listID}`)
    },

    changeToDoListTitle(listID: string, title: string){
        return instance.put(`todo-lists/${listID}`, {title})
    }
}