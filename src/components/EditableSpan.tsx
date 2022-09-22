import React, {ChangeEvent, useState} from 'react';
import style from "./TodoList.module.css"

type EditableSpanType = {
    title: string
    isDone?: boolean
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, isDone, callback}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [currentTitle, setCurrentTitle] = useState<string>(title)

    const changeEditHandler = () => {
        if(edit === false) callback(currentTitle)
        setEdit(!edit)
    }

    const changeCurrentTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
        callback(currentTitle)
    }
    return (
        edit ?
            <input value={currentTitle} onChange={changeCurrentTitleHandler} autoFocus onBlur={changeEditHandler}/> :
            <span className={isDone ? style.completedTasks : ""} onDoubleClick={changeEditHandler}>{currentTitle}</span>

    );
};
