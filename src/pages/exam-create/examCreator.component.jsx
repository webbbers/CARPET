import React,{useState} from 'react';

import { firestore } from '../../firebase/firebase.utils';
import './examCreator.styles.scss';
import TfQuestion from '../../components/cquestion/tfQuestion.component';
import McQuestion from '../../components/cquestion/mcQuestion.component';

const ExamCreator= () => {

    const [maxScore,setMaxScore] = useState(0)
    const [examName,setExamName] = useState('')
    const [id,setId] = useState(2)
    const [questions,setQuestions] = useState([
        {
            id:0,
            type:"MultipleChoice",
            points:15,
            imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"What is my name and how am I doing well ?",
            answerOptions : [
                { answerText: 'Talha', isCorrect: true},
                { answerText: 'Tayfur', isCorrect: false},
                { answerText: 'Sarp', isCorrect: false},
                { answerText: 'Kuzey', isCorrect: false},
            ] 
        },
        {
            id:1,
            type:"TrueFalse",
            points:10,
            imageURL: "",
            questionText:"How old am I ?",
            isCorrect:false          
        }
    ])
    
    const deleteHandler = id =>{
        setQuestions(questions.filter(question => question.id !== id))
    }

    const editedHandler = (id,newContent) => {
        setQuestions(questions.map(question => question.id === id ? newContent:question))
    }

    const addmcQuestionHandler = () => {
        setQuestions([...questions,{
            id:id,
            type:  "MultipleChoice",
            imageUrl:'',
            questionText: '',
            answerOptions:[
                { answerText: '', isCorrect: false},
                { answerText: '', isCorrect: false},
                { answerText: '', isCorrect: false},
                { answerText: '', isCorrect: false},
            ] 
        }])
        setId(id+1)
    }
    const addtfQuestionHandler = () => {
        setQuestions([...questions,{
            id:id,
            type:  "TrueFalse",
            points:0,
            imageUrl:"",
            questionText: '',
            isCorrect:true
        }])
        setId(id+1)
    }
    const sendExam = () => {
        
        firestore.collection("Exams").add({
            author:"Sarp",
            points:maxScore,
            examName:examName,
            questions:questions
        })
        // console.log({
        //         author:"Sarp",
        //         points:point,
        //         examName:examName,
        //         questions:questions
        //     })

    }

    return (
        <div className='examCreatorPage'>
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-primary">
                    <span className="heading-primary--sub u-margin-top-big">Create Your Own Exam </span>
                </h2>
            </div>
            <div className="examCreateHeader">
                <input type="text" className="examNameInput" required placeholder="Exam Name" onChange={(e)=>setExamName(e.target.value)}/>
                <input type="text" className="examPointInput" required placeholder="Max Score" onChange={(e)=>setMaxScore(Number(e.target.value))}/>
            </div>
            <div>{examName} &nbsp; &nbsp; {maxScore}</div>
            
            {questions.map(question => (
                <div key={question.id}>
                    {question.type === "MultipleChoice" ?
                    <McQuestion 
                        order={questions.indexOf(question)}
                        key={question.id}
                        question={question}
                        editedHandler={(id,newContent)=>editedHandler(id,newContent)}
                        deleteHandler={(questionText) => deleteHandler(questionText)}
                    />
                    : 
                    <TfQuestion
                        order={questions.indexOf(question)}
                        key={question.id}
                        question={question}
                        editedHandler={(id,newContent)=>editedHandler(id,newContent)}
                        deleteHandler={(questionText) => deleteHandler(questionText)}
                    />
                
                }
               </div>
            ))}
            <div className="addQuestion">
                <div className="addTfQuestion" onClick={() => addmcQuestionHandler()}> + Add MultipleChoice</div> 
                <div className="addMcQuestion" onClick={()=> addtfQuestionHandler()}> + Add True-False</div> 
            </div>
            <div className="examButtons">
                <button className="btn btn-green" > New Exam</button>
                <button className="btn btn-green" onClick={()=>sendExam()}> Save the Exam</button>
            </div>

        </div>
    )
    
}

export default ExamCreator;