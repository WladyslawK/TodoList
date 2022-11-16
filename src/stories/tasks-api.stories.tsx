import {ChangeEvent, useEffect, useState} from "react";
import {tasksAPI, TaskType} from "../todoList-api";
import {Task} from "../components/Task";

export default {
    title: "API/Tasks API"
}



export const GetTasks = () => {

    const [state, setState] = useState<TaskType[] | null>(null)

    const todolistId = "b9ca0828-50a8-4829-93fc-aff8c73743cf"

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                console.log(res)
                setState(res.data.items)
            })
    }, [])

    return (
        <ul>
            {
                state?.map(task => {
                    return(
                        <li key ={task.id}>
                            {task.title}
                        </li>)
                })
            }
        </ul>)
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = "b9ca0828-50a8-4829-93fc-aff8c73743cf"

    useEffect(()=> {
        tasksAPI.createTask(todolistId, "Task")
            .then(res => {
                console.log(res)
                setState(res.data)
            })
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [TodoListId, setTodoListId] = useState<string>("")
    const [TaskId, setTaskId] = useState<string>("")

    /*useEffect(()=> {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {
                console.log(res)
                setState(res.data)
            })
    }, [])*/

    const onTodoListIdChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)

    const onTaskIdChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

    const deleteHandler = () => {
        tasksAPI.deleteTask(TodoListId, TaskId)
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }

    return(
        <div>
            <div>
                <input placeholder={"TodoListId"}
                       type="text"
                       value={TodoListId}
                       onChange={onTodoListIdChangeHandler}/>

                <input placeholder={"TaskId"}
                       type="text"
                       value={TaskId}
                       onChange={onTaskIdChangeHandler}/>

                <button onClick={deleteHandler}>Delete Task</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )

}

export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = "b9ca0828-50a8-4829-93fc-aff8c73743cf"
    const taskId = "09c14be4-662c-4587-baa7-1374bf9834a5"

    useEffect(()=> {
        tasksAPI.changeTaskTitle(todolistId, taskId, "Changed Task Title")
            .then(res => {
                console.log(res)
                setState(res.data)
            })
    },[])

    return(
        <div>{JSON.stringify(state)}</div>
    )
}