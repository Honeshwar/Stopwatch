//fetch counter span element
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

//fetch all stopwatch button
const start_btn = document.querySelector('#stopwatch-btn button:first-child');
const stop_btn = document.querySelector('#stopwatch-btn button:nth-child(2)');
const reset_btn = document.querySelector('#stopwatch-btn button:last-child');

//initializing counter time to 0
let hoursCounter = 0;
let minutesCounter = 0;
let secondsCounter = 0;
let COUNTER_STATUS = 'STOPPED';

//creating function to start counter
function startCounter(){

    // adding event listener to start button of stopwatch
    start_btn.addEventListener('click',function (){
        
        //checking counter is start or not
        if(COUNTER_STATUS != "STARTED" ){
            COUNTER_STATUS = "STARTED";
        //initializing stop and reset button event listener when someone click on start button (counter is start) 
            stopCounter();
        }
    });
}

//creating function to stop and reset counter
 function stopCounter(){

    //changing stop and start button background color and text color on starting of counter
    start_btn.style.backgroundColor='green';
    start_btn.style.color='white';
    stop_btn.style.backgroundColor='red';
    stop_btn.style.color='white';

    //setup an function that initialize setInterval 
    let interval;
    function intervals(){
     interval = setInterval(function(){
        //setup second hand 
        secondsCounter++;
        if(secondsCounter <= 9){
            seconds.innerText="0" + secondsCounter;
        } 
        else if(secondsCounter>9 && secondsCounter<60){
                seconds.innerText=secondsCounter;
        }//setup minute hand 
        else if(secondsCounter === 60 && minutesCounter+1<60 ){
                seconds.innerText="00";
                secondsCounter = 0;
                minutesCounter++;
            if(minutesCounter <= 9){
                minutes.innerText="0" + minutesCounter+ ':';
            } else{
    
                minutes.innerText=minutesCounter + ':';
            }
        }//setup hour hand 
        else if(minutesCounter === 59 && hoursCounter+1<24){
                minutes.innerText="00:";
                seconds.innerText="00";
                minutesCounter = 0;
                secondsCounter = 0;
                hoursCounter++;
            if(hoursCounter <= 9){
                hours.innerText="0" + hoursCounter + ':';
            } else{
    
                hours.innerText=hoursCounter + ':';
            }
        }//setup stopwatch end time 23:59:59 after 1 second THAN 00:00:00
        else if(hoursCounter === 23){
            hours.innerText="00:";
            minutes.innerText="00:";
            seconds.innerText="00";
            hoursCounter = 0;
            minutesCounter = 0;
            secondsCounter = 0;
        }
        
    },1000);
 }
 intervals();
    
// adding event listener to start button of stopwatch
    let isReset = false;
    let STOP_COUNTER_STATUS = "STOPPED";
    stop_btn.addEventListener('click',function(e){

           if(STOP_COUNTER_STATUS == "STOPPED" && !isReset){
            //setting stop status(whether counter is stop or not) and depend upon it text on stop button
                STOP_COUNTER_STATUS ="RESUME"
                stop_btn.innerHTML = '<i class="fa-solid fa-pause"></i>  <span > Resume</span>';    
                clearInterval(interval);// to stop counter
           }
           else if(STOP_COUNTER_STATUS == "RESUME" && !isReset){
            //setting stop status(whether counter is stop or not) and depend upon it text on stop button
             STOP_COUNTER_STATUS = "STOPPED"
             stop_btn.innerHTML = '<i class="fa fa-stop"></i>  <span> Stop</span>';  
             intervals();
           }
        });


// adding event listener to reset button of stopwatch
    reset_btn.addEventListener('click',function resetCounter(){
    //setting counter to 00:00:00 and clear Interval
    hours.innerText = "00:";
    minutes.innerText = "00:";
    seconds.innerText = "00";
    clearInterval(interval);

    //setting styles of buttons to default
    start_btn.style.backgroundColor='white';
    start_btn.style.color='black';
    stop_btn.style.backgroundColor='white';
    stop_btn.style.color='black';

    //setting Text on  buttons to default
    stop_btn.innerHTML = "<i class='fa fa-stop'></i> <span> Stop</span>";
   
    //setting counter to default
    COUNTER_STATUS = "STOPPED";
    hoursCounter = 0;
    minutesCounter = 0;
    secondsCounter = 0;

    //setting reset to true if someone click on reset
    isReset = true;
});

 }

 startCounter();