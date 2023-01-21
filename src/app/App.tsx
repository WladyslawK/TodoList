import React, {useEffect, useState} from 'react';
import './App.css';
import {ButtonAppBar} from "../components/buttonAppBar/ButtonAppBar";
import {Alert, Container, LinearProgress, Snackbar} from "@mui/material";

import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {rootReducerType, useAppDispatch} from "./store";
import {StatusType} from "./appSlice";
import {ErrorSnackBar} from "../components/errorSnackBar/ErrorSnackBar";
import {AppRoutes} from "../routes/AppRoutes";
import {authMeTC} from "../features/login/authSlice";


export function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

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
