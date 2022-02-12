const correctAnswer = [];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.score');
const scoreFigure = document.querySelector('.score-figure');
const questionsContainer = document.querySelector('.main-questions');




const self = (resource, callback) =>{
    const request = new XMLHttpRequest;

    request.addEventListener('readystatechange', () => {

        if (request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            callback(data);
        }
    });

    request.open('GET',resource);
    request.send();
};

self('https://opentdb.com/api.php?amount=10&type=boolean', (data) => {
    const data_answers = data.results;

    data_answers.forEach(answer =>{
        const  correct = answer.correct_answer;
        if (correct === 'True'){
            correctAnswer.push('A');
        }else {
            correctAnswer.push('B');
        }
    })
    const questions = data.results;
    // console.log((questions));

    questions.forEach((question, id) =>{

       

        id ++;
        const questionTitle = question.question;
        
        html = `
            <div class="question">
                <p class="text">
                ${id}. ${questionTitle}
                </p>
                <input type="radio" name="q${id}" id="option1" value="A">
                <label for="option1" >True</label>
                <br><br>
                <input type="radio" name="q${id}" id="option2" value="B">
                <label for="option2" >False</label>
            </div>
        `;
        questionsContainer.innerHTML += html;
        
    });

    
    
});




form.addEventListener('submit', e => {
    e.preventDefault();
    
    let score = 0;
    const userAnswer = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value,form.q10.value];

    //check answers
    userAnswer.forEach((answer, index) => {
        if (answer===correctAnswer[index]){
            score += 10;
        }
    });

    
    //show result
    scrollTo(0,0);
    scoreFigure.style.display = 'block';

    let output = 0;
    const timer = setInterval(() =>{
        scoreFigure.textContent = `${output} %`;
        if (output === score){
            clearInterval(timer);
            setTimeout(()=>{
                location.reload();
            },10000)
        }else {
            output ++;
        }

    },10);
});