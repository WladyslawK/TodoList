import React, {useCallback, useEffect} from 'react';
import style from "./TodoList.module.css"
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {Button} from "@mui/material";
import {Task} from "./task/Task";
import {TaskStatuses, TaskType} from "../../../api/todoList-api";
import {FilterType, TodoListsDomainType} from "../TodoListsReducer";
import {useAppDispatch} from "../../../app/store";
import {getTasksTC} from "../TasksReducer";

type todoListPropsType = {
    todolist: TodoListsDomainType
    tasks: Array<TaskType>,
    deleteTask: (listId: string, taskId: string) => void
    addTask: (listId: string, newTaskTitle: string) => void
    changeFilter: (listId: string, filterValue: FilterType) => void
    changeStatus: (listId: string, taskId: string, status: TaskStatuses) => void
    deleteList: (listId: string) => void
    editTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    editTodoListTitle: (todoListID: string, newTitle: string) => void
}


export const TodoList: React.FC<todoListPropsType> = React.memo(({
                                                          todolist,
                                                          tasks,
                                                          addTask,
                                                          deleteTask,
                                                          changeFilter,
                                                          changeStatus,
                                                          deleteList, editTaskTitle, editTodoListTitle
                                                      }) => {
    console.log("TodoList called")

    useEffect(() => {
        Dispatch(getTasksTC(todolist.id))
    }, [])

    const Dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterType) => changeFilter(todolist.id, filter)

    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(todolist.id, newTitle)
    },[])

    const changeTodoListTitle = (newTitle: string) => {
        editTodoListTitle(todolist.id, newTitle)
    }

    const changeTaskStatusCallback = useCallback((taskId: string, newStatusValue: TaskStatuses) => changeStatus(todolist.id, taskId, newStatusValue),[changeStatus])

    const deleteTaskCallback = useCallback((taskId: string) => deleteTask(todolist.id, taskId),[deleteTask])

    /*give two attributes one is given from map itself and one after in Span*/
    const changeTaskTitleCallback = useCallback((taskId: string, newTitle: string) => editTaskTitle(todolist.id, taskId, newTitle),[editTaskTitle])

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

    if(todolist.filter === "active"){
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if(todolist.filter === "completed"){
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const TasksElements = filteredTasks && filteredTasks.map(task => <li key={task.id}><Task
        task={task}
        changeStatus={changeTaskStatusCallback}
        deleteTask={deleteTaskCallback}
        editTaskTitle={changeTaskTitleCallback}
        disabled={todolist.entityStatus === "loading"}
    /></li>)


    return (
        <div>
            <h3 className={style.listTitle}><EditableSpan title={todolist.title} callback={changeTodoListTitle} disabled={todolist.entityStatus === "loading"}/>
                <Button
                    variant={"outlined"}
                    color={"error"}
                    style={deleteBtn}
                    onClick={() => deleteList(todolist.id)}
                    disabled={todolist.entityStatus === "loading"}
                >x</Button>
            </h3>
            <div>
                <AddItemForm callback={addTaskHandler} />
            </div>
            <ul className={style.tasksList}>

                {TasksElements}

            </ul>
            <div>
                {tasks.length ? "" : "There is no tasks in the list"}
            </div>
            <div>

                <Button variant={todolist.filter === "completed" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("completed")}>completed</Button>

                <Button variant={todolist.filter === "all" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("all")}>all</Button>

                <Button variant={todolist.filter === "active" ? "contained" : "outlined"} style={btn} onClick={() => changeFilterHandler("active")}>active</Button>

            </div>
        </div>
    );
})