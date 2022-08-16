import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

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
    {id: 6, title: "Cheese", isDone: false},
  ]

  const tasks_3 = [
    {id: 7, title: "TodoList", isDone: true},
    {id: 8, title: "Way of Samuraj", isDone: false},
    {id: 9, title: "Microtasks", isDone: false},
  ]


    return (
        <div className="App">
            <TodoList title={title_1} tasks={tasks_1}/>
            <TodoList title={title_2} tasks={tasks_2}/>
            <TodoList title={title_3} tasks={tasks_3}/>
        </div>
    );
}

export default App;
