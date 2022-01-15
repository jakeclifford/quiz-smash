import React from 'react' 
import Question from './Question'
import Intro from './Intro'
import { nanoid } from 'nanoid'
import { Alert, AlertTitle } from '@mui/material';

export default function App(){
    const [introState, setIntroState] = React.useState(true)
    const [questions, setQuestions] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [answeredQuestions, setAnsweredQuestions] = React.useState(0)
    const [checked, setChecked] = React.useState(false)
    const [lastQuestion, setLastQuestion] = React.useState(false)
    
    React.useEffect(function() {
       fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])
    
    function newQuestions() {
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        setCorrectAnswers(0)
        setAnsweredQuestions(0)
        const changeButtons = document.querySelectorAll('.answers button')
        for (const button of changeButtons) {
            button.className = ''
        }
        setChecked(false)
    }
    
    const quizQuestions = questions.map(result => {
            return (<Question result={result} question={questions}  answerQuestion={answerQuestion} />)
    })
    
    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
    
     function answerQuestion(event, value){
        setAnsweredQuestions(prev => prev + 1)
        if (value === 'correct') {
            setCorrectAnswers(prev => prev + 1)
            setLastQuestion(true)
        } else {
            setLastQuestion(false)
        }
     }
    
    function startQuiz() {
        setIntroState(false)
    }
    
    function checkAnswers() {
        const incorrectAnswers = document.querySelectorAll('button[value=incorrect]')
        for (const answer of incorrectAnswers){
            answer.className = 'btn-disable'
        }
        const correctAnswers = document.querySelectorAll('button[value=correct]')
        for (const answer of correctAnswers){
            answer.className = 'correctClicked'
        }
        setChecked(true)
    }
     
    return (
        <main>
            {introState ? <div className='questions'>
            <Intro startQuiz={startQuiz}/> </div> :
            <div className='questions'>
                {answeredQuestions < 10 &&<h1 className="question-number">{answeredQuestions + 1}</h1>}
                {quizQuestions[answeredQuestions]}
                {answeredQuestions === 10 && 
                    <div class='score'>
                        <h2 className='finalScore'>You have Scored {correctAnswers}/10</h2>
                        <button className='qbutton' onClick={newQuestions}>Play Again</button>
                    </div>
                }
            </div>}
            <div className="alerts">
                {lastQuestion === true && answeredQuestions != 0 && <Alert variant="filled" severity="success">Question {answeredQuestions} - Correct Answer!</Alert>}
                {lastQuestion === false && answeredQuestions != 0 && <Alert variant="filled" severity="error">Question {answeredQuestions} - Incorrect Answer!</Alert>}
            </div>
        </main>  
        )
}