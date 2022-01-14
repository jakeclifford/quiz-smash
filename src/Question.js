import React from 'react'
import { nanoid } from 'nanoid'

export default function Question(props) {
    
    const [randomArray, setRandomArray] = React.useState([])
    
    
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
         array[randomIndex], array[currentIndex]];
        }
    return array;
    }

    
    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
    
    function changeClass(id, value) {
        if (value === 'correct'){
             document.getElementById(id).className = 'correctClicked'
        }
        for (let i = 0; i < incorrectIds.length; i++){
            document.getElementById(incorrectIds[i]).className = 'btn-disable'
        }
        if (value === 'incorrect'){
            document.getElementById(id).className = 'incorrectClicked'
        }
    }       
    
        const correctId = nanoid()
        const incorrectIds = [nanoid(), nanoid(), nanoid()]
        let counter = 0
            
        const correctAnswer = 
                                    <button 
                                            value='correct'
                                            id={correctId}
                                            onClick={e => {
                                                props.answerQuestion(e, 'correct')
                                            }}>       
                                    {htmlDecode(props.result.correct_answer)}</button>
                            
                                    
                
        let answers = props.result.incorrect_answers
        let allAnswers = answers.map(answer => {
                            const id = incorrectIds[counter]
                            counter++ 
                            return (
                            <button 
                                value='incorrect'
                                id={id}
                                onClick={e => {
                                    props.answerQuestion(e, 'incorrect')
                                }}>
                            {htmlDecode(answer)}</button>)})
                            
        allAnswers.push(correctAnswer)
       
       
       
       React.useEffect(function() {
           setRandomArray(shuffle(allAnswers))
        }, [props.result])
   

        
    return (
        <div className='question'>
            <h3 className='Question-title'>{htmlDecode(props.result.question)}</h3>
            <div className='answers'>
                {randomArray}
            </div>
        </div>
    )
}