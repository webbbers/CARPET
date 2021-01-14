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
            let temp=[]
            
            firestore.collection("Exams").where("authorId", "==", currentUser.id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) =>{
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        temp.push(doc.data())
                    });
                    setExams(temp)
                    setFetching(false)
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    },[currentUser])




    return (
        <div className="myExams">
            {fetching ? <div><Spinner/></div> :
             exams.map(exam => (
                <div key={exam.examName}> {exam.examName}</div>
            ))} 
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(MyExams);
