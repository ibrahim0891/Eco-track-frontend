import React from "react";

const ForgetPassword = () => {
    return (
        <div>
            <h1>Forgot Password</h1>
            <p>Please enter your email address to reset your password.</p>
            <input type='email' placeholder='Email' />
            <button>Submit</button>
        </div>
    );
};

export default ForgetPassword;
