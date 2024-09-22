import React , {useState, useEffect} from "react";
import { toast } from "react-toastify";
import InputTodo from "./todo/InputTodo";
import ListTodo from "./todo/ListTodo";


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    async function getName() {
        
        try {
            
            const response = await fetch("http://localhost:4001/api/todos",{
                method: "GET",
                headers:{token: localStorage.token}
            });

            const parseRes = await response.json();
            setAllTodos(parseRes.todos);
            
            setName(parseRes.userName);
            
        } catch (error) {
            console.error(error.message);
            
        }
    }

    useEffect(() => {
        getName();
        setTodosChange(false);
    },[todosChange])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info('Logged out successfully!')
    }

    return (
        <>
        <div>
        <div className="d-flex mt-5 justify-content-around">
            <h2>Hello {name}</h2>
            <button 
                onClick={(e) =>{
                    logout(e)
                }} 
                className="btn btn-primary"
            >
                Logout
            </button>
        </div>
            <InputTodo setTodosChange={setTodosChange}/>
            <ListTodo allTodos={allTodos} setTodosChange = {setTodosChange}/>
        </div>
        
        </>
    );
};

export default Dashboard;