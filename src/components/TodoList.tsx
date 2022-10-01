import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "./TodoList.module.css"
import {Input} from "./Input";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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


export const TodoList: React.FC<todoListPropsType> = ({
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

    const changeFilterHandler = (filter: FilterType) => changeFilter(listId, filter)

    const addTaskHandler = (newTitle: string) => {
        addTask(listId, newTitle)
    }

    const changeTodoListTitle = (newTitle: string) => {
        editTodoListTitle(listId, newTitle)
    }

    const changeTaskStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => changeStatus(listId, taskId, event.currentTarget.checked)

    /*give two attributes one is given from map itself and one after in Span*/
    const changeTitleHandler = (tasId: string, newTitle: string) => editTaskTitle(listId, tasId, newTitle)

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

    const TasksElements = tasks.map(task => {

            /*const changeTitleHandler = (newTitle: string) => editTaskTitle(listId, task.id, newTitle)*/

                return (
                <li key={task.id}>

                    <Checkbox
                        checked={task.isDone}
                        onChange={(e) => changeTaskStatusHandler(task.id, e)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                    <EditableSpan
                        title={task.title}
                        isDone={task.isDone}
                        callback={(newTitle) => changeTitleHandler(task.id, newTitle)}
                    />

                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteTask(listId, task.id)}
                        size="large">
                        <Delete />
                    </IconButton>

                </li>)
        }
    )



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
                <Input callback={addTaskHandler}/>
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
};