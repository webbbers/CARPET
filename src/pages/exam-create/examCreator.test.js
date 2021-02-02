import { render, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExamCreator from './examCreator.component';

// SIMULATING USER INTERACTION

test('Exam Name input works correctly', () => {
    const {  getByDisplayValue,getByPlaceholderText } =render(<BrowserRouter><ExamCreator /></BrowserRouter>);
   
    const examNameInput = getByPlaceholderText("Exam Name")

    fireEvent.change(examNameInput, { target: { value:"Math Exam" }})

    getByDisplayValue("Math Exam")
    
});

test('Adds MultipleChoice Question to ExamCreator', () => {
    const { getByText } =render(<BrowserRouter><ExamCreator /></BrowserRouter>);
    const addMcQuestion = getByText("+ Add MultipleChoice")

    fireEvent.click(addMcQuestion)
    getByText("Q3")

});
test('Adds True False Question to ExamCreator', () => {
    const { getByText } =render(<BrowserRouter><ExamCreator /></BrowserRouter>);
    const addTfQuestion = getByText("+ Add True-False")

    fireEvent.click(addTfQuestion)
    getByText("Q3")
});

