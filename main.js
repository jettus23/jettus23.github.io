const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: "Was ist die Hauptstadt von Deutschland?",
        answers: {
            a: "Berlin",
            b: "München",
            c: "Hamburg"
        },
        correctAnswer: "a"
    },
    {
        question: "Welche Farbe hat der Himmel?",
        answers: {
            a: "Rot",
            b: "Blau",
            c: "Grün"
        },
        correctAnswer: "b"
    },
    {
        question: "Wie viele Kontinente gibt es auf der Erde?",
        answers: {
            a: "5",
            b: "6",
            c: "7"
        },
        correctAnswer: "c"
    }
];

function buildQuiz(){
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];

            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    quizContainer.innerHTML = output.join('');
}

function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach( (currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} von ${myQuestions.length} richtig`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);