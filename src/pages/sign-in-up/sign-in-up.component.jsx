import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-up.styles.scss' ;


const SignInAndSignUpPage = () => (
    <div className='sign-in-up'>
        <div><SignIn/></div>
        <div><SignUp/></div>
        
    </div>

)

export default SignInAndSignUpPage;