import React, {useState} from 'react';
import './App.css';
import {FilterType, TasksType, TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

type ListType = {
    id: string
    title: string
    filter: FilterType
}

type ObjectTasksType = {
    [id: string]: TasksType[]
}

function App() {

    //BLL
    const listID1 = v1()
    const listID2 = v1()

    const [lists, setLists] = useState<ListType[]>([
        {id: listID1, title: "What to Learn", filter: "active"},
        {id: listID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<ObjectTasksType>({
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

    const deleteTask = (listId: string, taskId: string) => setTasks({
        ...tasks,
        [listId]: tasks[listId].filter(task => task.id !== taskId)
    })

    const changeFilter = (listID: string, filterValue: FilterType) => {
        setLists(lists.map(list => list.id === listID ? {...list, filter: filterValue} : list))
    }

    const addNewTask = (listId: string, title: string) => setTasks({
        ...tasks,
        [listId]: [...tasks[listId], {id: v1(), title, isDone: false}]
    })

    const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => setTasks({
        ...tasks,
        [listId]: tasks[listId].map(task => task.id === taskId ? {...task, isDone} : task)
    })

    const deleteList = (listId: string) => setLists(lists.filter(list => list.id !== listId))

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
        const newListId = v1()
        setLists([{id: newListId, title: newTitle, filter: "all"}, ...lists])
        setTasks({...tasks, [newListId]: []})
    }

    const editTaskTitle = (todoListID: string, taskID: string, newTitle: string) => setTasks({
        ...tasks,
        [todoListID]: tasks[todoListID].map(task => task.id === taskID ? {...task, title: newTitle} : task)
    })

    const editTodoListTitle = (listID: string, newTitle: string) => setLists(lists.map(list => list.id === listID ? {
        ...list,
        title: newTitle
    } : list))


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
                                <Grid item style={{padding: "20px"}}>
                                    <Paper style={{padding: "20px"}}>
                                        <TodoList
                                            key={list.id}
                                            listId={list.id}
                                            filter={list.filter}
                                            title={list.title}
                                            tasks={filteredTasks(list.filter, tasks[list.id])}
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
