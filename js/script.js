const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;

let counter;
let counterLine;

const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    startTimer(timeValue); 
    timeText.textContent = "Time "; 
    next_btn.classList.remove("show"); 
}

quit_quiz.onclick = ()=>{
    location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1)
    { 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        startTimer(timeValue); 
        timeText.textContent = "Time "; 
        next_btn.classList.remove("show"); 
    }
    else
    {
        clearInterval(counter);
        showResult(); 
    }
}

function showQuetions(index)
{
    const que_text = document.querySelector(".que_text");
    let que_tag = questions[index].numb + ". " + questions[index].question ;
    let option_tag = '<div class="option">'+ questions[index].options[0] +'</div>'
    + '<div class="option">'+ questions[index].options[1] +'</div>'
    + '<div class="option">'+ questions[index].options[2] +'</div>'
    + '<div class="option">'+ questions[index].options[3] +'</div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++)
    {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '';
let crossIconTag = '';

function optionSelected(answer)
{
    clearInterval(counter); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns)
    {
        userScore += 1;
        answer.classList.add("correct"); 
    }
    else
    {
        answer.classList.add("incorrect"); 
        for(i=0; i < allOptions; i++)
        {
            if(option_list.children[i].textContent == correcAns)
            { 
                option_list.children[i].setAttribute("class", "option correct"); 
            }
        }
    }
    for(i=0; i < allOptions; i++)
    {
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult()
{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3)
    {
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1)
    { 
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else
    { 
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer()
    {
        timeCount.textContent = time; 
        time--; 
        if(time < 9)
        { 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0)
        { 
            clearInterval(counter); 
            timeText.textContent = "Time over"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++)
            {
                if(option_list.children[i].textContent == correcAns)
                { 
                    option_list.children[i].setAttribute("class", "option correct"); 
                }
            }
            for(i=0; i < allOptions; i++)
            {
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}
function queCounter(index)
{
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}