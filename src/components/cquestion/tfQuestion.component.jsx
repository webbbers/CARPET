import React,{useState} from 'react';

import './tfQuestion.styles.scss';

const TfQuestion = props => {

    const {question} = props

    const [editing,setEditing] = useState(false);
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
                points:15,
                questionText:text,
                isCorrect:correctness
            });
    }
    return (
        <div className="mcQuestion">
            <div>{question.type}</div>
            <div className="questionText">
                <input type="text" name="name" placeholder="Question" onChange={(e)=>setText(e.target.value)}/>{text}
            </div>
            
            <div>
                <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setCorrectness(!correctness)}/></div>
            </div>
           
            <div>{correctness?"true":"false"}</div>
            
            <div className='buttons'>
                {/* <button onClick={()=>setEditing(!editing)}>{editing? 'Cancel' : 'Edit'}</button> */}
                {editing ? null :<button onClick={() =>props.deleteHandler(question.questionText)}>Delete</button>}
                <button onClick={()=>saveHandler()}> SAVE </button>
                {/* {editing ?<button onClick={()=>saveHandler()}>Save</button> : null} */}
            </div>
        </div>
    )
}

export default TfQuestion;