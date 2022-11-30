import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../../features/todolistsList/todolist/TodoList.module.css"
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    isDone?: boolean
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, isDone, callback}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [currentTitle, setCurrentTitle] = useState<string>(title)

    const changeEditHandler = () => {
        if(edit) callback(currentTitle)
        setEdit(!edit)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter") changeEditHandler()
    }

    const changeCurrentTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
        //callback(currentTitle)
    }
    return (
        edit ?
            <TextField
                size={"small"}
                label="Type in ..."
                value={currentTitle}
                onKeyDown={onKeyDownHandler}
                onBlur={changeEditHandler}
                onChange={changeCurrentTitleHandler}
                autoFocus
            /> :

            <span
                className={isDone ? style.completedTasks : ""} onDoubleClick={changeEditHandler}>
                {currentTitle}
            </span>

    );
};
