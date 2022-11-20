import {v1} from "uuid";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    editTaskTitleAC,
    tasksReducer,
    TasksStateType
} from "./TasksReducer";
import {TaskStatuses} from "../../todoList-api";
const listID1 = v1()
const listID2 = v1()

let tasks : TasksStateType = {
    [listID1]: [
        {id: v1(), title: "HTML&CSS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1},
        {id: v1(), title: "React", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1},
        {id: v1(), title: "JS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1}
    ],
    [listID2]: [
        {id: v1(), title: "Milk", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
        {id: v1(), title: "Bread", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
        {id: v1(), title: "Meat", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
    ]
}


test("Task React should be deleted", () => {

    //action
    const newTasks = tasksReducer(tasks, deleteTaskAC(listID1, "2"))


    //expect
    expect(newTasks[listID1].length).toBe(2)
    expect(newTasks[listID1][1].title).toBe("JS")
})


test("Add new task to first TodoList", () => {

    //action
    const newTasks = tasksReducer(tasks, addNewTaskAC(listID1, "Angular"))


    //expect
    expect(newTasks[listID1].length).toBe(4)
    expect(newTasks[listID1][0].title).toBe("Angular")
})

test("change React task Status in TodoList 1", () => {

    //action
    const newTasks = tasksReducer(tasks, changeTaskStatusAC(listID1, "2",true))


    //expect
    expect(newTasks[listID1][1].title).toBe("Meat")
    expect(newTasks[listID1][1].title).not.toBe(tasks[listID1][1].title)
})

test("change title of the task in the TodoList 2", () => {

    //action
    const newTasks = tasksReducer(tasks, editTaskTitleAC(listID2, "5","Meat"))


    //expect
    expect(newTasks[listID2][1].status).toBe(TaskStatuses.Completed)
    expect(newTasks[listID2][1].status).not.toBe(tasks[listID1][1].status)
})