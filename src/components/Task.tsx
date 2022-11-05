import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./TodoList";

type TaskTypeFC = {
    task: TasksType
    changeStatus: (taskId: string, newStatusValue: boolean) => void
    deleteTask: (taskId: string) => void
    editTaskTitle: (taskId: string, newTitle: string) => void

}

export const Task: React.FC<TaskTypeFC> = React.memo(({task, deleteTask, editTaskTitle, changeStatus}) => {
    console.log("Task rendered")

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, e.currentTarget.checked)
    }

    const changeTaskTitleCallback = useCallback((newTitle: string) => editTaskTitle(task.id, newTitle), [editTaskTitle])
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
                callback={changeTaskTitleCallback}
            />

            <IconButton
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
                size="large">
                <Delete />
            </IconButton>
        </div>
    );
})