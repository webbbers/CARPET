
import { render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import HomePage from './homepage.component';

test('Checks some text in HomePage', () => {
    const { getByText, getByLabelText } =render(<BrowserRouter><HomePage /></BrowserRouter>);
   
    getByText("Carpet")
    getByText("Make Your Exam in Less Than 5 Minutes")
  });
