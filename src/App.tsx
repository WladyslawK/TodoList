import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterType, TasksType, TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeFilterAC,
    changeListTitleAC,
    deleteListAC, listsReducer
} from "./components/Reducers/ListsReducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    editTaskTitleAC,
    tasksReducer
} from "./components/Reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";

export type ListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [id: string]: TasksType[]
}

function App() {

    //BLL

    const lists = useSelector<rootReducerType, Array<ListType>>(state => state.listsReducer)
    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasksReducer)
    const Dispatch = useDispatch()

    const deleteTask = (listId: string, taskId: string) => Dispatch(deleteTaskAC(listId, taskId))

    const changeFilter = (listID: string, filterValue: FilterType) => {
        Dispatch(changeFilterAC(listID, filterValue))
    }

    const addNewTask = (listId: string, title: string) => Dispatch(addNewTaskAC(listId, title))

    const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => Dispatch(changeTaskStatusAC(listId, taskId, isDone))
    const deleteList = (listId: string) => Dispatch(deleteListAC(listId))

    const filteredTasks = (filter: FilterType, tasks: TasksType[]) => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks

        }
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodoListAC(newTitle)
        Dispatch(action)
        Dispatch(action)
    }

    const editTaskTitle = (todoListID: string, taskID: string, newTitle: string) => Dispatch(editTaskTitleAC(todoListID, taskID, newTitle))

    const editTodoListTitle = (listID: string, newTitle: string) => Dispatch(changeListTitleAC(listID, newTitle))


    //UI
    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <Input callback={addTodoList}/>
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
                                            tasks={filteredTasks(list.filter, tasks[list.id] ? tasks[list.id] : [])}
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
