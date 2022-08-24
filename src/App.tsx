import React, {useState} from 'react';
import './App.css';
import {FilterType, tasksType, TodoList} from "./components/TodoList";

//export type filterValuesType = "completed" | "active" | "all"

function App() {

    //BLL
    const title_1 = "What to Learn"
    const title_2 = "What to Buy"
    const title_3 = "Homework"

    const tasks_1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks_2 = [
        {id: 4, title: "Water", isDone: false},
        {id: 5, title: "Bread", isDone: true},

    ]

    const tasks_3 = [
        {id: 7, title: "TodoList", isDone: true},
        {id: 8, title: "Way of Samuraj", isDone: false},
        {id: 8, title: "Microtasks", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<tasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: number) =>{
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


    //UI

    return (
        <div className="App">
            <TodoList title={title_1} tasks={filteredTasks()} deleteTask={deleteTask} changeFilter={changeFilter}/>
            {/*<TodoList title={title_2} tasks={tasks_2}/>
            <TodoList title={title_3} tasks={tasks_3}/>*/}
        </div>
    );
}

export default App;
