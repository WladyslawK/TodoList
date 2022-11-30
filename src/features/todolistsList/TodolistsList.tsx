import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeFilterAC, changeTodolistTitleTC, deleteTodolistTC,
    FilterType,
    getTodoListsTC,
    TodoListsDomainType
} from "./TodoListsReducer";
import {useSelector} from "react-redux";
import {rootReducerType, useAppDispatch} from "../../app/store";
import {
    addTaskTC,
    deleteTaskTC,
    editTaskTitleAC,
    TasksStateType,
    updateTaskTC
} from "./TasksReducer";
import {TaskStatuses, TaskType} from "../../api/todoList-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {TodoList} from "./todolist/TodoList";

export const TodolistsList = () => {

    //BLL
    useEffect(() => {
        Dispatch(getTodoListsTC())
    }, [])

    const lists = useSelector<rootReducerType, Array<TodoListsDomainType>>(state => state.listsReducer)
    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasksReducer)
    const Dispatch = useAppDispatch()


    const deleteTask = useCallback((todoListId: string, taskId: string) => Dispatch(deleteTaskTC(todoListId, taskId)), [])

    const changeFilter = useCallback((listID: string, filterValue: FilterType) => {
        Dispatch(changeFilterAC(listID, filterValue))
    }, [])

    const addNewTask = useCallback((todoListId: string, title: string) => Dispatch(addTaskTC(todoListId, title)), [])

    const changeTaskStatus = useCallback((todoListId: string, task: TaskType, status: TaskStatuses) => Dispatch(updateTaskTC(todoListId, task, status)), [])
    const deleteList = useCallback((listId: string) => Dispatch(deleteTodolistTC(listId)), [])

    const addTodoList = useCallback((newTitle: string) => {/*
        const action = addTodoListAC(newTitle)
        Dispatch(action)*/
        Dispatch(addTodolistTC(newTitle))
    }, [])

    const editTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => Dispatch(editTaskTitleAC(todoListID, taskID, newTitle)), [])

    const editTodoListTitle = useCallback((listID: string, newTitle: string) => Dispatch(changeTodolistTitleTC(listID, newTitle)), [])

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callback={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    lists.map(list => {
                        return (
                            <Grid key={list.id} item style={{padding: "20px"}}>
                                <Paper style={{padding: "20px"}}>
                                    <TodoList
                                        listId={list.id}
                                        filter={list.filter}
                                        title={list.title}
                                        tasks={tasks[list.id]}
                                        deleteTask={deleteTask}
                                        addTask={addNewTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeTaskStatus}
                                        deleteList={deleteList}
                                        editTaskTitle={editTaskTitle}
                                        editTodoListTitle={editTodoListTitle}/>
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>
        </>
    );
};
