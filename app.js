const correctAnswer = ['B','A','B','A','A','B','B','A','A','A'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.score');
const scoreFigure = document.querySelector('.score-figure');

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
        }else {
            output ++;
        }
    },10);
});