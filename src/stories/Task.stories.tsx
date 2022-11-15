import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";

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
            <Task task={{id: "1", title: "React", isDone: false}}
                  changeStatus={changeStatusCallback}
                  deleteTask={deleteTaskCallback}
                  editTaskTitle={taskTitleCallback}/>

            <Task task={{id: "1", title: "JS", isDone: true}}
                  changeStatus={changeStatusCallback}
                  deleteTask={deleteTaskCallback}
                  editTaskTitle={taskTitleCallback}/>
        </>
    )

}