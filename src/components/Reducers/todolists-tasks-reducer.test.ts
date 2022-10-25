import {addTodoListAC, listsReducer} from "./ListsReducer";
import {tasksReducer} from "./TasksReducer";
import {ListType, TasksStateType} from "../../App";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<ListType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = listsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.listId)
    expect(idFromTodolists).toBe(action.payload.listId)
})
