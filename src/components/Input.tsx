import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "./TodoList.module.css"

type InputType = {
    callback: (newTitle: string) => void
}

export const Input: React.FC<InputType> = ({callback}) => {

    const [taskTextInput, SetTaskTextInput] = useState<string>("")
    const [error, SetError] = useState<boolean>(false)

    const changeTaskInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error) SetError(false)
        SetTaskTextInput(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (taskTextInput.trim()) {
            callback(taskTextInput.trim())
            SetTaskTextInput("")
        } else {
            SetError(true)
        }
    }
    const enterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addTaskHandler()
    }

    return (
        <>
            <div>
                <input className={error ? style.error : ""} value={taskTextInput} onChange={changeTaskInputHandler}
                       onKeyDown={enterAddTaskHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <div className={style.errorMessage}>
                {error ? "Task should have title" : ""}
            </div>
        </>
    );
};
