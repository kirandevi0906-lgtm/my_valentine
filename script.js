// moments

const moments = document.querySelectorAll(".moment");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.3});

moments.forEach(moment=>{
  observer.observe(moment);
});

// unlock

function unlock(){

let pass=document.getElementById("pass").value;

if(pass==="04112024"){
document.getElementById("journeyPage").style.transform="translateX(0)";
}else{
document.getElementById("error").innerText="Wrong password 😜";
}
}


function nextPage(id){

document.querySelectorAll(".page").forEach(page=>{
page.style.transform="translateX(100%)";
});

document.getElementById(id).style.transform="translateX(0)";
}


function explode(){
document.getElementById("boomBtn").style.display="none";
document.getElementById("boomContent").style.display="block";
}


// game

function runAway(btn){
btn.style.position="absolute";
btn.style.top=Math.random()*80+"%";
btn.style.left=Math.random()*80+"%";
}
const board = document.getElementById("board");
const message = document.getElementById("message");

let cells = Array(9).fill(null);
let gameOver = false;

const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function createBoard(){
board.innerHTML="";

cells.forEach((cell,index)=>{
const div=document.createElement("div");
div.classList.add("cell");
div.textContent=cell;
div.addEventListener("click",()=>playerMove(index));
board.appendChild(div);
});
}

function playerMove(index){
if(cells[index] || gameOver) return;

cells[index]="❤️";
checkWinner();

if(!gameOver){
setTimeout(computerMove,400);
}

createBoard();
}

function computerMove(){

let empty=cells
.map((v,i)=>v===null?i:null)
.filter(v=>v!==null);

if(!empty.length) return;

let rand=empty[Math.floor(Math.random()*empty.length)];
cells[rand]="😈";

checkWinner();
createBoard();
}


function checkWinner(){

for(let pattern of winPatterns){

let [a,b,c] = pattern;

if(cells[a] && cells[a]===cells[b] && cells[a]===cells[c]){

gameOver = true;

// ❤️ PLAYER WON
if(cells[a] === "❤️"){

message.textContent="You won my heart ❤️ Unlocking surprise...";

// 🔥 SMALL DELAY FOR DRAMA
setTimeout(()=>{

nextPage('proposalPage');

},1200);

}else{

message.textContent="Computer won 😜 Try again!";
}

return;
}
}

// DRAW
if(!cells.includes(null)){
message.textContent="Draw 😅 Play again!";
gameOver=true;
}
}


function resetGame(){
cells=Array(9).fill(null);
gameOver=false;
message.textContent="";
createBoard();
}

// 🔥 create board when page loads
createBoard();

// finalpage

function openFinalPage(){
    nextPage('finalLovePage');

    let music = document.getElementById("loveMusic");
    music.volume = 0.2; // halka music
    music.play();
}

