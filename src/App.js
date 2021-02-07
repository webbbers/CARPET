import React,{useEffect} from 'react';
import { Switch,Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
// import './App.css';

import { createStructuredSelector } from 'reselect';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee, faMapMarkerAlt, faEnvelope, faPhone, faPrint,faStore, faHeadset, faBars } from '@fortawesome/free-solid-svg-icons'

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign/signPage.component';
import ExamCreator from './pages/exam-create/examCreator.component';
import Exam from './components/exam/exam.component';
import ExamResult from './components/exam-results/exam-results.component';
import MyExams from './components/myexams/myExams.component';
import Header from './components/header/header.component';

import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser as setCurrentUserRedux } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';


const App = props => {

  var unsubscribeFromAuth=null;
  
  useEffect(()=> {
    const {setCurrentUser} = props;
    // eslint-disable-next-line
    unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( snapShot => {
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }

    })

    return  () => {
      unsubscribeFromAuth();
    }
  },[])

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/'  component={HomePage}/>
        <Route exact path='/signin'  render={() => props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
        <Route exact path ='/examcreator' component={ExamCreator}/>
        <Route exact path ='/myExams' component={MyExams}/>
        <Route path ='/exam/' component={Exam}/>
        <Route path ='/examresult/' component={ExamResult}/>
      </Switch>
    </div>
  );
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUserRedux(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
