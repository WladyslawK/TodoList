import React, {useState} from 'react';
import './App.css';
import {ButtonAppBar} from "../components/buttonAppBar/ButtonAppBar";
import {Alert, Container, LinearProgress, Snackbar} from "@mui/material";

import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {rootReducerType} from "./store";
import {StatusType} from "./app-reducer";
import {ErrorSnackBar} from "../components/errorSnackBar/ErrorSnackBar";
import {AppRoutes} from "../routes/AppRoutes";


export function App() {

    const status = useSelector<rootReducerType, StatusType>(state => state.app.status)

    return (
        <div>
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <AppRoutes/>
            </Container>
            <ErrorSnackBar/>
        </div>
    );
}
