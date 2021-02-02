import {shuffleExam,shuffleSingleQuestionsOptions,shuffleQuestionsOptions} from './exam.component';
const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

    const sampleQuestions = [  {
            key:0,
            type:"MultipleChoice",
            points:15,
            imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"What is my name ?",
            answerOptions : [
                { answerText: 'Talha', isCorrect: true},
                { answerText: 'Tayfur', isCorrect: false},
                { answerText: 'Sarp', isCorrect: false},
                { answerText: 'Kuzey', isCorrect: false},
            ]   
        },
        {
            key:1,
            type:"TrueFalse",
            points:10,
            // imageURL: "https://avatars2.githubusercontent.com/u/54589572?s=460&u=b663e9b613864114600790beb68d7d1d45b9cbde&v=4",
            questionText:"Am I a soldier ?",
            isCorrect:false
        }
]
const sampleQuestion = sampleQuestions[0]
   

const sortByKey = (a, b) => {           // comparison function used to help compare two array containing same objects but different order
    if(a.key < b.key) return -1; 
    else if(a.key > b.key) return 1; 
    else return 0; 

}

test('Shuffle Exam Test',() => {
    let sortedShuffledQuestions = shuffleExam(sampleQuestions).sort(sortByKey)
    let sortedSampleQuestions =  sampleQuestions
    sortedSampleQuestions = sortedSampleQuestions.sort(sortByKey)
    expect(sortedShuffledQuestions).toEqual(sortedSampleQuestions);
})
test('Shuffle Single Questions Options Test',() => {
    expect(shuffleSingleQuestionsOptions(sampleQuestion)).toEqual(sampleQuestion);
})
test('Shuffle Questions Options',()=>{      // considered as an integration test since we call shuffleSingleQuestionsOptions in this
    let sortedShuffledQuestionsOptions = shuffleQuestionsOptions(sampleQuestions).sort(sortByKey)
    let sortedSampleQuestions =  sampleQuestions
    // sortedSampleQuestions = sortedSampleQuestions.sort(sortByKey)
    expect(sortedShuffledQuestionsOptions).toEqual(sortedSampleQuestions);
})