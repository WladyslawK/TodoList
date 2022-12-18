import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PATH} from "../constants/constants";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {Login} from "../features/login/Login";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.TODOLISTS} element={<TodolistsList/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.ROOT} element={<TodolistsList/>}/>
        </Routes>
    );
}