// getting elements to display and hide them
var animation; //hold animation frame
var closeAnimation=false
var homebgimage = document.getElementById('bgimage')
var playbtn = document.getElementById('play')
var homebtn = document.getElementById('home')
var iceteam = document.getElementById('ice')
var fireteam = document.getElementById('fire')
var gameLogo = document.getElementById('logo')
var levels = document.getElementsByClassName('levels')
var gameEnd = document.getElementById('gameover')
var description = document.getElementById('ilogo')
var bgchecker = 0
let level1=0;
let level2=0;
let level3=0;
let lvlChecker = 0 // 0 for easy level , 1 for med , 2 for hard
var playingChar;

let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');
var onlyLetters = 1;
easy.addEventListener('click', easyLevel);
medium.addEventListener('click', mediumLevel);
hard.addEventListener('click', hardLevel);
window.canvas = document.getElementById('canvas');
canvas.width = 0;
canvas.height = 0;
let score = 0;
let live = 3;
var livesImg = document.getElementsByClassName('lives');
var scoreIcon = document.getElementById("scorelogo");
var bestScoreIcon = document.getElementById("bestscoreicon");
playbtn.addEventListener('click', playfn)
homebtn.addEventListener('click', goHome)
fireteam.addEventListener('click', firePlayer)
iceteam.addEventListener('click', icePlayer)
var iceScore = document.getElementById('iceScore')
var fireScore = document.getElementById('fireScore')
var fireHighScoreIcon = document.getElementById('firebestscoreicon')    //naggar edit 2 lines
var iceHighScoreIcon = document.getElementById('icebestscoreicon')
//geting highScore
var iceHighScore = localStorage.getItem("ice");
var fireHighScore = localStorage.getItem("fire");
if (iceHighScore === null) {
  console.log("first time with storage")
  localStorage.setItem("ice", 0);
  iceHighScore = 0;
}
if (fireHighScore === null) {
  console.log("first time with storage")
  localStorage.setItem("fire", 0);
  fireHighScore = 0;
}

//styling of the letters
window.letter = {
  font: '20px Times New Roman', //shape
  color: '#001d27',
  size: 60, //real size
  highestSpeed: 1, //1.6 max 3 min 1
  lowestSpeed: 0.2, //0.6 min 0.2 max 0.6
  probability: 0.02
};

//styling for the score 
window.label = {
  font: '24px Arial',
  color: '#0095DD',
  margin: 20
};

//golden Letters  variables
var goldenLetter =false;
var startTime;
var goldenLetterStarted = true;
var goldeLetterInterval;

//drawing charcter variables
var imgCounter=0;
var charImg = new Image();
var startDrawing=0;

//score variables
var mediumScore=30;
var hardScore=100;
//don't miss counter
var straightWin=0;
const easyHighStraights=30;
const mediumHighStraights=15;
const hardHighStraights=10;

//the Play button handler
function playfn() {
  gameLogo.style.display = 'none'
  playbtn.style.display = 'none'
  description.style.display = 'none'
  homebgimage.style.backgroundImage = "url('images/menu\ 2.png')";
  fireteam.style.display = 'block'
  iceteam.style.display = 'block'
  homebtn.style.display = 'block'
  
  fireHighScoreIcon.style.display = 'block'             // naggar edit 2 lines
  iceHighScoreIcon.style.display = 'block'
  iceScore.innerHTML = iceHighScore;
  fireScore.innerHTML = fireHighScore;
}

//goHome Img
function goHome() {
  homebgimage.style.backgroundImage = "url('images/menu\ 1.png')";
  fireteam.style.display = 'none'
  iceteam.style.display = 'none'
  homebtn.style.display = 'none'
  window.canvas.display = 'none'
  easy.style.display='none'                               // naggar edit 3 lines

  medium.style.display='none'
  hard.style.display='none'
  window.location.reload(false)
  gameLogo.style.display = 'block'
  playbtn.style.display = 'block'
}

//to handle if the icePlayer is choosed
function icePlayer() {
  homebgimage.style.backgroundImage = "url('images/whitekingbg.jpg')";
  letter.color = 'white';
  label.color = 'white';
  choosePlayer()
  bgchecker = 1
  playingChar = "ice";
}

