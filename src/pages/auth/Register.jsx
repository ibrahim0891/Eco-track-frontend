import React from 'react';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <p>Please fill in the details to create an account.</p>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Submit</button>
        </div>
    );
};

export default Register;