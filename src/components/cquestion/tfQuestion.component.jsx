import React,{useState} from 'react';

import './tfQuestion.styles.scss';

const TfQuestion = props => {

    const {question} = props

    // const [editing,setEditing] = useState(false);
    const [point,setPoint] = useState(0)
    const [text,setText] = useState('')
    const [image,setImage] = useState(false)
    const [imageURL,setImageURL] = useState('')
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
                imageURL: image?imageURL:null,
                points:point,
                questionText:text,
                isCorrect:correctness
            });
    }
    const updateState = (txt) => {

        setText(txt)
        saveHandler()

    }
    return (
        <div className="tfQuestion">
            <div className="questionOrder">Q{props.order+1}</div>
            <div className="questionText">
                <input type="text"className="tfQuestionInput"  name="name" placeholder="Question" onChange={(e)=>updateState(e.target.value)}/>
                <input type="text" className="tfPointInput"name="name" placeholder="0" onChange={(e)=>setPoint(Number(e.target.value))}/>
                <div className="tfCorrectness">correct &nbsp;<input type="checkbox" onChange={()=>setCorrectness(!correctness)}/></div>
            </div>
            
            
            {image ? 
            <div className="questionText"><input type="text" className="tfQuestionInput"  placeholder="Image URL" onChange={(e)=>setImageURL(e.target.value)}/></div>
                :
              null
            }
            {/* <div>{correctness?"true":"false"}</div> */}
            
            
            
            <div className='questionButtons'>
                <button className="questionAdd" onClick={()=>setImage(!image)}> Add Image </button>
                <button className="questionAdd" onClick={()=>saveHandler()}> Save</button>
                <button className="questionDelete" onClick={() =>props.deleteHandler(question.id)}>Delete</button>
            </div>
        </div>
    )
}

export default TfQuestion;