import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {TodoList} from "../components/TodoList";
import {todoListAPI} from "../todoList-api";

export default {
    title: 'API'
}


export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListAPI.getToDoLists()
            .then(res => {
                setState(res.data)
                console.log(res)
            })
    }, [])
    return (
        <>
            {JSON.stringify(state)}
        </>)
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const date = new Date()

        todoListAPI.createToDoList(`New ToDoList ${date.getMinutes()}` )
            .then(res => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const toDoListID = "24f2aa2b-5d4f-4f7d-a6fa-6f8c7c353f6f"

    useEffect(() => {
        todoListAPI.deleteToDoList(toDoListID).then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const toDoListID = "ee7873c3-2759-4001-a97a-51b3cc0ba6fc"
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListAPI.changeToDoListTitle(toDoListID, "Title has been changed")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}