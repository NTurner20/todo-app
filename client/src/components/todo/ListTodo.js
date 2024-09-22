import React , {useEffect, useState} from "react";

import EditTodo from "./EditTodo";

const ListTodo = ({allTodos, setTodosChange}) => {

    const [todos, setTodos] = useState([]);


    // Delete Function
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:4001/api/todos/${id}`,
                {
                    method: "DELETE",
                    headers:{token:localStorage.token}
                }
            );
            
            setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.error(error.message);
        }

        // window.location = "/"
    };

    useEffect(() => {
        setTodos(allTodos);
    },[allTodos]);
    // console.log(todos)


    return (
        <>
        <table className="table mt-5">
            <thead>
                <tr>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key = {todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo} setTodosChange = {setTodosChange} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    )
};

export default ListTodo;