import {useState} from "react";
import {v1} from "uuid";
import {ListType, ObjectTasksType} from "../App";
import {changeFilterAC, changeListTitleAC, deleteListAC, ListsReducers} from "./ListsReducer";


    const listID1 = v1()
    const listID2 = v1()
    const lists: Array<ListType> = [
        {id: listID1, title: "What to Learn", filter: "active"},
        {id: listID2, title: "What to buy", filter: "all"},
    ]

    let tasks : ObjectTasksType = {
        [listID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [listID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ]
    }

test("Second List should be deleted", () => {

    //action
    const listsAfterDelete = ListsReducers (lists, deleteListAC(listID2))

    //expect
    expect(listsAfterDelete.length).toBe(1)
    expect(listsAfterDelete[0].id).toBe(listID1)
    expect(listsAfterDelete.length).not.toBe(lists.length)
})

test("Filter of the first List should be changed to completed", ()=> {
    //action
    const correctedLists = ListsReducers(lists, changeFilterAC(listID1, "completed"))
    //expect

    expect(correctedLists[0].filter).toBe("completed")
})

test("Title of the second list should be changed", ()=> {
    //action
    const correctedLists = ListsReducers(lists, changeListTitleAC(listID2, "What should be done"))
    //expect

    expect(correctedLists[1].title).toBe("What should be done")
})