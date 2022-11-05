import React, {ChangeEvent, useCallback} from 'react';
import style from "./TodoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

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
    changeFilter: (listId: string, filterValue: FilterType) => void
    changeStatus: (listId: string, taskId: string, isDone: boolean) => void
    deleteList: (listId: string) => void
    editTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    editTodoListTitle: (todoListID: string, newTitle: string) => void
}


export const TodoList: React.FC<todoListPropsType> = React.memo(({
                                                          listId,
                                                          title,
                                                          tasks,
                                                          addTask,
                                                          deleteTask,
                                                          changeFilter,
                                                          changeStatus,
                                                          filter,
                                                          deleteList, editTaskTitle, editTodoListTitle
                                                      }) => {
    console.log("TodoList called")
    const changeFilterHandler = (filter: FilterType) => changeFilter(listId, filter)

    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(listId, newTitle)
    },[])

    const changeTodoListTitle = (newTitle: string) => {
        editTodoListTitle(listId, newTitle)
    }

    const changeTaskStatusCallback = (taskId: string, newStatusValue: boolean) => changeStatus(listId, taskId, newStatusValue)

    const deleteTaskCallback = (taskId: string) => deleteTask(listId, taskId)

    /*give two attributes one is given from map itself and one after in Span*/
    const changeTaskTitleCallback = (taskId: string, newTitle: string) => editTaskTitle(listId, taskId, newTitle)

    const btn = {
        minWidth: "60px",
        minHeight: "30px",
        maxWidth: "60px",
        maxHeight: "30px",
        fontSize: "8px",
        marginLeft: "5px",
    }

    const deleteBtn = {
        minWidth: "30px",
        minHeight: "30px",
        maxWidth: "30px",
        maxHeight: "30px",
        fontSize: "8px",
        marginLeft: "5px",
    }

    let filteredTasks = tasks

    if(filter === "active"){
        filteredTasks = tasks.filter(task => task.isDone === false)
    }
    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.isDone === true)
    }

    const TasksElements = filteredTasks && filteredTasks.map(task => <li key={task.id}><Task
        task={task}
        changeStatus={(newStatusValue)=> changeTaskStatusCallback(task.id, newStatusValue)}
        deleteTask={()=> deleteTaskCallback(task.id)}
        editTaskTitle={(newTitle: string) => changeTaskTitleCallback(task.id, newTitle)}
    /></li>)



    return (
        <div>
            <h3 className={style.listTitle}><EditableSpan title={title} callback={changeTodoListTitle}/>
                <Button
                    variant={"outlined"}
                    color={"error"}
                    style={deleteBtn}
                    onClick={() => deleteList(listId)}>x</Button>
            </h3>
            <div>
                <AddItemForm callback={addTaskHandler}/>
            </div>
            <ul className={style.tasksList}>

                {TasksElements}

            </ul>
            <div>
                {tasks.length ? "" : "There is no tasks in the list"}
            </div>
            <div>

                <Button variant={filter === "completed" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("completed")}>completed</Button>

                <Button variant={filter === "all" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("all")}>all</Button>

                <Button variant={filter === "active" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("active")}>active</Button>

            </div>
        </div>
    );
})