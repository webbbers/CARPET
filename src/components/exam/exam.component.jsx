import React from 'react';
import Question from '../question/question.component';





const Exam = () => {

    const questions = [
        {
            type:"MultipleChoice",
            imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            question:"What is my name",
            options:["Talha","Tayfur","Ahmet","Mehmet"],
            correctAnswer:"Talha"
        },
        {
            type:"MultipleChoice",
            // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            question:"What is my name",
            options:["Talha","Tayfur","Ahmet","Mehmet"],
            correctAnswer:"Talhaa"
        }
    ]


    return (
        <div className='exampage'>
            {questions.map( (question,index) => (
                <Question question={question} index={index+1}/>
            ))}
        </div>
    )
    
}

export default Exam;