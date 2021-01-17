import React,{useState} from 'react';

import './tfQuestion.styles.scss';

const TfQuestion = props => {

    const {question} = props

    // const [editing,setEditing] = useState(false);
    const [point,setPoint] = useState(0)
    const [text,setText] = useState('')
    const [correctness,setCorrectness] = useState(false)

    // {
    //     id:19,
    //     type:"MultipleChoice",
    //     points:15,
    //     imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
    //     questionText:"What is my name and how am I doing well ?",
    //     answerOptions : [
    //         { answerText: 'Talha', isCorrect: true},
    //         { answerText: 'Tayfur', isCorrect: false},
    //     ]
        
    // },
    const saveHandler = () => {
        props.editedHandler(question.id,
            {
                id:question.id,
                type:"TrueFalse",
                points:point,
                questionText:text,
                isCorrect:correctness
            });
    }
    return (
        <div className="tfQuestion">
            <div className="questionOrder">Q{props.order+1}</div>
            <div className="questionText">
                <input type="text"className="tfQuestionInput"  name="name" placeholder="Question" onChange={(e)=>setText(e.target.value)}/>{text}
                <input type="text" className="tfPointInput"name="name" placeholder="0" onChange={(e)=>setPoint(Number(e.target.value))}/>{point}
                <div className="tfCorrectness">correct &nbsp;<input type="checkbox" onChange={()=>setCorrectness(!correctness)}/></div>
            </div>
            
            
           
            <div>{correctness?"true":"false"}</div>
            
            <div className='buttons'>
                <button onClick={() =>props.deleteHandler(question.id)}>Delete</button>
                <button onClick={()=>saveHandler()}> SAVE </button>
            </div>
        </div>
    )
}

export default TfQuestion;