import React from 'react';

const AddChallenges = () => {
    return (
        <div>
            <h1>Add Challenge</h1>
            <p>Please fill in the details to add a new challenge.</p>
            <input type="text" placeholder="Challenge Title" />
            <textarea placeholder="Challenge Description"></textarea>
            <button>Submit</button>
        </div>
    );
};

export default AddChallenges;
