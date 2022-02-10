const correctAnswer = ['B','A','B','A','A','B','B','A','A','A'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.score');
const scoreFigure = document.querySelector('.score-figure');

const form = document.querySelector('form');
const input = document.querySelector('form input');
const body = document.querySelector('body');



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

    self('https://opentdb.com/api.php?amount=10&type=boolean', data => {

        console.log(data);
    
        data.forEach((result,id) => {
            id ++;
            const question = result.question;
            html = `
                <div class="question">
                    <p class="text">
                    ${id}. ${question}.
                    </p>
                    <input type="radio" name={"q${id}"} id="option1" value="A">
                    <label for="option1" >True</label>
                    <br><br>
                    <input type="radio" name={"q${id}"} id="option2" value="B">
                    <label for="option2" >False</label>
                </div>
            `;
            body.innerHTML += html;
        });
        
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