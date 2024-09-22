import React, {useState} from "react";



const EditTodo = ({todo, setTodosChange }) => {

    // Edit Description Function
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            await fetch(`http://localhost:4001/api/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json",token:localStorage.token},
                body: JSON.stringify(body)
            });

            // window.location = "/"
            setTodosChange(true);
        } catch (error) {
            console.error(error.message);
        }
    };

    const [description, setDescription] = useState(todo.description)
    return (
        <>
        {/* <!-- Button trigger modal --> */}
            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick = {() => setDescription(todo.description)}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close" 
                        onClick = {() => setDescription(todo.description)}>

                    </button>
                </div>
                <div className="modal-body">
                    <input 
                        type="Text" 
                        className="form-control" 
                        value = {description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal"
                        onClick={() => setDescription(todo.description)}>
                            Close
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={e => updateDescription(e)}>
                            Save changes
                    </button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
};

export default EditTodo;