//to handle if the firePlayer is choosed
function firePlayer() {
  homebgimage.style.backgroundImage = "url('images/redsamuraibg.jpg')";
  letter.color = 'white';
  label.color = 'white';
  choosePlayer()
  easy.src='images/easyfire.png'                           // naggar edit 3 lines
  medium.src='images/mediumfire.png'
  hard.src='images/hardfire.png'
  bgchecker = 0
  playingChar = "fire";
}

//to hide charcters and show levels
function choosePlayer() {
  iceScore.style.display = 'none';
  fireScore.style.display = 'none';
  fireteam.style.display = 'none'
  iceteam.style.display = 'none'
  homebtn.style.display = 'block'
  homebtn.style.marginLeft = '1%'
  fireHighScoreIcon.style.display = 'none'          // naggar edit 2 lines 
  iceHighScoreIcon.style.display = 'none'
  for (let i = 0; i < 3; i++) {
    levels[i].style.display = 'block'
  }
}

//change background based on choosed player
function bgImage() {
  if (bgchecker) {
    window.canvas.style.backgroundImage = "url('images/ice2.png')"; // ice image
  } else {
    window.canvas.style.backgroundImage = "url('images/fire2.png')"; // fire image
  }
}

//set the environment (intializing variables)
function start() {
  easy.style.display = 'none';
  medium.style.display = 'none';
  hard.style.display = 'none';
  window.canvas = document.getElementById('canvas');
  window.ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.getTime = typeof performance === 'function' ? performance.now : Date.now;
  window.FRAME_DURATION = 1000 / 58;
  window.then = getTime();
  window.acc = 0;
  window.fastRound=false;
  window.canvas.style.display = 'block'
  homebgimage.style.display = 'none'
  homebtn.style.display = 'block'
  bgImage();

  window.caseSensitive = false;

  //is the circle in the middle
  window.center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 50,
    color: '#FF0000',
  };

  //styling of the particales
  window.particle = {
    alpha: 0.5,
    decrease: 0.05,
    highestRadius: 5,
    highestSpeedX: 5,
    highestSpeedY: 5,
    lowestRadius: 2,
    lowestSpeedX: -5,
    lowestSpeedY: -5,
    total: 50
  };
  letter.highestSpeed= 1;
  letter.lowestSpeed= 0.2;

  resetLetters();
  startTime =getTime();
  startDrawing=getTime();
}

//Handler of easy level button
function easyLevel() {
  start();
  level1=1;
  lvlChecker = 0
  onlyLetters = 1;
  levelHandler();
}

//Handler of medium level button
function mediumLevel() {
  start();
  level2=1;
  lvlChecker = 1
  onlyLetters = 1
  caseSensitive = true;
  levelHandler();
}

//Handler of hard level button
function hardLevel() {
  start();
  level3=1;
  lvlChecker = 2
  onlyLetters = 0
  caseSensitive = true;
  levelHandler();
}

//to be called in each level
function levelHandler() {
  draw();
  document.addEventListener('keydown', keyDownHandler);
  window.addEventListener('resize', resizeHandler);
}

