import React,{useState} from 'react';

import './question.styles.scss'

const Question = props => {

    const { question,questionNumber,approve } = props;
    const [correct,setCorrect] = useState(false)  
    const [answerText,setAnswerText] = useState('')
    const optionClickedHandler = (status,text='') => {
        if (status) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
        setAnswerText(text)
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
            {question.type === "MultipleChoice" ?
                <form>
                    {question.answerOptions.map( answerOption => (
                        <div className="answersOptionlist" key={answerOption.answerText}>
                            <input className="Input" type="radio" name="radAnswer" onClick={()=>optionClickedHandler(answerOption.isCorrect,answerOption.answerText)}/>
                            <label className="answerOption">{answerOption.answerText}</label>
                        </div>
                    ))}
                </form>
                :
                <form>
                    <div>
                        <input className="tQuestionOption" type="radio" name="radAnswer" onClick={()=>optionClickedHandler(true)}/>
                        <label className="answerOption">True</label>
                        <input className="tQuestionOption" type="radio" name="radAnswer" onClick={()=>optionClickedHandler(false)}/>
                        <label className="answerOption">False</label>
                    </div>
                </form>
            }
            </div>
            
            
	
           <div className="approve"> <button className="btn  approveButton" onClick={()=>approve(correct,question.points,answerText)}> APPROVE </button></div>
        </div>
    )
}


export default Question;