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
			<form>
            {prop.options.map( option => (
			<label>
					 <input type="radio" name={prop.question} className="option" value="{option}"/>
					 {option}
					 <br/>
					 </label>
				))
			}
			</form>
        </div>
    )
}

export default Question;