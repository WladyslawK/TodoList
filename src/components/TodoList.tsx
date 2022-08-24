import React from 'react';

export type tasksType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterType = "all" | "completed" | "active"

type todoListPropsType = {
    title: string,
    tasks: Array<tasksType>,
    deleteTask: (id: number) => void
    changeFilter: (filterValue: FilterType)=> void
}


export const TodoList: React.FC<todoListPropsType> = ({title, tasks, deleteTask, changeFilter}) =>{

    const TasksElements = tasks.map(t => (<li><input  key={t.id} type='checkbox' checked={t.isDone}/> <span>{t.title}</span><button onClick={() => {deleteTask(t.id)
    }}>x</button></li>))

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    TasksElements
                }

            </ul>
            <div>
                <button onClick={() => changeFilter("completed")}>completed</button>
                <button onClick={() => changeFilter("active")}>active</button>
                <button onClick={() => changeFilter("all")}>all</button>
            </div>
        </div>
    );
};