const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnwsers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []


let questions = [
{
    question: "What is the capital of Virginia?",
    choice1: "7-Eleven",
    choice2: "Sheetz",
    choice3: "Wawa",
    choice4: "Richmond",
    choice5: "Circle-K",
    anwser: 4,
},
{
    question: "Who is the president?",
    choice1: "Arnold Schwartzenegger",
    choice2: "Jimmy John",
    choice3: "Bill CLinton",
    choice4: "Joe Biden",
    choice5: "Steve Jobs",
    anwser: 4,
},
{
    question: "What is the name of this class?",
    choice1: "Reckless, and agressive driver education",
    choice2: "Computer coding bootcamp",
    choice3: "Cooking skills",
    choice4: "Recycling skills",
    choice5: "Body pump",
    anwser: 2,
},
{
    question: "How long is this bootcamp?",
    choice1: "96 weeks",
    choice2: "46 weeks",
    choice3: "24 weeks",
    choice4: "52 weeks",
    choice5: "36 weeks",
    anwser: 3,
},
{
    question: "How old am I?",
    choice1: "35 yrs old",
    choice2: "17 yrs old",
    choice3: "65 yrs old",
    choice4: "46 yrs old",
    choice5: "96 yrs old",
    anwser: 1,
}
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionsCounter > 
        MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
   
  
    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnwsers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnwsers) return

        acceptingAnwsers = false
        const selectedChoice = e.target
        const selectedAnwser = selectedChoice.dataset['number']

        let classToApply = selectedAnwser == currentQuestion.anwser ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
                incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}



startGame()







