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
    TasksStateType,
    updateTaskTC
} from "./TasksReducer";
import {TaskStatuses} from "../../api/todoList-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {TodoList} from "./todolist/TodoList";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../constants/constants";

export const TodolistsList = () => {

    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)

    const navigate = useNavigate()

    //BLL
    useEffect(() => {
        if(isLoggedIn){
            Dispatch(getTodoListsTC())
        }

    }, [])

    const lists = useSelector<rootReducerType, Array<TodoListsDomainType>>(state => state.listsReducer)
    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasksReducer)
    const Dispatch = useAppDispatch()


    const deleteTask = useCallback((todoListId: string, taskId: string) => Dispatch(deleteTaskTC(todoListId, taskId)), [])

    const changeFilter = useCallback((listID: string, filterValue: FilterType) => {
        Dispatch(changeFilterAC({ listID, filterValue}))
    }, [])

    const addNewTask = useCallback((todoListId: string, title: string) => Dispatch(addTaskTC(todoListId, title)), [])

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => Dispatch(updateTaskTC(todoListId, taskId, {status})), [])

    const deleteList = useCallback((listId: string) => Dispatch(deleteTodolistTC(listId)), [])

    const addTodoList = useCallback((newTitle: string) => {
        Dispatch(addTodolistTC(newTitle))
    }, [])

    const editTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => Dispatch(updateTaskTC(todoListID, taskID, {title: newTitle})), [])

    const editTodoListTitle = useCallback((listID: string, newTitle: string) => Dispatch(changeTodolistTitleTC(listID, newTitle)), [])

    if(!isLoggedIn){
        navigate(PATH.LOGIN)
    }

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
                                        todolist={list}
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
