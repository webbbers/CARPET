import React,{useEffect} from 'react';
import { Switch,Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignIn from './components/sign-in/sign-in.component';

import Header from './components/header/header.component';


const App = props => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/'  component={HomePage}/>
        <Route path='/signin'  component={SignIn}/>
        {/* <Route exact path='/signin'  render={() => props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/> */}
      </Switch>
    </div>
  );
}

export default App;
