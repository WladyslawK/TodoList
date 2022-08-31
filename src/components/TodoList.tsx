import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterType = "all" | "completed" | "active"

type todoListPropsType = {
    title: string,
    tasks: Array<TasksType>,
    deleteTask: (id: string) => void
    addTask: (newTaskTitle: string) => void
    changeFilter: (filterValue: FilterType)=> void
}


export const TodoList: React.FC<todoListPropsType> = ({title, tasks, addTask, deleteTask, changeFilter}) =>{

    const TasksElements = tasks.map(task => (<li key={task.id}><input type='checkbox' checked={task.isDone}/> <span>{task.title}</span><button onClick={() => {deleteTask(task.id)
    }}>x</button></li>))

    const [taskTextInput, SetTaskTextInput] = useState("")

    const changeFilterHandler = (filter: FilterType) => changeFilter(filter)
    const changeTaskInputHandler = (event: ChangeEvent<HTMLInputElement>) => SetTaskTextInput(event.currentTarget.value)
    const addTaskHandler = () => {
        addTask(taskTextInput)
        SetTaskTextInput("")
    }
    const enterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key==="Enter") addTaskHandler()
    }

    console.log(taskTextInput)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTextInput} onChange={changeTaskInputHandler} onKeyDown={enterAddTaskHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    TasksElements
                }

            </ul>
            <div>
                <button onClick={() => changeFilterHandler("completed")}>completed</button>
                <button onClick={() => changeFilterHandler("active")}>active</button>
                <button onClick={() => changeFilterHandler("all")}>all</button>
            </div>
        </div>
    );
};