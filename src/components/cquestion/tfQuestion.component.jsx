import React,{useState} from 'react';

import './tfQuestion.styles.scss';

const TfQuestion = props => {

    const {question} = props

    const [editing,setEditing] = useState(false);
    const [text,setText] = useState('')
    const [options,setOptions] = useState([
        {answerText:"",isCorrect:false},
        {answerText:"",isCorrect:false},
    ])

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
        props.editedHandler(props.id,
            {
                id:props.id,
                type:"TrueFalse",
                points:15,
                questionText:text,
                answerOptions:options
            });
    }
    return (
        <div className="mcQuestion">
            <div>{question.type}</div>
            <div className="questionText">
                <input type="text" name="name" placeholder="Question" onChange={(e)=>setText(e.target.value)}/>{text}
            </div>
            <div className="options">
                <div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 1"  onChange={(e)=>setOptions([{answerText:e.target.value,isCorrect:options[0].isCorrect},...options.slice(1)])}/></div>
                        <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setOptions([{answerText:options[0].answerText,isCorrect:!options[0].isCorrect},...options.slice(1)])}/></div>
                    </div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 2" onChange={(e)=>setOptions([...options.slice(0,1),{answerText:e.target.value,isCorrect:options[1].isCorrect}])}/></div>
                        <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setOptions([...options.slice(0,1),{answerText:options[1].answerText,isCorrect:!options[1].isCorrect}])}/></div>
                    </div>
                </div>
            </div>
            <div>{options[0].answerText} {options[0].isCorrect?"true":"not"}</div>
            <div>{options[1].answerText} {options[1].isCorrect?"true":"not"}</div>
            
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