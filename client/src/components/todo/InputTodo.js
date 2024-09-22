import React, {useState} from "react";

const InputTodo = ({setTodosChange}) => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {description};
            // console.log(body);
            
            await fetch("http://localhost:4001/api/todos",
               { 
                    method: "POST",
                    headers: {"Content-Type": "application/json",token: localStorage.token},
                    body: JSON.stringify(body)
                }
            );
            // console.log(response);
            
            setTodosChange(true);
            setDescription("");
            // window.location = ("/")
            
        } catch (error) {
            console.error(error.message)
        }
    }
    return <>
    <h1 className="text-center my-5">Input Todo</h1>
    <form className="d-flex" onSubmit= {onSubmitForm}>
        <input 
            type="text" 
            className="form-control" 
            value = {description} 
            onChange = {e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
    </form>
    </>
};

export default InputTodo;