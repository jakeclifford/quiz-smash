import React from 'react'

export default function Intro(props) {
    return (
        <div className='intro'>
            <h1 className='Intro--title'>Quiz Smash</h1>
            <p className='Intro--desc'>How Smart Are You?</p>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>
        
    )
}