import React from 'react';

import './question.styles.scss'

const Question = () => {

    const prop =
    
    {
        type:"MultipleChoice",
		imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
        question:"What is my name",
        options:["Talha","Tayfur","Ahmet","Mehmet"],
        correctAnswer:"Talha"
    }

    return (
        <div className="question">
			<img id="qphoto" className="img" src={prop.imageURL}/>
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