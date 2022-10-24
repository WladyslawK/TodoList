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
    deleteListAC,
    ListsReducer
} from "./components/Reducers/ListsReducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    editTaskTitleAC,
    tasksReducer
} from "./components/Reducers/TasksReducer";

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
    const listID1 = v1()
    const listID2 = v1()

    const [lists, listsDispatch] = useReducer(ListsReducer,[
        {id: listID1, title: "What to Learn", filter: "active"},
        {id: listID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [listID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [listID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ]
    })

    const deleteTask = (listId: string, taskId: string) => tasksDispatch(deleteTaskAC(listId, taskId))

    const changeFilter = (listID: string, filterValue: FilterType) => {
        listsDispatch(changeFilterAC(listID, filterValue))
    }

    const addNewTask = (listId: string, title: string) => tasksDispatch(addNewTaskAC(listId, title))

    const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => tasksDispatch(changeTaskStatusAC(listId, taskId, isDone))
    const deleteList = (listId: string) => listsDispatch(deleteListAC(listId))

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
        listsDispatch(action)
        tasksDispatch(action)
    }

    const editTaskTitle = (todoListID: string, taskID: string, newTitle: string) => tasksDispatch(editTaskTitleAC(todoListID, taskID, newTitle))

    const editTodoListTitle = (listID: string, newTitle: string) => listsDispatch(changeListTitleAC(listID, newTitle))


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