function draw() {
  let now = getTime(); //get the current time
  let ms = now - then; //get the difference between the then and now time
  let frames = 0;
  then = now; //restart then
  if (ms < 1000) {
    acc += ms;
    while (acc >= FRAME_DURATION) {
      frames++;
      acc -= FRAME_DURATION;
    }
  } else {
    ms = 0;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(live==3){
    ctx.drawImage(livesImg[live-3],canvas.width-50,5,30,30);
    ctx.drawImage(livesImg[live-2],canvas.width-85,5,30,30);
    ctx.drawImage(livesImg[live-1],canvas.width-120,5,30,30);
  }else if(live == 2){
    ctx.drawImage(livesImg[live-1],canvas.width-50,5,30,30);
    ctx.drawImage(livesImg[live-1],canvas.width-85,5,30,30);
  }else if(live == 1){
    ctx.drawImage(livesImg[live-1],canvas.width-50,5,30,30);
  }
  let imgSrc;
  if(playingChar==="fire"){
    imgSrc="images/f"
  }else{
    imgSrc="images/i"
  }
  imgSrc= imgSrc+imgCounter+".png";
  charImg.src=imgSrc;

  ctx.drawImage(charImg,canvas.width/2 -65,canvas.height/2 -65,120,120);

  if(getTime()-startDrawing >= 150){
    imgCounter=(imgCounter+1)%6;
    startDrawing=getTime();
  }
  
  ctx.font = letter.font;
  ctx.fillStyle = letter.color;
  for (let l of letters) {
    if(l.goldenLetter === true){
      ctx.fillStyle = '#FFFF00';
      ctx.fillText(String.fromCharCode(l.code), l.x, l.y);
      console.log("printing GoldenLetter been called = "+String.fromCharCode(l.code))
      ctx.fillStyle = letter.color;
    }else{
      ctx.fillText(String.fromCharCode(l.code), l.x, l.y); 
    }
    //The fillText() method draws filled text on the canvas. takes the words , x and y coordinates where to start painting the text
    //The default color of the text is black. that's why we changed the fillstyle first
    //The fromCharCode() method converts Unicode values into characters.
  }
  for (let p of particles) {
    drawCircle(p); //calling drawcircle to draw the particles
  }
  ctx.font = label.font;
  ctx.fillStyle = label.color;
  ctx.drawImage(scoreIcon,70,3,40,50);
  ctx.fillText(score, 115, label.margin * 2);
  ctx.drawImage(bestScoreIcon,70,53,40,40);
  if (playingChar == "ice") {
    ctx.fillText(iceHighScore, 120, label.margin * 4.2);
  } else {
    ctx.fillText(fireHighScore, 120, label.margin * 4.2);
  }
  processParticles(frames);
  createLetters(window.onlyLetters);
  removeLetters(frames);
  if(!closeAnimation){
    animation=window.requestAnimationFrame(draw);
  }
}

//handle drawing circles
function drawCircle(c) {
  ctx.beginPath(); // is a canavs function to begins a path, or resets the current path.
  ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI); //The arc() method creates an arc/curve (used to create circles, or parts of circles).
  ctx.fillStyle = c.color; //change the default fill style
  ctx.fill(); //The fill() method fills the current drawing (path). The default color is black.
  ctx.closePath();
}

//hndle particles
function processParticles(frames) {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.speedX * frames;
    p.y += p.speedY * frames;
    p.radius -= particle.decrease;
    if (p.radius <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      particles.splice(i, 1);
    }
  }
}

//Create random letters 
function createLetters(isLetter) {
  if (Math.random() < letter.probability) {
    let x = Math.random() < 0.5 ? 0 : canvas.width;
    let y = Math.random() * canvas.height;
    let dX = center.x - x;
    let dY = center.y - y;
    let norm = Math.sqrt(dX ** 2 + dY ** 2);
    let speed = letter.lowestSpeed + Math.random() * (letter.highestSpeed - letter.lowestSpeed);
    let char = 42;
    let isGoldenLetter=false;
    if (isLetter === 1) {
      char = Math.random() < 0.5 ? Math.floor(Math.random() * 25 + 65) : Math.floor(Math.random() * 25 + 97);
    } else {
      if (Math.random() < 0.3) {
        char = Math.floor(Math.random() * 25 + 65)
      } else if (Math.random() < 0.6) {
        char = Math.floor(Math.random() * 25 + 97)
      } else {
        char = Math.floor(Math.random() * 9 + 48)
      }
    }
    if(goldenLetter === true){
      console.log("creating GoldenLetter been called")
      isGoldenLetter=true;
      goldenLetter=false;
      goldenLetterStarted=false;
    }
    letters.push({
      x,
      y,
      code: char,
      speedX: dX / norm * speed,
      speedY: dY / norm * speed,
      goldenLetter: isGoldenLetter
    });
  }
}

//handle what will happen when a letter touches the circle
function removeLetters(frames) {
  for (let l of letters) {
    if (intersects(l.x, l.y, letter.size, letter.size, center.x, center.y, center.radius, center.radius)) {
      //console.log("intersects happen letter = "+ String.fromCharCode(l.code));
      isGameOver()
      break;
    } else {
      l.x += l.speedX * frames;
      l.y += l.speedY * frames;
    }
  }
}

//check if gameisover
function isGameOver() {
  straightWin=0;
  if (live >= 1) {
    live--;
    resetLetters();
    if (score <= 0) {
      score = 0;
    }
  } else {
    gameOver()
  }
}

