import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todoList-api";

type TaskTypeFC = {
    task: TaskType
    changeStatus: (taskId: string, newStatusValue: TaskStatuses) => void
    deleteTask: (taskId: string) => void
    editTaskTitle: (taskId: string, newTitle: string) => void
    disabled?: boolean
}

export const Task: React.FC<TaskTypeFC> = React.memo(({task, deleteTask, editTaskTitle, changeStatus, disabled = false}) => {
    console.log("Task rendered")

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const changeTaskTitleCallback = useCallback((newTitle: string) => editTaskTitle(task.id, newTitle), [editTaskTitle])
    return (
        <div>
            <Checkbox
                checked={task.status === TaskStatuses.Completed ? true : false}
                onChange={changeStatusHandler}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={disabled}
            />

            <EditableSpan
                title={task.title}
                isDone={task.status === TaskStatuses.Completed ? true : false}
                callback={changeTaskTitleCallback}
                disabled={disabled}
            />

            <IconButton
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
                size="large"
                disabled={disabled}>
                <Delete />
            </IconButton>
        </div>
    );
})