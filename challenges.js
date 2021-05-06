/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var score, activePlayer, roundScore, gamePlaying;

init();

var lastDice;

// event listener related to click on 'roll dice' 

document.querySelector('.btn-roll').addEventListener('click' , function() {
    if (gamePlaying){
     // 1. Generate random number
    
    var dice_0 = Math.floor(Math.random() * 6) + 1;
    var dice_1 = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the result
    
    var diceDOM_0 = document.querySelector('.dice-0');
    var diceDOM_1 = document.querySelector('.dice-1');
    diceDOM_0.style.display='block' ;
    diceDOM_1.style.display='block' ;
    diceDOM_0.src = 'dice-' + dice_0 +'.png' ;
    diceDOM_1.src = 'dice-' + dice_1 +'.png' ;
    
    // 3. Update the score IF the rolled number was NOT a 1
    
    if(lastDice === 6 && (dice_0 + dice_1) === 6 ) {
        // Player loses his entire score
        score[activePlayer] = 0 ;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer] ;
        nextPlayer();
        
    } else if (dice_0 !== 1 && dice_1 !== 1) {
        //Add score 
        roundScore = roundScore + dice_0 + dice_1;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        //Next player
        nextPlayer();
        
    }  
        
    // 4. store the last dices
    lastDice = dice_0 + dice_1;    
        
    }
     
});

// event listener related to click on 'hold' 

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      //Add Current score to Global score 
    score[activePlayer] += roundScore ;
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer] ;
        
    // the winning score input value
    var input = document.querySelector('.final-score').value;
    var winningScore;
    
    if(input) {
        winningScore = input ;
    } else {
        winningScore = 100 ;
    }
    
    //Check if the player won the game
    if (score[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice-0').style.display= 'none';
        document.querySelector('.dice-1').style.display= 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
        gamePlaying = false;
    } else {
        //Next player
        nextPlayer();
    }  
    }
    
});

// Don't repeat yourself ==> next player function
function nextPlayer() {
    
    //Select next player + set the round score to 0 
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        // Switch the active player
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // hide the dice 1
        document.querySelector('.dice-0').style.display='none';
        document.querySelector('.dice-1').style.display='none';
};

//new game event listener 
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice-0').style.display='none' ;
    document.querySelector('.dice-1').style.display='none' ;

    // set all the values to zero

    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';

    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  

}














