import React,{useState} from 'react';

import './question.styles.scss'

const Question = props => {

    const { question,questionNumber,approve } = props;
    const [correct,setCorrect] = useState(0)  // 1 for false 2 for true
    
    const optionClickedHandler = status => {
        if (status) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
    }
    // example Question : 
        // type:"MultipleChoice",
        // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
        // questionText:"What is my name ?",
        // answerOptions : [
        //     { answerText: 'Talha', isCorrect: true},
        //     { answerText: 'Tayfur', isCorrect: false},
        //     { answerText: 'Sarp', isCorrect: false},
        //     { answerText: 'Kuzey', isCorrect: false},
        // ]
        
    return (
        <div className="question">
            <div className="questionInfo">
                <div className="pointInfo"> Question {questionNumber} </div>
                <div className="numberInfo">{question.points} Points</div>
            </div>
			{question.imageURL ? <div><img id="qphoto" alt="questImage" className="img" src={question.imageURL}/></div> : null}
            <div className="questionText"> {question.questionText} </div>
            <div className="answers">
                <form>
                    {question.answerOptions.map( answerOption => (
                        <div className="answersOptionlist" key={answerOption.answerText}>
                            <input className="Input" type="radio" name="radAnswer" onClick={()=>optionClickedHandler(answerOption.isCorrect)}/>
                            <label className="answerOption">{answerOption.answerText}</label>
                        </div>
                    ))}
                </form>
            </div>
	
           <div className="approve"> <button className="btn btn--green" onClick={()=>approve(correct,question.points)}> APPROVE </button></div>
        </div>
    )
}


export default Question;