import React from 'react';

import Question from '../question/question.component';

const Exam = () => {

    const prop =
    
    {
		exam_name: "Do you have and idea who I am?"
        questions : ["<Question/>","<Question/>","<Question/>"]
    }

    return (
        <div>
            <div> {prop.exam_name} </div>
            {prop.questions.map( question => ({question}))}
        </div>
    )
}

export default Exam;