import React, {useState} from 'react';
import './App.css';
import {FilterType, TasksType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

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
   /* const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])*/

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



    const deleteTask = (listId: string, taskId: string) => setTasks({...tasks, [listId]: tasks[listId].filter(task => task.id !== taskId)})

    const changeFilter = (listID: string, filterValue: FilterType) => {
        setLists(lists.map(list => list.id === listID ?  {...list, filter: filterValue} : list))
    }

    const addNewTask = (listId: string, title: string) => setTasks({...tasks, [listId]: [...tasks[listId], {id: v1(), title, isDone: false}]})

    const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => setTasks({...tasks, [listId]: tasks[listId].map(task => task.id === taskId ? {...task, isDone} : task)})

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


    //UI

    return (
        <div className="App">
            {
                lists.map(list => {
                    return <TodoList key={list.id} listId={list.id} filter={list.filter} title={list.title} tasks={filteredTasks(list.filter, tasks[list.id])} deleteTask={deleteTask} addTask={addNewTask} changeFilter={changeFilter} changeStatus={changeTaskStatus} deleteList={deleteList}/>
                })
            }
           {/* <TodoList title={title_1} tasks={filteredTasks()} addTask={addTask} deleteTask={deleteTask} changeFilter={changeFilter} changeStatus={changeStatus} filter={filter}/>*/}
        </div>
    );
}

export default App;
