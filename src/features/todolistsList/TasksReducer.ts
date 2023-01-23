import {
  addTodoListAC,
  deleteListAC,
  setTodoListsAC,
  setTodoListEntityStatus
} from "./TodoListsReducer";
import {tasksAPI, TaskType, updateTaskType} from "../../api/todoList-api";
import {Dispatch} from "redux";
import {rootReducerType, ThunkAppDispatchType} from "../../app/store";
import {changeAppStatus, setAppError} from "../../app/appSlice";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    deleteTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string }>) => {
      const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
      if (index) state[action.payload.todoListId].splice(index, 1)
    },
    addNewTaskAC: (state, action: PayloadAction<{ todoListId: string, task: TaskType }>) => {
      state[action.payload.todoListId].unshift(action.payload.task)
    },
    updateTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string, task: updateTaskType }>) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.task}
      }
    },
    setTasksAC: (state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) => {
      state[action.payload.todoListId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoListAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(deleteListAC, (state, action) => {
      delete state[action.payload.listID]
    })
    builder.addCase(setTodoListsAC, (state, action) => {
      action.payload.todoLists.forEach(todoList => {
        state[todoList.id] = []
      })
    })

  }
})

export const tasksReducer = slice.reducer
export const {addNewTaskAC, setTasksAC, deleteTaskAC, updateTaskAC} = slice.actions

//thunks
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus({status: "loading"}))
  tasksAPI.getTasks(todoListId)
    .then(res => {

      dispatch(setTasksAC({todoListId, tasks: res.data.items}))
      dispatch(changeAppStatus({status: "succeeded"}))
    }).catch(error => {
    dispatch(setAppError(error.message))
    dispatch(changeAppStatus({status: "failed"}))
  })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus({status: "loading"}))
  dispatch(setTodoListEntityStatus({todoListId, status: "loading"}))
  tasksAPI.deleteTask(todoListId, taskId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(deleteTaskAC({todoListId, taskId}))
        dispatch(changeAppStatus({status: "succeeded"}))
        dispatch(setTodoListEntityStatus({todoListId, status: "succeeded"}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch(error => {
    dispatch(setAppError(error.message))
    dispatch(changeAppStatus({status: "failed"}))
  })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: ThunkAppDispatchType) => {
  dispatch(changeAppStatus({status: "loading"}))
  dispatch(setTodoListEntityStatus({todoListId, status: "loading"}))
  tasksAPI.createTask(todoListId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        console.log(res.data)
        dispatch(addNewTaskAC({todoListId, task: res.data.data.item}))
        dispatch(changeAppStatus({status: "succeeded"}))
        dispatch(setTodoListEntityStatus({todoListId, status: "succeeded"}))
      } else {
        handleServerAppError(res.data, dispatch)
      }

    }).catch(error => {
    handleNetworkError(error.message, dispatch)
  })
}

export const updateTaskTC = (todoListId: string, taskId: string, updates: updateTaskType) => (dispatch: Dispatch, getState: () => rootReducerType) => {

  const state = getState()
  const task = state.tasksReducer[todoListId].find(task => task.id === taskId)

  if (!task) {
    console.warn('task not found in the state')
    return
  }

  const model: updateTaskType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...updates
  }

  dispatch(setTodoListEntityStatus({todoListId, status: "loading"}))
  dispatch(changeAppStatus({status: "loading"}))
  tasksAPI.updateTask(todoListId, task.id, model)
    .then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {

        dispatch(updateTaskAC({todoListId, taskId: res.data.data.item.id, task: model}))
        dispatch(changeAppStatus({status: "succeeded"}))
        dispatch(setTodoListEntityStatus({todoListId, status: "succeeded"}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleNetworkError(error.message, dispatch)
    })
}


//types

export type TasksStateType = {
  [id: string]: TaskType[]
}
