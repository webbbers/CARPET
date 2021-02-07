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