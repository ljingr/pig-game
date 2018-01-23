/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();

//document.querySelector('.btn-roll').addEventListener('click',btn); // call back function: another function call it for us. do not use ()
document.querySelector('.btn-roll').addEventListener('click',function() {
  // anoymous function can not be used anywhere else
  if (gamePlaying) {
    // 1. random number
    var dice = Math.ceil(Math.random()*6);
    // 2. display the results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice +'.png';

    // 3. update the score onlyif the dice is not equal to 1
    if (dice > 1) {
      //add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next Player
      nextPlayer();
    }
  }


});

document.querySelector('.btn-hold').addEventListener('click',function() {
  if (gamePlaying) {
    // 1. add current score to global score
    scores[activePlayer] += roundScore;

    // 2. update the ui interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. check if player won the Game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-'+activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer =  1 : activePlayer = 0; // short version of if else
  roundScore = 0;
  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;

  document.querySelector('.player-0-panel').classList.toggle('active');// remove if exist, add if not
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';//quick than querySelector
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