//handle the gameover case
function gameOver() {
  console.log("gameOver entered");
  clearInterval(goldeLetterInterval);
  letters = [];
  particles = [];
  setHighScore()
  window.cancelAnimationFrame(animation);
  closeAnimation=true;
  window.canvas.style.display = 'none'
  gameEnd.style.display = 'block'
}

function generateRandomRgbColor() {
  return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}

//check if the letter touches the circle
function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
}

//remove the given letter of i and increase score and push new values into particles
function type(i, l) {
  //console.log("removed letter = " + String.fromCharCode(letters[i].code));
  if(letters[i].goldenLetter === true){
    resetLetters()
  }else{
    letters.splice(i, 1);
    nextSpeed();
    nextLevel();
    activateGoldenLetter();
    if(getTime()-startTime > 30000){
      goldenLetterStarted=true;
      startTime=getTime();
    }
  }
  for (let j = 0; j < particle.total; j++) {
    let c = generateRandomRgbColor();
    particles.push({
      x: l.x,
      y: l.y,
      radius: particle.lowestRadius + Math.random() * (particle.highestRadius - particle.lowestRadius),
      color: 'rgba(' + c[0] + ', ' + c[1] + ', ' + c[2] + ', ' + particle.alpha + ')',
      speedX: particle.lowestSpeedX + Math.random() * (particle.highestSpeedX - particle.lowestSpeedX),
      speedY: particle.lowestSpeedY + Math.random() * (particle.highestSpeedY - particle.lowestSpeedY)
    });
  }
  straightWin++;
  if(straightWin >= easyHighStraights && lvlChecker === 0){
    increaseLive();
  }else if(straightWin >= mediumHighStraights && lvlChecker === 1){
    increaseLive();
  }else if(straightWin >= hardHighStraights && lvlChecker === 2){
    increaseLive();
  }

  if (lvlChecker === 0) {
    score++;
  } else if (lvlChecker === 1) {
    score += 2;
  } else {
    score += 3;
  }
}
//increase lives
function increaseLive(){
  if(live <3 ){
    live++;
  }
  straightWin=0;
}

//change speed
function nextSpeed() {
  
  if(score >= 10 && lvlChecker === 1 && level1===1){ //going from easy to medium 
    letter.lowestSpeed = letter.lowestSpeed < 1.6 ? (((score+1)-mediumScore) / 100) * 2 : 1.6;
    letter.highestSpeed = 1 + (((score+1)-mediumScore) / 100) * 2;
  }else if(score >= 10 && lvlChecker === 2 && level2 === 1){//going from medium to hard
    letter.lowestSpeed = letter.lowestSpeed < 1.6 ? (((score+1)-hardScore) / 100) * 2 : 1.6;
    letter.highestSpeed = 1 + (((score+1)-hardScore) / 100) * 2;
  }else {
    letter.lowestSpeed = letter.lowestSpeed < 1.6 ? (score / 100) * 2 : 1.6;
    //letter.lowestSpeed=(score/100)*2;
    letter.highestSpeed = 1 + (score / 100) * 2;
    //console.log("score now = " + score);
    //console.log("lowest speed = " + letter.lowestSpeed);
    //console.log("highest speed = " + letter.highestSpeed);
  }
}

//Popup function
function popupmsg(x) {
	const jsFrame = new JSFrame();
    jsFrame.showToast({
        html: x , align: 'top', duration: 2000
    });
}

//change level
function nextLevel() {
  if (score >= mediumScore && lvlChecker === 0) {
    popupmsg("Medium level is entered");
    lvlChecker = 1;
    resetLetters();
    mediumLevel();
  } else if (score >= hardScore && lvlChecker === 1) {
    lvlChecker = 2;
    popupmsg("Hard level is entered");
    resetLetters();
    hardLevel();
  }
}

