import {action} from "@storybook/addon-actions";
import {Task} from "../features/todolistsList/todolist/task/Task";

export default {
    title: "TodoList/Task",
    component: Task
}

const changeStatusCallback = action("Status has changed")
const deleteTaskCallback = action("Task has been deleted")
const taskTitleCallback = action("Task Title changed")

export const TaskBaseExample = () => {
    return (
        <>
            <Task task={{id: "1", title: "React", status: 1, addedDate: "", deadline: "", description: "", order: 1, priority: 2, startDate: "", todoListId: "2"}}
                  changeStatus={changeStatusCallback}
                  deleteTask={deleteTaskCallback}
                  editTaskTitle={taskTitleCallback}/>

            <Task task={{id: "1", title: "JS", status: 1, addedDate: "", deadline: "", description: "", order: 1, priority: 2, startDate: "", todoListId: "3"}}
                  changeStatus={changeStatusCallback}
                  deleteTask={deleteTaskCallback}
                  editTaskTitle={taskTitleCallback}/>
        </>
    )

}

export const DisabledTask = () => {
    return (
        <Task
            task={{id: "1", title: "React", status: 1, addedDate: "", deadline: "", description: "", order: 1, priority: 2, startDate: "", todoListId: "2"}}
            changeStatus={changeStatusCallback}
            deleteTask={deleteTaskCallback}
            editTaskTitle={taskTitleCallback}
            disabled={true}
        />


    )
}