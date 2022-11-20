import {ChangeEvent, useEffect, useState} from "react";
import {tasksAPI, TaskType} from "../todoList-api";
import {Task} from "../components/Task";

export default {
    title: "API/Tasks API"
}


export const GetTasks = () => {

    const [state, setState] = useState<TaskType[] | null>(null)
    const [todoListId, setTodoListId] = useState<string>("")
    const [count, setCount] = useState(0)

    /*  useEffect(() => {
          tasksAPI.getTasks(todolistId)
              .then(res => {
                  console.log(res)
                  setState(res.data.items)
              })
      }, [])*/

    const changeTodoListId = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)

    const getTasks = () => {
        tasksAPI.getTasks(todoListId)
            .then(res => {
                setState(res.data.items)
                console.log(res)
                if(res.data.error === null){
                    setTodoListId("")
                }
            })
    }


    const onClickHandler = () => setCount(state => state + 1)

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={"TodoListId"}
                    value={todoListId}
                    onChange={changeTodoListId}
                />

                <button onClick={getTasks}>Get Tasks</button>
            </div>

            <ul>
                {
                    state?.map(task => {
                        return (
                            <li key={task.id}>
                                {task.title}
                            </li>)
                    })
                }
            </ul>

            <span onClick={onClickHandler}>{count}</span>
        </div>
    )
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    /*    useEffect(() => {
            tasksAPI.createTask(todolistId, "Task")
                .then(res => {
                    console.log(res)
                    setState(res.data)
                })
        }, [])*/


    const onchangeTodoListId = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)

    const onchangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const createTaskHandler = () => {
        tasksAPI.createTask(todoListId, title)
            .then(res => {
                setState(res.data)
                if (res.data.resultCode === 0) {
                    setTitle("")
                    setTodoListId("")
                }

            })
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={"TodoListId"}
                    value={todoListId}
                    onChange={onchangeTodoListId}
                />

                <input
                    type="text"
                    placeholder={"title"}
                    value={title}
                    onChange={onchangeTitle}
                />

                <button onClick={createTaskHandler}>Create Task</button>
            </div>
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
                if (res.data.resultCode === 0) {
                    setTodoListId("")
                    setTaskId("")
                }
            })
    }

    return (
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
    const [todoListId, setTodoListId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")


    const todolistId = "b9ca0828-50a8-4829-93fc-aff8c73743cf"


    /*    useEffect(() => {
            tasksAPI.changeTaskTitle(todolistId, taskId, "Changed Task Title")
                .then(res => {
                    console.log(res)
                    setState(res.data)
                })
        }, [])*/

    const onChangeTodoListId = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

    const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const changeTaskTitle = () => {
        tasksAPI.changeTaskTitle(todolistId, taskId, newTaskTitle)
            .then(res => {
                setState(res.data)
                if (res.data.resultCode === 0) {
                    setNewTaskTitle("")
                    setTodoListId("")
                    setTaskId("")
                }

            })
    }


    return (
        <div>
            <div>
                <input
                    placeholder={"TodoListId"}
                    type="text"
                    value={todoListId}
                    onChange={onChangeTodoListId}
                />

                <input
                    placeholder={"tasId"}
                    type="text"
                    value={taskId}
                    onChange={onChangeTaskId}
                />

                <input
                    placeholder={"TaskTitle"}
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeNewTaskTitle}
                />
                <button onClick={changeTaskTitle}>Change Task Title</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}