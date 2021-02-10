import React,{useState,useEffect} from 'react';
import firebase from '../../firebase/firebase.utils';
import Question from '../question/question.component';

import Spinner from '../UI/Spinner/spinner.component';
import './exam.styles.scss';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector'


const Exam = (props) => {
    
    const [fetching,setFetching] = useState(true)
    const [seconds,setSeconds] = useState(500)
    const [examName,setExamName] = useState('')
    const [authorId,setAuthorId] = useState(0)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [examEnded,setExamEnded] = useState(false)
    const [score,setScore] = useState(0)
    const [maxScore,setMaxScore] = useState(100)
    const [wrongAnswers,setWrongAnswers] = useState([])
    const [questions,setQuestions] = useState([
        // {
        //     type:"MultipleChoice",
        //     points:15,
        //     imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
        //     questionText:"What is my name ?",
        //     answerOptions : [
        //         { answerText: 'Talha', isCorrect: true},
        //         { answerText: 'Tayfur', isCorrect: false},
        //         { answerText: 'Sarp', isCorrect: false},
        //         { answerText: 'Kuzey', isCorrect: false},
        //     ]
            
        // },
        // {
        //     type:"TrueFalse",
        //     points:10,
        //     // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
        //     questionText:"Am I a soldier ?",
        //     isCorrect:false
        // }
    ])
    


    const examId=props.location.pathname.slice(6);
    useEffect(  () =>{
        const fetchExam = async () =>{
            let db =firebase.firestore();
            let example=db.collection("Exams").doc(examId).get()
            let exam= (await example).data()
            console.log(exam)
            let questionsWithShuffledOptions =  shuffleQuestionsOptions(exam.questions)
            let shuffledQuestions =  shuffleExam(questionsWithShuffledOptions)
            setQuestions(shuffledQuestions)
            setMaxScore(exam.points)
            setExamName(exam.examName)
            setAuthorId(exam.authorId)
            setFetching(false)
        }
        fetchExam()
    },[examId])

    useEffect(()=>{
        if(seconds>0){
            let timer =setTimeout(() => setSeconds(seconds-1),1000);
            return () => clearTimeout(timer);
        }
    },[seconds])

    
    
    useEffect(()=>{
        if (examEnded){
            let db =firebase.firestore();
            let entrantId = props.currentUser? props.currentUser.id : 0
            let entrantName = props.currentUser? props.currentUser.displayName: 'Unknown Person'
            db.collection("examResults").add({
                examId:examId,
                authorId:authorId,
                examName:examName,
                score:(score/maxScore)*100,
                entrantId:entrantId,
                entrantName:entrantName,
                wrongAnswers:wrongAnswers
            })
            setSeconds(0)
        }
        //eslint-disable-next-line
    },[examEnded])
    
    const approve = (correct,point,ansText) => {
        console.log("question that is answered = ",currentQuestion)
        if (correct) {
            console.log("score before=",score," point=",point)
            setScore(score+point)

        } else{
            let wrongAnswerData={}
            if(questions[currentQuestion].type === 'MultipleChoice'){
                wrongAnswerData={questionId:questions[currentQuestion].id,selectedOption:ansText}
            } else {
                wrongAnswerData={questionId:questions[currentQuestion].id,selectedOption:false}
            }
            // console.log("wrongLog",wrongAnswerData)
            setWrongAnswers([...wrongAnswers,wrongAnswerData])
        }
        if(currentQuestion+1 === questions.length){
            setExamEnded(true)
            console.log("setExamEnded , score = ",score)
        }
        setCurrentQuestion(currentQuestion+1)
    }
    return (
        <div className='exampage'>
            <header className="examHeader">
            <div>{props.location.pathname.slice(6)}</div>
            <div className="timer">
                <div className="timer_text">Time Left</div>
                <div className="timer_sec">{seconds}</div>
            </div>
            </header>
            <div className="examName"> {examName}</div>
            {fetching ? <Spinner/>
            :
            questions.length > currentQuestion ? 
                <Question question={questions[currentQuestion]} questionNumber={currentQuestion+1} approve = {(correct,point,answerText)=>approve(correct,point,answerText)} key={questions[currentQuestion].id}/>
                
                :
            
                <div className="examResults">
                    <h1>END OF EXAM</h1>
                    <div> You have scored <span className="score">{score}</span> out of {maxScore}</div>
                </div>
            }
            
        </div>
    )
    
}
export const randomize = () => {  
    var arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] * Math.pow(2,-32) - 0.5;
}
export const shuffleExam = (arr) => {
    let temp = [...arr]
    temp.sort( () => randomize());
    return temp
}
export const shuffleSingleQuestionsOptions = (question) =>{
    let correctOptions=question.answerOptions.filter(option =>{
        return option.isCorrect === true
    })
    let falseOptions=question.answerOptions.filter(option =>{
        return option.isCorrect === false
    })
    let tempArr =[correctOptions[0]]
    for(let i=0;i<3;i++){
        tempArr.push(falseOptions[i])
    }
    question.answerOptions = tempArr;
    question.answerOptions.sort( () => randomize());

    let firstTrueIndex =0
    for(let i=0;i<question.answerOptions.length;i++){
        if(question.answerOptions[i].isCorrect === true){
            firstTrueIndex=i;
            break;
        } 
    }
    let temp3 = question.answerOptions.filter(function(item, pos) {
        if(!item)   return false;
        if(item.isCorrect === true){
            return firstTrueIndex === pos;
        }
        return true
    })
    question.answerOptions=temp3;

    return question;
}

export const shuffleQuestionsOptions = (arr) =>{
    let temp = [...arr]
    let result =temp.map(question => {
        if(question.type === "MultipleChoice"){
            return shuffleSingleQuestionsOptions(question)
        } else {
            return question
        }
    })
    return result
}

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})
export default connect(mapStateToProps)(Exam);