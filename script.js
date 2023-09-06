const startSection = document.querySelector('.start-section')
const questionSection = document.querySelector('.question-section')
const submitSection = document.querySelector('.submit-section')
const leaderSection = document.querySelector('.leader-section')


const username = document.querySelector('.require')
const error = document.querySelector('.error')
const startbtn = document.getElementById('startbtn')


const question = document.querySelector('.main')
const option = document.querySelector('.ans')
const currentQuestion = document.querySelector('.current-question')
const questionLength = document.querySelector('.question-length')
const name = document.querySelector('.name')
const A = document.getElementById('A')
const B = document.getElementById('B')
const C = document.getElementById('C')
const D = document.getElementById('D')
const previousBtn = document.getElementById('previous')
const NextBtn = document.getElementById('nxt')
const quitbtn = document.getElementById('quitbtn')
const answer  = document.querySelectorAll('.ans')


const backToStart = document.getElementById('backtostart')


// const link = document.getElementById('link1')
const leaderBtn = document.getElementById('leaderbtn')
const displayScore = document.querySelector('.score')
const correctAns = document.querySelector('.correctans')
const WrongAns = document.querySelector('.wrongans')
const studentname = document.querySelector('.sname')








startbtn.addEventListener('click', function(){
    if(username.value.trim() == ''){
        error.classList.remove('hide')
    }else{
        error.classList.add('hide')
        localStorage.setItem('username', username.value)
        startSection.classList.add('hide')
        questionSection.classList.remove('hide')
        active(currentquest)
    }
})

const questions = [
    {
        id:1,
        question : 'Which of the following is not a fruit',
        options:{
            A:'apple',
            B: 'Bell',
            C: 'orange',
            D: 'pawpaw'
        },
        selected:'',
        answer: 'B'

    },
    {
        id:2,
        question : 'Which of the following is  an object',
        options:{
            A:'bell',
            B: 'apple',
            C: 'orange',
            D: 'pawpaw'
        },
        selected:'',
        answer: 'A'

    },
    {
        id:3,
        question : 'Which of the following is  a color',
        options:{
            A:'apple',
            B: 'Bell',
            C: 'orange',
            D: 'pawpaw'
        },
        selected:'',
        answer: 'C'

    }

]

let currentquest = 0;
let score = 0
let isUpdateScore = false



function active(quest){
    const item = questions[quest]

    question.textContent = item.question;
    A.textContent = item.options.A;
    B.textContent = item.options.B;
    C.textContent = item.options.C;
    D.textContent = item.options.D;

    removeClick()
    answer.forEach(btn => {
        if(item.selected == btn.textContent){
            console.log(btn.textContent);
            btn.classList.add('click')
        }
    })

    currentQuestion.textContent = currentquest + 1;
    questionLength.textContent = questions.length

    name.textContent = localStorage.getItem('username')
}


NextBtn.addEventListener('click', function(){
   
   if(isUpdateScore){
    updateScore()
   }

    currentquest++

    if(currentquest == questions.length -1){
        NextBtn.innerText = 'Submit';
    }

    if(currentquest == questions.length){
        questionSection.classList.add('hide')
        submitSection.classList.remove('hide')  
        NextBtn.innerText = 'Next'
    }

    if(currentquest < questions.length ){
        active(currentquest)
    }


})

previousBtn.addEventListener('click', function(){
    if(currentquest >= 1 ){
        currentquest--;
        NextBtn.innerText = 'Next'
    }
    active(currentquest)
})

quitbtn.addEventListener('click', function(){
    questionSection.classList.add('hide')
    startSection.classList.remove('hide')
    localStorage.removeItem('username', username.value)
    username.value = ''
    currentquest = 0
    questions.forEach(el => {
        el.selected = ''
    });

    score=0
})



answer.forEach(btn =>{
    btn.addEventListener('click', function(){
        removeClick()
        let question = questions[currentquest]
        btn.classList.add('click')

        if(!question.selected){
            isUpdateScore = true
        }else if(question.selected && btn.textContent !== question.answer){
            isUpdateScore = true
        }else if(btn.textContent !== question.selected){
            isUpdateScore = true

        }

        question.selected = btn.textContent

    })   
}) 

function removeClick(){
    answer.forEach(btn =>{
        btn.classList.remove('click')
    }) 
}

function updateScore(){
    let question = questions[currentquest]
    if(question.selected == question.answer){
        score+=5
    }else{
        // if(score !== 0){
        //     score-=5
        // }
    }

    isUpdateScore = false
    localStorage.setItem('score', score)
    displayScore.textContent = score
console.log(score, displayScore.textContent);

}


backToStart.addEventListener('click', function(){
    submitSection.classList.add('hide')
    leaderSection.classList.remove('hide')
    leaders()
})


// link.addEventListener('click', function(){
//     startSection.classList.add('hide')
//     leaderSection.classList.remove('hide')
// })

leaderBtn.addEventListener('click', function(){
    leaderSection.classList.add('hide')
    startSection.classList.remove('hide')
    localStorage.removeItem('username', username.value)
    username.value = ''
    currentquest = 0
    score = 0
    questions.forEach(el => {
        el.selected = ''
    });


})


function leaders(){
    studentname.textContent = localStorage.getItem('username')

    let correct = 0, wrong = 0

    questions.forEach(el =>{
        if(el.selected == el.answer){
            correct++
        }else{
            wrong++
        }
    })

    correctAns.innerText = correct
    WrongAns.innerText = wrong



}
