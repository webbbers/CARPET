import React,{useState}  from 'react';

import './mcQuestion.styles.scss';

const McQuestion = props => {

    const {question} = props
    const [editing,setEditing] = useState(false);
    const [point,setPoint] = useState(0)
    const [text,setText] = useState('')
    const [options,setOptions] = useState([
        {answerText:"",isCorrect:false},
        {answerText:"",isCorrect:false},
        {answerText:"",isCorrect:false},
        {answerText:"",isCorrect:false}
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
    //         { answerText: 'Sarp', isCorrect: false},
    //         { answerText: 'Kuzey', isCorrect: false},
    //     ]
        
    // },
    const saveHandler = () => {
        props.editedHandler(question.id,
            {
                id:question.id,
                type:"MultipleChoice",
                points:15,
                questionText:text,
                answerOptions:options
            });
    }
    return (
        <div className="mcQuestion">
            <div>{question.type}</div>
            <div className="questionText">
                <input type="text" name="name" placeholder={question.text} onChange={(e)=>setText(e.target.value)}/>{text}
                <input type="text" name="name" placeholder="0" onChange={(e)=>setPoint(Number(e.target.value))}/>{point}
            </div>
            <div className="options">
                <div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 1"  onChange={(e)=>setOptions([{answerText:e.target.value,isCorrect:options[0].isCorrect},...options.slice(1)])}/></div>
                        <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setOptions([{answerText:options[0].answerText,isCorrect:!options[0].isCorrect},...options.slice(1)])}/></div>
                    </div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 2" onChange={(e)=>setOptions([...options.slice(0,1),{answerText:e.target.value,isCorrect:options[1].isCorrect},...options.slice(2)])}/></div>
                        <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setOptions([...options.slice(0,1),{answerText:options[1].answerText,isCorrect:!options[1].isCorrect},...options.slice(2)])}/></div>
                    </div>
                </div>
                <div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 3" onChange={(e)=>setOptions([...options.slice(0,2),{answerText:e.target.value,isCorrect:options[2].isCorrect},...options.slice(3)])}/></div>
                        <div className="correctness">correct &nbsp;<input type="checkbox" onChange={()=>setOptions([...options.slice(0,2),{answerText:options[2].answerText,isCorrect:!options[2].isCorrect},...options.slice(3)])}/></div>
                    </div>
                    <div className="option">
                        <div><input type="text" placeholder="Option 4" onChange={(e)=>setOptions([...options.slice(0,3),{answerText:e.target.value,isCorrect:options[3].isCorrect}])}/></div>
                        <div className="correctness"> correct &nbsp;<input type="checkbox" onChange={()=>setOptions([...options.slice(0,3),{answerText:options[3].answerText,isCorrect:!options[3].isCorrect}])}/></div>
                    </div>
                </div>
            </div>
            <div>{options[0].answerText} {options[0].isCorrect?"true":"not"}</div>
            <div>{options[1].answerText} {options[1].isCorrect?"true":"not"}</div>
            <div>{options[2].answerText} {options[2].isCorrect?"true":"not"}</div>
            <div>{options[3].answerText} {options[3].isCorrect?"true":"not"}</div>
            
            <div className='buttons'>
                {/* <button onClick={()=>setEditing(!editing)}>{editing? 'Cancel' : 'Edit'}</button> */}
                {editing ? null :<button onClick={() =>props.deleteHandler(question.questionText)}>Delete</button>}
                <button onClick={()=>saveHandler()}> SAVE </button>
                {/* {editing ?<button onClick={()=>saveHandler()}>Save</button> : null} */}
            </div>
        </div>
    )
}

export default McQuestion;