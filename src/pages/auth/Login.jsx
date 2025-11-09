import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <p>Please enter your credentials to log in.</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Submit</button>
        </div>
    );
};

export default Login;