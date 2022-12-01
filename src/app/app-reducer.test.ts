import {appReducer, changeAppStatus, InitialAppType, setAppError} from "./app-reducer";

const initialAppState: InitialAppType= {
    status: "idle",
    error: null
}

test("change App status to loading", ()=> {
    //action
    const AppWithChangedStatus = appReducer(initialAppState, changeAppStatus("loading"))

    //expect
    expect(AppWithChangedStatus.status).toBe("loading")
})

test("set App error to (some error)", () => {

    const AppWithError = appReducer(initialAppState, setAppError("some error"))


    //expect
    expect(AppWithError.error).toBe("some error")

})