import React,{useEffect} from 'react';
import { Switch,Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';

import SignInAndSignUpPage from './pages/sign-in-up/sign-in-up.component';

import Header from './components/header/header.component';

import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


const App = props => {
  const {setCurrentUser} = props;

  var unsubscribeFromAuth=null;
  
  useEffect(()=> {
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
      </Switch>
    </div>
  );
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
