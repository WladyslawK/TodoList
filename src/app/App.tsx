import React from 'react';
import './App.css';
import {ButtonAppBar} from "../components/buttonAppBar/ButtonAppBar";
import {Container} from "@mui/material";

import {TodolistsList} from "../features/todolistsList/TodolistsList";


export function App() {

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}
