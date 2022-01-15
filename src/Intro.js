import React from 'react'
import Logo from './quiz.svg'

export default function Intro(props) {
    return (
        <div className='intro'>
            <img src={Logo} />
            <p className='Intro--desc'>How Smart Are You?</p>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>
        
    )
}