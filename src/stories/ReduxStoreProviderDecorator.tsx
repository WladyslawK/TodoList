import React from 'react';
import {Provider} from "react-redux";
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {store} from "../app/store";


export default {
    title: "TodoList/ReduxStoreProviderDecorator",
    component: AddItemForm
}

export const ReduxStoreProviderDecorator = (story: any) => {
    return (
        <Provider store={store}>
            {story()}
        </Provider>
    );
};