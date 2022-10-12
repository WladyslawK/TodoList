import {ListType} from "../../App";
import {FilterType} from "../TodoList";

const DELETE_LIST = "DELETE-LIST"
const CHANGE_FILTER = "CHANGE-FILTER"
const CHANGE_LIST_TITLE = "CHANGE-LIST-TITLE"

export const ListsReducers = (state: Array<ListType>, action: ActionsTpe) => {
    switch (action.type) {
        case DELETE_LIST:
            return state.filter(list => list.id !== action.payload.listID)
        case CHANGE_FILTER:
            return state.map(list => list.id === action.payload.listID ? {...list, filter: action.payload.filterValue} : list)
        case CHANGE_LIST_TITLE:
            return state.map(list => list.id === action.payload.listID ? {...list, title: action.payload.newTitle} : list)


        default:
            return state
    }
}

type ActionsTpe = deleteListACType | changeFilterACType | changeListTitleACType

type deleteListACType = ReturnType<typeof deleteListAC>
export const deleteListAC = (listID: string) => {
    return {
        type: DELETE_LIST,
        payload: {
            listID
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listID: string, filterValue: FilterType) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            listID,
            filterValue
        }
    } as const
}

type changeListTitleACType = ReturnType<typeof changeListTitleAC>
export const changeListTitleAC = (listID: string, newTitle: string) => {
    return {
        type: CHANGE_LIST_TITLE,
        payload: {
            listID,
            newTitle
        }
    } as const
}






