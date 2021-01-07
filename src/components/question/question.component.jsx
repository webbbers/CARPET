import React from 'react';

import './question.styles.scss'

const Question = props => {

    const { question,index } = props;

    // const question =
    
    // {
    //     type:"MultipleChoice",
	// 	imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
    //     question:"What is my name",
    //     options:["Talha","Tayfur","Ahmet","Mehmet"],
    //     correctAnswer:"Talha"
    // }

    return (
        <div className="question">
            <div className="questionInfo">
                <div className="pointInfo"> 5 Points </div>
                <div className="numberInfo">Question {index}</div>
            </div>
			{question.imageURL ? <div><img id="qphoto" alt="questImage" className="img" src={question.imageURL}/></div> : null}
            <div className="quest"> {question.question} &nbsp;?</div>
			<form>
                {question.options.map( option => (
                    
                    <label className="optionContainer">
                        <span className="option"></span>{option}
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    
                    
                    ))
                }
			</form>
        </div>
    )
}




// <label>
                    //     <input type="radio" name={question.question} className="option" value="{option}"/>
                    //     &emsp;{option}
                    //     <br/>
                    // </label>
export default Question;