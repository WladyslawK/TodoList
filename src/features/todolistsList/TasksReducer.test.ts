import {v1} from "uuid";
import {
    addNewTaskAC,
    deleteTaskAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from "./TasksReducer";

const listID1 = v1()
const listID2 = v1()


enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

let tasks: TasksStateType = {
    [listID1]: [
        {
            id: "1",
            title: "HTML&CSS",
            status: 1,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID1
        },
        {
            id: "2",
            title: "React",
            status: 1,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID1
        },
        {
            id: "3",
            title: "JS",
            status: 1,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID1
        }
    ],
    [listID2]: [
        {
            id: "4",
            title: "Milk",
            status: 1,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID2
        },
        {
            id: "5",
            title: "Bread",
            status: 1,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID2
        },
        {
            id: "6",
            title: "Meat",
            status: 2,
            addedDate: "",
            order: 1,
            deadline: "",
            startDate: "",
            description: "",
            priority: 2,
            todoListId: listID2
        },
    ]
}


test("Task React should be deleted", () => {

    //action
    const newTasks = tasksReducer(tasks, deleteTaskAC(listID1, "3"))


    //expect
    expect(newTasks[listID1].length).toBe(2)
    expect(newTasks[listID1][1].title).toBe("React")
})


test("Add new task to first TodoList", () => {

    //action
    const newTask = {
        addedDate: "",
        deadline: "",
        description: "",
        id: "7",
        order: 2,
        priority: 2,
        startDate: "",
        status: 1,
        title: "Angular",
        todoListId: ""
    }

    const newTasks = tasksReducer(tasks, addNewTaskAC(listID1, newTask))


    //expect
    expect(newTasks[listID1].length).toBe(4)
    expect(newTasks[listID1][0].title).toBe("Angular")
})

test("change React task Status to Completed (2) in TodoList 1", () => {

    //action
    const newTasks = tasksReducer(tasks, updateTaskAC(listID1, "2", {status: TaskStatuses.Completed}))


    //expect
    expect(newTasks[listID1][1].status).toBe(TaskStatuses.Completed)
    expect(newTasks[listID1][1].status).not.toBe(tasks[listID1][1].status)
})

test("change title of the task in the TodoList 2", () => {

    //action
    const newTasks = tasksReducer(tasks, updateTaskAC(listID2, "5", {title: "Meat"}))


    //expect
    expect(newTasks[listID2][1].title).toBe("Meat")
    expect(newTasks[listID2][1].title).not.toBe(tasks[listID1][1].title)
})