let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "pink", "green"]

let started = false;
let level = 0;

let h2 = document.querySelector("#instruction");
let levelDisplay = document.querySelector("#level-display");
let playBtn = document.querySelector("#play-btn");

playBtn.addEventListener("click", function(){
    if(started == false){
        console.log("Game starting...");
        started = true;
        playBtn.disabled = true;
        playBtn.textContent = "⏳ Starting...";
        startCountdown();
    }
});

function startCountdown(){
    let count = 3;
    h2.innerHTML = `<div class="countdown">${count}</div>`;

    let countdownInterval = setInterval(function(){
        count--;
        if(count > 0){
            h2.innerHTML = `<div class="countdown">${count}</div>`;
        } else if(count === 0){
            h2.innerHTML = `<div class="countdown">GO!</div>`;
        } else {
            clearInterval(countdownInterval);
            setTimeout(function(){
                levelUp();
            }, 500);
        }
    }, 1000);
}

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    }, 400)
}

function userflash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    }, 300)
}

function playSequence(){
    let i = 0;
    let interval = setInterval(function(){
        gameflash(document.querySelector(`.${gameSeq[i]}`));
        i++;
        if(i >= gameSeq.length){
            clearInterval(interval);
        }
    }, 600);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `🎮 Level ${level}`;
    levelDisplay.innerText = level;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    playSequence();
}

function checkAns(idx){
    // console.log("current level : ", level);
    // let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        // h2.innerText = `Oops..Game is over \n Press any button to restart`;
        alert(`🎮 Game Over!\n\n❌ Wrong Move!\nYour Final Score: ${level}\n\n💪 Try Again to Beat Your Score!`);
        
        h2.innerHTML = `<span style="font-size: 1.2em;">😔 Game Over!</span><br>Your score: <span style="color: #764ba2; font-weight: 700;">${level}</span><br><span style="font-size: 0.95em; color: #667eea;">Press any key to restart</span>`;
        document.querySelector("body").style.backgroundColor = "#ff6b6b"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        }, 300);
        
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    levelDisplay.innerText = "0";
    h2.innerText = "Ready to play?";
    playBtn.disabled = false;
    playBtn.textContent = "🎮 PLAY";
}

