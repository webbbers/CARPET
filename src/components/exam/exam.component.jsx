import React,{useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';
import Question from '../question/question.component';
import TQuestion from '../question/tQuestion.component';
import './exam.styles.scss'


const Exam = (props) => {
    
    const [fetching,setFetching] = useState(true)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [score,setScore] = useState(0)
    // const [showScore,setShowScore] = useState(false)
    const maxScore=25
    const [questions,setQuestions] = useState([
        {
            type:"MultipleChoice",
            points:15,
            imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"What is my name ?",
            answerOptions : [
                { answerText: 'Talha', isCorrect: true},
                { answerText: 'Tayfur', isCorrect: false},
                { answerText: 'Sarp', isCorrect: false},
                { answerText: 'Kuzey', isCorrect: false},
            ]
            
        },
        {
            type:"TrueFalse",
            points:10,
            // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"Am I a soldier ?",
            isCorrect:false
        }
    ])
    
    useEffect( async () =>{
        let db =firebase.firestore();
        let example=db.collection("Exams").doc(props.location.pathname.slice(6)).get()
        let exam= (await example).data()
        console.log(exam)
        setQuestions(exam.questions)
        setFetching(false)
    },[])

    const approve = (correct,point) => {
        setCurrentQuestion(currentQuestion+1)
        if (correct) {
            setScore(score+point)
        }
    }
    return (
        <div className='exampage'>
            
            <div>{props.location.pathname.slice(6)}</div>
            <div> SOFTWARE ENGINEERING EXAM</div>
            {/* {fetching?<div>YUKLENIYOR</div>:null} */}
            {questions.length > currentQuestion ? 
                
                questions[currentQuestion].type =="MultipleChoice"?
                    <Question question={questions[currentQuestion]} questionNumber={currentQuestion+1} approve = {(correct,point)=>approve(correct,point)} />
                :
                    <TQuestion question={questions[currentQuestion]} questionNumber={currentQuestion+1} approve = {(correct,point)=>approve(correct,point)} />
                : 
            
                <div className="examResults">
                    <h1>END OF EXAM</h1>
                    <div> You have scored {score} out of {maxScore}</div>
                </div>
            }
        </div>
    )
    
}

export default Exam;