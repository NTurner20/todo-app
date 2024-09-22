import React from "react";
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="container py-5 bg-light mt-5 rounded">
            <h1>Welcome to Todoy!</h1>
            <p>Sign in or Register to start building your todo list!</p>
            <Link to='/login' className='btn btn-primary'>Login</Link>
            <Link to='/register' className='btn btn-primary ms-3'>Register</Link>
        </div>
    );
};

export default LandingPage;