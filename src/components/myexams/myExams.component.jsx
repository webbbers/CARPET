import React,{useState,useEffect} from 'react';

import './myExams.styles.scss';

import Spinner from '../UI/Spinner/spinner.component';
import { firestore } from '../../firebase/firebase.utils';
import {Link} from 'react-router-dom';

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
                       let temporary = doc.data()
                       temporary['id']=doc.id
                       temp.push(temporary)
                    //    console.log("this is temporary",temporary)
                        
                   })
                //    console.log("this is exams",temp)
                   setExams(temp)
                   setFetching(false)
                })
        }
    },[currentUser])




    return (
        <div className="myExams row">
            {fetching ? <div><Spinner/></div> :
             exams.map(exam => (
               
                <div key={exam.examName} className='myExam col-1-of-3'>
                    <div className="examResultLink"><Link className="resultLink" to={`/examresult/${exam.id}`}>{exam.examName}</Link></div>
                </div>
               
            ))} 
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(MyExams);
