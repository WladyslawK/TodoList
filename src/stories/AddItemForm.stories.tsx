import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "TodoList/AddItemForm",
    component: AddItemForm
}

const callback = action("Button add was pressed inside the form")

export const AddItemFormExample = ( ) => {
    return <AddItemForm callback={callback}/>
}

export const DisabledAddItemForm = () => {
    return <AddItemForm callback={callback} disabled={true}/>
}