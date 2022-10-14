import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import TodoList from "./components/TodoList"

const App = () => {

    return(
        <div className="app-main">
            <Routes >
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/TodoList" element={<TodoList/>}/>
            </Routes >
        </div>
    );
}

export default App