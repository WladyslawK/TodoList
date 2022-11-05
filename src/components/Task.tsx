import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./TodoList";

type TaskTypeFC = {
    task: TasksType
    changeStatus: (newStatusValue: boolean) => void
    deleteTask: () => void
    editTaskTitle: (newTitle: string) => void

}

export const Task: React.FC<TaskTypeFC> = ({task, deleteTask, editTaskTitle, changeStatus}) => {

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(e.currentTarget.checked)
    }


    return (
        <div>
            <Checkbox
                checked={task.isDone}
                onChange={changeStatusHandler}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <EditableSpan
                title={task.title}
                isDone={task.isDone}
                callback={editTaskTitle}
            />

            <IconButton
                aria-label="delete"
                onClick={deleteTask}
                size="large">
                <Delete />
            </IconButton>
        </div>
    );
};