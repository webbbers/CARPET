import { render, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ExamCreator from './examCreator.component';

const mockStore = configureMockStore();


// SIMULATING USER INTERACTION

 test('Exam Name input works correctly', () => {
     let store = mockStore({user:{id:323232,displayName:"talha"}});
     const {  getByDisplayValue,getByPlaceholderText } =render(<BrowserRouter> <Provider store={store}><ExamCreator /></Provider></BrowserRouter>);
   
     const examNameInput = getByPlaceholderText("Exam Name")

     fireEvent.change(examNameInput, { target: { value:"Math Exam" }})

     getByDisplayValue("Math Exam")
    
 });
describe("Adding Questions to ExamCreator",()=>{
    let store = mockStore({user:{id:323232,displayName:"talha"}});
    
    test('Adds MultipleChoice Question to ExamCreator', () => {
        const { getByText } =render(<BrowserRouter> <Provider store={store}><ExamCreator /></Provider></BrowserRouter>);
        
        const addMcQuestion = getByText("+ Add MultipleChoice")
        
        fireEvent.click(addMcQuestion)
        getByText("Q3")
        
    });
    test('Adds True False Question to ExamCreator', () => {
        const { getByText } =render(<BrowserRouter> <Provider store={store}><ExamCreator /></Provider></BrowserRouter>);
        const addTfQuestion = getByText("+ Add True-False")
    
        fireEvent.click(addTfQuestion)
        getByText("Q3")
    });
})

// test('Exam Id input works correctly', () => {

//     let store = mockStore({user:{id:323232,displayName:"talha"},examId:15});
//     const {  getByText,getByPlaceholderText } =render(<BrowserRouter> <Provider store={store}><ExamCreator /></Provider></BrowserRouter>);
//     const saveExamButton = getByText("Save the Exam")
//     fireEvent.click(saveExamButton)
//     getByText("Your exam is created successfully.")
   
// });


