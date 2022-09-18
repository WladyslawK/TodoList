import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "./TodoList.module.css"

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterType = "all" | "completed" | "active"

type todoListPropsType = {
    listId: string
    filter: FilterType
    title: string,
    tasks: Array<TasksType>,
    deleteTask: (listId: string, taskId: string) => void
    addTask: (listId: string, newTaskTitle: string) => void
    changeFilter: (listId: string, filterValue: FilterType)=> void
    changeStatus: (listId: string, taskId: string, isDone: boolean) => void
    deleteList: (listId: string) => void
}


export const TodoList: React.FC<todoListPropsType> = ({listId, title, tasks, addTask, deleteTask, changeFilter, changeStatus, filter, deleteList}) =>{

    const TasksElements = tasks.map(task => (<li key={task.id}><input onChange={(event)=> changeStatus(listId, task.id, event.currentTarget.checked)} type='checkbox' checked={task.isDone}/> <span className={task.isDone ? style.completedTasks : ""}>{task.title}</span><button onClick={() => {deleteTask(listId, task.id)
    }}>x</button></li>))

    const [taskTextInput, SetTaskTextInput] = useState<string>("")
    const [error, SetError] = useState<boolean>(false)

    const changeFilterHandler = (filter: FilterType) => changeFilter(listId, filter)
    const changeTaskInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(error) SetError(false)
        SetTaskTextInput(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(taskTextInput.trim()){
            addTask(listId, taskTextInput.trim())
            SetTaskTextInput("")
        }else{
            SetError(true)
        }

    }
    const enterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key==="Enter") addTaskHandler()
    }

    console.log(taskTextInput)

    return (
        <div>
            <h3 className={style.listTitle}>{title} <button onClick={() => deleteList(listId)}>x</button></h3>
            <div>
                <input className={error? style.error : ""} value={taskTextInput} onChange={changeTaskInputHandler} onKeyDown={enterAddTaskHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <div className={style.errorMessage}>
                {error ? "Task should have title" : ""}
            </div>
            <ul className={style.tasksList}>

                {TasksElements}

            </ul>
            <div>
                {tasks.length ? "" : "There is no tasks in the list"}
            </div>
            <div>
                <button className={ filter === "completed" ? style.btnActive + " " + style.btn : style.btn} onClick={() => changeFilterHandler("completed")}>completed</button>
                <button className={ filter === "all" ? style.btnActive + " " + style.btn : style.btn} onClick={() => changeFilterHandler("all")}>all</button>
                <button className={ filter === "active" ? style.btnActive + " " + style.btn : style.btn} onClick={() => changeFilterHandler("active")}>active</button>
            </div>
        </div>
    );
};