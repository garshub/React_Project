import { useState } from 'react'

const useWordle = (solution) => {

   const [turn, setTurn] = useState(0) 
   const [currentGuess, setCurrentGuess] = useState('')
   const [guesses, setGuesses] = useState([]) // each guess is an array
   const [history, setHistory] = useState(['hello', 'words']) // each guess is a string
   const [isCorrect, setIsCorrect] = useState(false)

   const formatGuess = () => {
      let solutionsArray = [...solution]
      let formattedGuess = [...currentGuess].map((l) => {
         return {key : l, color: 'grey'}
      })

      //green
      formattedGuess.forEach((l, i) => {
         if(solutionsArray[i] === l.key){
            formattedGuess[i].color = 'green'
            solutionsArray[i] = null
         }
      })

      //yellow
      formattedGuess.forEach((l, i) => {
         if(solutionsArray.includes(l.key) && l.color == 'green'){
            formattedGuess[i].color = 'yellow'
            solutionsArray[solutionsArray.indexOf(l.key)] = null
         }
      })
      
      return formattedGuess
   }

   const addGuess = () => {

   }

   const handleKeyup = ({key}) => {

      if(key === 'Enter'){
         if(turn > 5){
            console.log("All guesses used")
            return
         }

         if(history.includes(currentGuess)){
            console.log("Duplicate word")
            return
         }

         if(currentGuess.length != 5){
            console.log("Invalid input")
            return
         }
         const formattedGuess = formatGuess()
         console.log(formattedGuess)
      }

      if(key === 'Backspace'){
         setCurrentGuess((prev)=>{
            return prev.slice(0, -1)
         })
         return
      }
      
      if(/^[A-Za-z]$/.test(key)){
         if(currentGuess.length < 5){
            setCurrentGuess((prev)=>{
               return prev + key
            })
         }
      }
   }

   return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle