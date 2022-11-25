import {addTodoListAC, TodoListsDomainType, todoListsReducer} from "./TodoListsReducer";
import {tasksReducer, TasksStateType} from "./TasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListsDomainType> = []

    const action = addTodoListAC({
        id: "33",
        title: "New Todolist",
        addedDate: "string",
        order: 2
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.listId)
    expect(idFromTodoLists).toBe(action.payload.listId)
})
