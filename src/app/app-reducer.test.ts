import {appSlice, changeAppStatus, InitialAppType, setAppError} from "./appSlice";

const initialAppState: InitialAppType= {
    status: "idle",
    error: null
}

test("change App status to loading", ()=> {
    //action
    const AppWithChangedStatus = appSlice(initialAppState, changeAppStatus("loading"))

    //expect
    expect(AppWithChangedStatus.status).toBe("loading")
})

test("set App error to (some error)", () => {

    const AppWithError = appSlice(initialAppState, setAppError("some error"))


    //expect
    expect(AppWithError.error).toBe("some error")

})