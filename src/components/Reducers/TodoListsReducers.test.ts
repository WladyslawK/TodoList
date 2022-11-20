import {v1} from "uuid";
import {
    addTodoListAC,
    changeFilterAC,
    changeListTitleAC,
    deleteListAC,
    TodoListsDomainType,
    todoListsReducer
} from "./TodoListsReducer";
import {TasksStateType} from "./TasksReducer";


    const listID1 = v1()
    const listID2 = v1()
    const lists: Array<TodoListsDomainType> = [
        {id: listID1, title: "What to Learn", filter: "active", order: 0, addedDate: ""},
        {id: listID2, title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ]

    let tasks : TasksStateType = {
        [listID1]: [
            {id: v1(), title: "HTML&CSS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1},
            {id: v1(), title: "JS", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1},
            {id: v1(), title: "React", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID1},
        ],
        [listID2]: [
            {id: v1(), title: "Milk", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
            {id: v1(), title: "Bread", status: 2, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
            {id: v1(), title: "Meat", status: 1, addedDate: "", order: 1, deadline: "", startDate: "", description: "", priority: 2, todoListId: listID2},
        ]
    }

test("Second TodoList should be deleted", () => {

    //action
    const listsAfterDelete = todoListsReducer (lists, deleteListAC(listID2))

    //expect
    expect(listsAfterDelete.length).toBe(1)
    expect(listsAfterDelete[0].id).toBe(listID1)
    expect(listsAfterDelete.length).not.toBe(lists.length)
})

test("Filter of the first TodoList should be changed to completed", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, changeFilterAC(listID1, "completed"))
    //expect

    expect(correctedLists[0].filter).toBe("completed")
})

test("Title of the second TodoList should be changed", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, changeListTitleAC(listID2, "What should be done"))
    //expect

    expect(correctedLists[1].title).toBe("What should be done")
})

test("Add a new list", ()=> {
    //action
    const correctedLists = todoListsReducer(lists, addTodoListAC( "What should be done"))


    const key = Object.keys(correctedLists)
    if(!key){
        throw Error ("New key should be added")
    }

    //expect

    expect(correctedLists.length).toBe(3)
    expect(correctedLists[0].title).toBe("What should be done")
})