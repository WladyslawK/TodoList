import React, {useCallback, useMemo, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeFilterAC,
    changeListTitleAC,
    deleteListAC, FilterType, TodoListsDomainType, todoListsReducer
} from "./components/Reducers/TodoListsReducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    editTaskTitleAC,
    tasksReducer, TasksStateType
} from "./components/Reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {TaskType} from "./todoList-api";



function App() {

    //BLL

    const lists = useSelector<rootReducerType, Array<TodoListsDomainType>>(state => state.listsReducer)
    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasksReducer)
    const Dispatch = useDispatch()

    const deleteTask = useCallback((listId: string, taskId: string) => Dispatch(deleteTaskAC(listId, taskId)),[])

    const changeFilter = useCallback((listID: string, filterValue: FilterType) => {
        Dispatch(changeFilterAC(listID, filterValue))
    },[])

    const addNewTask = useCallback((listId: string, title: string) => Dispatch(addNewTaskAC(listId, title)),[])

    const changeTaskStatus = useCallback((listId: string, taskId: string, isDone: boolean) => Dispatch(changeTaskStatusAC(listId, taskId, isDone)),[])
    const deleteList = useCallback((listId: string) => Dispatch(deleteListAC(listId)),[])

    /*const filteredTasks = (filter: FilterType, tasks: TaskType[]):Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.status === )
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks

        }
    }*/

    const addTodoList = useCallback( (newTitle: string) => {
        const action = addTodoListAC(newTitle)
        Dispatch(action)
    },[])

    const editTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => Dispatch(editTaskTitleAC(todoListID, taskID, newTitle)),[])

    const editTodoListTitle = useCallback((listID: string, newTitle: string) => Dispatch(changeListTitleAC(listID, newTitle)),[])


    //UI
    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
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
            </Container>
        </div>
    )
        ;
}

export default App;