//check if the entered key is in the letters in the screen or not 
//if in the screen call type else minus score
function keyDownHandler(e) {
  let matched = -1;
  let extendedNum = false;
  for (let i = letters.length - 1; i >= 0; i--) {
    let l = letters[i];
    console.log("caplk state " + e.getModifierState("CapsLock"));
    if (caseSensitive) {
      console.log("case sensetive entered " + e.keyCode);
      console.log("shift key = " + e.shiftKey)
      if (e.shiftKey) {
        if (e.keyCode === l.code) {
          console.log("equality 1 entered");
          matched = 1;
          type(i, l);
          return;
        } else {
          matched = e.keyCode === 16 ? 2 : 0;
        }
      } else {
        if (e.getModifierState("CapsLock")) { //IF CAPLK IS opened
          console.log("caplk is opened");
          extendedNum = e.keyCode >= 96 && e.keyCode <= 105 ? true : false;
          if (extendedNum) { //if its an extended nums
            if (e.keyCode - 48 === l.code) {
              matched = 1;
              console.log("equality 5 entered");
              type(i, l);
              return;
            }
          } else { //if not
            if (e.keyCode === l.code) {
              matched = 1;
              console.log("equality 2 entered");
              type(i, l);
              return;
            }
          }
        } else {
          console.log("caplk is noooot opened");
          extendedNum = e.keyCode >= 96 && e.keyCode <= 105 ? true : false;
          console.log("extended key = " + extendedNum);
          if (onlyLetters === 0 && ((e.keyCode >= 48 && e.keyCode <= 57) || extendedNum)) {
            e.keyCode = extendedNum ? e.keyCode - 48 : e.keyCode;
            console.log("new keycode = " + e.keyCode);
            if (extendedNum) {
              if (e.keyCode - 48 === l.code) {
                matched = 1;
                console.log("equality 5 entered");
                type(i, l);
                return;
              }
            } else {
              if (e.keyCode === l.code) {
                matched = 1;
                console.log("equality 4 entered");
                type(i, l);
                return;
              }
            }
          } else {
            if (e.keyCode != 20 && !(e.keyCode < 48) && !(e.keyCode >= 48 && e.keyCode <= 57)) { //check if it's not a Caplk or arrows
              if (e.keyCode + 32 === l.code) {
                matched = 1;
                console.log("equality 3 entered");
                type(i, l);
                return;
              }
            }
          }
        }
      }
    } else {
      console.log("not case sensetive entered " + e.keyCode);
      extendedNum = e.keyCode >= 96 && e.keyCode <= 105 ? true : false;
      if (!(e.keyCode < 48) && !(e.keyCode >= 48 && e.keyCode <= 57) && !extendedNum) { //check if it's not arrows
        if (e.keyCode === l.code || e.keyCode + 32 === l.code) {
          matched = 1;
          type(i, l);
          return;
        }
      }
    }
  }
  console.log("matched " + matched);
  if (!e.shiftKey) {
    console.log("it's not a shift");
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (!(e.keyCode === 20) && matched == -1) {
        console.log("it's not a number");
        console.log("it's not a letter");
        console.log("it's not a CAPLK");
        minusScore();
        if (score < 0) {
          isGameOver()
        }
      }
    }
  } else if (e.shiftKey && !matched) {
    minusScore();
    if (score < 0) {
      isGameOver()
    }
  }
}

//to minus score based on the level
function minusScore() {
  straightWin=0;
  if (lvlChecker === 0) {
    score--;
  } else if (lvlChecker === 1) {
    score -= 2;
  } else {
    score -= 3;
  }
}

//set highScore for the character
function setHighScore() {
  if (playingChar == "ice") {
    if (score > iceHighScore) {
      localStorage.setItem("ice", score);
      iceHighScore = score;
      console.log("ice high Score = " + iceHighScore);
      gameEnd.src = "images/bestscore.png";
      window.canvas.style.display = 'none'
      gameEnd.style.display = 'block'
    }
  } else {
    if (score > fireHighScore) {
      localStorage.setItem("fire", score);
      fireHighScore = score;
      console.log("Fire high Score = " + fireHighScore);
      gameEnd.src = "images/bestscore.png";
      window.canvas.style.display = 'none'
      gameEnd.style.display = 'block'
    }
  }
}

function fastRound(){
  resetLetters();
}

//clear the letter and particles array
function resetLetters(){
  window.letters = [];
  window.particles = [];  
}

function activateGoldenLetter(){
  if(score > 20){
    goldeLetterInterval=setInterval(startGoldenLetter,Math.floor(Math.random()*30000 + 10000));
  }
}

function startGoldenLetter(){
  if(goldenLetterStarted){
    goldenLetter=true;
  }
}

//handle the size of the canavs when screen is resized
function resizeHandler() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
}