import React from 'react';


import Question from '../../components/question/question.component';


const ExamCreator= () => {





    return (
        <div className='exampage'>
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-primary">
                    <span className="heading-primary--sub u-margin-top-big">Create Your Own Exam </span>
                </h2>
            </div>
            <Question/>
        </div>
    )
    
}

export default ExamCreator;