import {React, useState} from "react";

const TodoList = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [indexEditing, setIndexEditing] = useState(null);
    const [state, setState] = useState({
        todo: '',
        todoList: [],
    })

    const todoInputChange = (e) => {
        const { name, value } = e.target
        setState({...state, [name]: value})
    }

    const createTodo = () => {
        let list = state.todoList
        list.push(state.todo);
        setState({...state, 
            todoList: list, 
            todo: ''
        })
    }

    const UpdateTodo = () => {
        let list = state.todoList
        list[indexEditing] = state.todo
        setState({...state, todoList: list, todo: ''})
        setIsEditing(false)
    }

    const editTodo = (value, index) => {
        setIsEditing(true)
        setIndexEditing(index);
        setState({...state, todo: value});
    }

    const cancelEditing = () => {
        setIsEditing(false);
        setState({...state, todo: ''})
    }

    const deleteTodo = (index) => {
        let list = state.todoList
        list.splice(index, 1);
        setState({...state, todoList: list})
    }



    return(
        <div className="todolist-main">
            <div className="input-actions-holder">
                <input className="todoInput" name="todo" placeholder="Create Todo" onChange={e => todoInputChange(e)} value={state.todo}/>
                {
                    isEditing ?
                    <div>
                        <button onClick={() => UpdateTodo()}>Update</button>
                        <button onClick={() => cancelEditing()}>Cancel</button>
                    </div>
                    :
                    <button onClick={() => createTodo()}>Create</button>
                }
            </div>
            <div className="todoList-container">
                {state.todoList.map((value, index) => {
                return(
                    <div key={index} className="todo-item-container">
                        <span>{value}</span>
                        <div>
                            <button onClick={() => editTodo(value, index)}>Edit</button>
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                        </div>
                    </div>
                ) 
                })}
            </div>
        </div>
    );
}

export default TodoList