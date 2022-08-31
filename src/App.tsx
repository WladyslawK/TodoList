import React, {useState} from 'react';
import './App.css';
import {FilterType, TasksType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

//export type filterValuesType = "completed" | "active" | "all"

function App() {

    //BLL
    const title_1 = "What to Learn"
    const title_2 = "What to Buy"

    const tasks_1 = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ]

    const tasks_2 = [
        {id: v1(), title: "Water", isDone: false},
        {id: v1(), title: "Bread", isDone: true},

    ]

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: string) =>{
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    const filteredTasks = () => {
        switch (filter){
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const addTask = (newTitle: string) => {
        let newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === id)
        if(task) task.isDone = isDone
        setTasks([...tasks])
    }

    //UI

    return (
        <div className="App">
            <TodoList title={title_1} tasks={filteredTasks()} addTask={addTask} deleteTask={deleteTask} changeFilter={changeFilter} changeTaskStatus={changeTaskStatus}/>
            {/*<TodoList title={title_2} tasks={tasks_2}/>
            <TodoList title={title_3} tasks={tasks_3}/>*/}
        </div>
    );
}

export default App;
