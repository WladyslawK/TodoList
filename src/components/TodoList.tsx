import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "./TodoList.module.css"
import {Input} from "./Input";
import {EditableSpan} from "./EditableSpan";

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

    /*give two attributes one is given from map itself and one after in Span*/
    const changeTitleHandler = (tasId: string, newTitle: string) => editTaskTitle(listId, tasId, newTitle)

    const TasksElements = tasks.map(task => {

            /*const changeTitleHandler = (newTitle: string) => editTaskTitle(listId, task.id, newTitle)*/

                return (
                <li key={task.id}>
                    <input onChange={(event) => changeStatus(listId, task.id, event.currentTarget.checked)} type='checkbox'
                           checked={task.isDone}/>
                    <EditableSpan title={task.title} isDone={task.isDone} callback={(newTitle) => changeTitleHandler(task.id, newTitle)}/>
                    <button onClick={() => {
                        deleteTask(listId, task.id)
                    }}>x
                    </button>
                </li>)
        }
    )


    return (
        <div>
            <h3 className={style.listTitle}><EditableSpan title={title} callback={changeTodoListTitle}/>
                <button onClick={() => deleteList(listId)}>x</button>
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
                <button className={filter === "completed" ? style.btnActive + " " + style.btn : style.btn}
                        onClick={() => changeFilterHandler("completed")}>completed
                </button>
                <button className={filter === "all" ? style.btnActive + " " + style.btn : style.btn}
                        onClick={() => changeFilterHandler("all")}>all
                </button>
                <button className={filter === "active" ? style.btnActive + " " + style.btn : style.btn}
                        onClick={() => changeFilterHandler("active")}>active
                </button>
            </div>
        </div>
    );
};