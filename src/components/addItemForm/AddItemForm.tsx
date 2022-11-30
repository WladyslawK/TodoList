import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../../features/todolistsList/todolist/TodoList.module.css"
import {Button, TextField} from "@mui/material";

type AddItemFormType = {
    callback: (newTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo(({callback}) => {
    console.log("AddItemForm called")
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

    const btn = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        marginLeft: "5px"
    }

    return (
        <>
            <div>
                {/*<input
                    className={error ? style.error : ""}
                    value={taskTextInput} onChange={changeTaskInputHandler}
                    onKeyDown={enterAddTaskHandler}
                />*/}

                <TextField
                    size={"small"}
                    label="Type in ..."
                    value={taskTextInput}
                    onKeyDown={enterAddTaskHandler}
                    onChange={changeTaskInputHandler}
                />

                <Button
                    variant="contained"
                    onClick={addTaskHandler}
                    style={btn}>+</Button>
            </div>
            <div className={style.errorMessage}>
                {error ? "Task should have title" : ""}
            </div>
        </>
    );
})
