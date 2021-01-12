import React,{useState} from 'react';

import './question.styles.scss'

const TQuestion = props => {

    const { question,questionNumber,approve } = props;
    const [correct,setCorrect] = useState(false)  
    
    const optionClickedHandler = status => {
        if (status === question.isCorrect) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
    }
    // example Question : 
        // type:"MultipleChoice",
        // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
        // questionText:"What is my name ?",
        // isCorrect:false
        // ]
        
    return (
        <div className="question">
            <div className="questionInfo">
                <div className="pointInfo"> {question.points} Points </div>
                <div className="numberInfo">Question {questionNumber}</div>
            </div>
			{question.imageURL ? <div><img id="qphoto" alt="questImage" className="img" src={question.imageURL}/></div> : null}
            <div className="questionText"> {question.questionText} </div>
            <div className="answers">
                <form>
                    <div>
                        <input type="radio" name="radAnswer" onClick={()=>optionClickedHandler(true)}/>
                        <label className="answerOption">True</label>
                        <input type="radio" name="radAnswer" onClick={()=>optionClickedHandler(false)}/>
                        <label className="answerOption">False</label>
                    </div>
                </form>
            </div>
	
           <div className="approve"> <button className="btn btn--green" onClick={()=>approve(correct,question.points)}> APPROVE </button></div>
        </div>
    )
}


export default TQuestion;