import React,{useState} from 'react';

import './examCreator.styles.scss';
import TfQuestion from '../../components/cquestion/tfQuestion.component';
import McQuestion from '../../components/cquestion/mcQuestion.component';

const ExamCreator= () => {

    const [examName,setExamName]=useState('')
    const [id,setId] = useState(1)
    const [questions,setQuestions]= useState([
        {
            id:19,
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
            id:20,
            type:"MultipleChoice",
            points:10,
            // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"How old am I ?",
            answerOptions : [
                { answerText: '18', isCorrect: false},
                { answerText: '28', isCorrect: false},
                { answerText: '22', isCorrect: true},
                { answerText: '29', isCorrect: false},
            ]
            
        }
    ])
    
    const deleteHandler = questionText =>{
        setQuestions(questions.filter(question => question.questionText !== questionText))
    }

    const editedHandler = (id,newContent) => {
        setQuestions(questions.map(question => question.questionText == id ? newContent:question))
    }

    const addmcQuestionHandler = () => {
        setQuestions([...questions,{
            id:id,
            type:  "MultipleChoice",
            questionText: '',
            answerOptions:[
                { answerText: '18', isCorrect: false},
                { answerText: '28', isCorrect: false},
                { answerText: '22', isCorrect: false},
                { answerText: '29', isCorrect: false},
            ] 
        }])
        setId(id+1)
    }
    const addtfQuestionHandler = () => {
        setQuestions([...questions,{
            id:id,
            type:  "TrueFalse",
            questionText: '',
            answerOptions:[
                { answerText: '18', isCorrect: false},
                { answerText: '28', isCorrect: false}
            ] 
        }])
        setId(id+1)
    }

    return (
        <div className='exampage'>
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-primary">
                    <span className="heading-primary--sub u-margin-top-big">Create Your Own Exam </span>
                </h2>
            </div>
            <div><input type="text" placeholder="Exam Name"/></div>
            {questions.map(question => (
                <div>
                    {question.type == "MultipleChoice" ?
                    <McQuestion 
                        question={question}
                        editedHandler={(id,newContent)=>editedHandler(id,newContent)}
                        deleteHandler={(questionText) => deleteHandler(questionText)}
                    />
                    : 
                    <TfQuestion
                        question={question}
                        editedHandler={(id,newContent)=>editedHandler(id,newContent)}
                        deleteHandler={(questionText) => deleteHandler(questionText)}
                    />
                
                }
               </div>
            ))}

            <div className="addQuestion" onClick={() => addmcQuestionHandler()}> + Add MultipleChoice</div> 
            <div className="addQuestion" onClick={()=> addtfQuestionHandler()}> + Add True-False</div> 
            <div className="examButtons">
                <button className="btn btn-green" > New Exam</button>
                <button className="btn btn-green"> Save the Exam</button>
            </div>
        </div>
    )
    
}

export default ExamCreator;