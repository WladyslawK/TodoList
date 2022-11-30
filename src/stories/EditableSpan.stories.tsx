import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/editableSpan/EditableSpan";

export default {
    title: "TodoList/EditableSpan",
    component: EditableSpan
}

const taskTitleCallback = action("Task Title changed")

export const EditableSpanBaseExample = () => {
    return (
        <>
            <EditableSpan title={"React"}
                          callback={taskTitleCallback}
                          isDone={false}/>
        </>
    )

}