import React, {useState} from "react";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email : "",
        password: "",
        name: ""
    });
    
    const { email, password, name} = inputs;

    const onChange = (e) => {
        setInputs( {...inputs, [e.target.name] : e.target.value});
    };

    const onSubmitForm = async (e) => {
        // console.log(e);
        
        e.preventDefault();
        try {
            const body = {email,password,name}
            console.log(body);
            
            // console.log(JSON.stringify(body))

            const response = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Registered Successfully!")
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

            


        } catch (error) {
            console.error(error.message);
        }

    }
    return (
        <>
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit={onSubmitForm}>
            <input 
                type="email" 
                name="email" 
                placeholder="email" 
                className="form-control my-3"
                value={email}
                onChange={onChange}
            />
            <input 
                type="password" 
                name="password" 
                placeholder="password" 
                className="form-control my-3" 
                value={password}
                onChange={onChange}
            />
            <input 
                type="text" 
                name = "name" 
                placeholder="name" 
                className="form-control my-3" 
                value={name}
                onChange={onChange}
            />
            <button className="btn btn-success w-100">Submit</button>
            <p className="form-text">Already have an account? Click the link below!</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
        </form>
        </>
    );
};

export default Register;