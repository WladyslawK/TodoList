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

    const addTask = (newTitle: string) => {
        let newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (id: string, isDone: boolean) => setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))

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



    //UI

    return (
        <div className="App">
            <TodoList title={title_1} tasks={filteredTasks()} addTask={addTask} deleteTask={deleteTask} changeFilter={changeFilter} changeStatus={changeStatus} filter={filter}/>
            {/*<TodoList title={title_2} tasks={tasks_2}/>
            <TodoList title={title_3} tasks={tasks_3}/>*/}
        </div>
    );
}

export default App;
