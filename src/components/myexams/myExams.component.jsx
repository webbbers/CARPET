import React,{useState,useEffect} from 'react';

import './myExams.styles.scss';

import Spinner from '../UI/Spinner/spinner.component';
import { firestore } from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector'

const MyExams = ({currentUser}) => {

    const [exams,setExams] = useState([])
    const [fetching,setFetching] = useState(true)
   
    useEffect( () =>{
        setFetching(true)
        if(currentUser){
            
            
            firestore.collection("Exams").where("authorId", "==", currentUser.id)
                .onSnapshot( (querySnapshot) => {
                    let temp=[]
                   querySnapshot.forEach( (doc) => {
                        temp.push(doc.data())
                        console.log(doc.data())
                   })
                   console.log("this is temp",temp)
                   setExams(temp)
                   setFetching(false)
                })
        }
    },[currentUser])




    return (
        <div className="myExams">
            {fetching ? <div><Spinner/></div> :
             exams.map(exam => (
               
                <div key={exam.examName}>
                    {exam.examName} 
                    <button>View</button>
                    <button>Results</button>
                </div>
               
            ))} 
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(MyExams);
