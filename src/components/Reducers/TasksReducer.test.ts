import {v1} from "uuid";
import {ObjectTasksType} from "../../App";
import {addNewTask, deleteTaskAC, tasksReducerTest} from "./TasksReducer";
const listID1 = v1()
const listID2 = v1()

let tasks: ObjectTasksType = {
    [listID1]: [
        {id: "1", title: "HTML&CSS", isDone: true},
        {id: "2", title: "React", isDone: false},
        {id: "3", title: "JS", isDone: true},
    ],
    [listID2]: [
        {id: "4", title: "Milk", isDone: false},
        {id: "5", title: "Bread", isDone: true},
        {id: "6", title: "Meat", isDone: true},
    ]
}


test("Task React should be deleted", () => {

    //action
    const newTasks = tasksReducerTest(tasks, deleteTaskAC(listID1, "2"))


    //expect
    expect(newTasks[listID1].length).toBe(2)
    expect(newTasks[listID1][1].title).toBe("JS")
})


test("Add new task to first List", () => {

    //action
    const newTasks = tasksReducerTest(tasks, addNewTask(listID1, "Angular"))


    //expect
    expect(newTasks[listID1].length).toBe(4)
    expect(newTasks[listID1][0].title).toBe("Angular")
})

