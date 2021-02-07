import { render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './sign-up.component';

test('Sign Up renders correctly', () => {
    const {  getByText} =render(<BrowserRouter> <SignUp /></BrowserRouter>);
    getByText('I do not have a account')
    getByText('Sign up with your email and password')
   
});


