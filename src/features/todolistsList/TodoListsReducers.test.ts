import {v1} from "uuid";
import {
    addTodoListAC,
    changeFilterAC,
    changeListTitleAC,
    deleteListAC, setTodoListEntityStatus,
    TodoListsDomainType,
    todoListsReducer
} from "./TodoListsReducer";
import {TasksStateType} from "./TasksReducer";

    const lists: Array<TodoListsDomainType> = [
        {id: "2", title: "What to Learn", filter: "active", order: 0, addedDate: "", entityStatus: "idle"},
        {id: "4", title: "What to buy", filter: "all", order: 1, addedDate: "", entityStatus: "idle"},
    ]

    let tasks : TasksStateType = {
        "2": [
            {id: v1(), title: "HTML&CSS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "2"},
            {id: v1(), title: "JS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "2"},
            {id: v1(), title: "React", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "2"},
        ],
        "4": [
            {id: v1(), title: "Milk", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "4"},
            {id: v1(), title: "Bread", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "4"},
            {id: v1(), title: "Meat", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: "4"},
        ]
    }

test("Second TodoList should be deleted", () => {

    //action
    const listsAfterDelete = todoListsReducer (lists, deleteListAC("4"))

    //expect
    expect(listsAfterDelete.length).toBe(1)
    expect(listsAfterDelete[0].id).toBe("2")
    expect(listsAfterDelete.length).not.toBe(lists.length)
})

test("Filter of the first TodoList should be changed to completed", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, changeFilterAC("2", "completed"))
    //expect
    expect(correctedLists[0].filter).toBe("completed")
})

test("Title of the second TodoList should be changed", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, changeListTitleAC("4", "What should be done"))
    //expect

    expect(correctedLists[1].title).toBe("What should be done")
})

test("Add a new list", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, addTodoListAC( {id: "33", title: "What should be done", addedDate: "string", order: 2}))

    const key = Object.keys(correctedLists)
    if(!key){
        throw Error ("New key should be added")
    }

    //expect

    expect(correctedLists.length).toBe(3)
    expect(correctedLists[0].title).toBe("What should be done")
})

test("change todolist status to loading", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, setTodoListEntityStatus("4", "loading"))

    //expect
    expect(correctedLists[1].entityStatus).toBe("loading")
})