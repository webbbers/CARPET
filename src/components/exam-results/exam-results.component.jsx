import React,{useState,useEffect} from 'react';

import './exam-results.styles.scss';

import Spinner from '../UI/Spinner/spinner.component';
import { firestore } from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector'

const ExamResults = (props) => {

    const [results,setResults] = useState([])
    const [fetching,setFetching] = useState(true)
   
    const examId=props.location.pathname.slice(12); 

	const compare_exams = (exam_f,exam_s) =>
	{
		var matching=0;
		for (var i=0; i < exam_f.wrongAnswers.length; i++)
			for (var v=0; v < exam_s.wrongAnswers.length; v++)
				if (exam_f.wrongAnswers[i].questionId === exam_s.wrongAnswers[v].questionId
				 && exam_f.wrongAnswers[i].selectedOption === exam_s.wrongAnswers[v].selectedOption) matching++;

		var percentage = (matching / Math.min(exam_f.wrongAnswers.length, exam_s.wrongAnswers.length)) *100
		console.log(percentage);
		if (percentage > 49 && matching > 2) return percentage;
		else return 0;
	}

	const check_similarity = () =>
	{
		if (results.length < 2) return "";
		var cheaters="";
		for (var i=0; i < results.length; i++)
			for (var v=i+1; v < results.length; v++)
				if (compare_exams(results[i],results[v]))
					cheaters += results[i].entrantName + ", " + results[v].entrantName + " percentage: " + compare_exams(results[i],results[v]) + "% \n";

		return cheaters;
	}

    useEffect( () =>{
        if(props.currentUser){
            setFetching(true)
            console.log("here")
            firestore.collection("examResults").where("authorId", "==", props.currentUser.id)
                .onSnapshot( (querySnapshot) => {
                    let temp=[]
                    querySnapshot.forEach( (doc) => {
                        if(doc.data().examId === examId){
                            temp.push(doc.data())
                            console.log(doc.data())
                        }
                    })
                    console.log("this is temp",temp)
                    setResults(temp)
                    setFetching(false)
            })
        }
    },[props.currentUser,examId])

    return (
        <div className="examResultsPage">
            <div className='row'>
			<button onClick = {() => document.getElementById("cheater field").innerHTML = check_similarity()}> fetch cheaters </button>
			<h1 id="cheater field">  </h1>
           {fetching ? <div><Spinner/></div> :
             results.map(result => (
               
                <div key={results.indexOf(result)} className='examResult col-1-of-3'>
                    <div className="entrantName">{result.entrantName} </div>
                    <div className="entrantScore">{result.score}</div>
                </div>
               
            ))} 
            {results.length ? null :
                <div className='noResultInfo'> NO AVAILABLE RESULT FOR THIS EXAM</div>
            }
            </div>
        </div>
    )

}

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(ExamResults);