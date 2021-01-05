import React from 'react';

import './question.styles.scss'

const Question = () => {

    const prop =
    
    {
        type:"MultipleChoice",
        question:"What is my name",
        options:["Talha","Tayfur","Ahmet","Mehmet"],
        correctAnswer:"Talha"
    }

    return (
        <div className="question">
            <div className="quest"> {prop.question} &nbsp;?</div>
            {prop.options.map( option => (
                 <li className="option">{option}</li>
            ))}
        </div>
    )
}

export default Question;