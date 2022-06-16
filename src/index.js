import './style.css';
import Game from './modules/Game';

const gameId = 'O6B5TxbYyAOJubOKEvtu';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const form = document.querySelector('#score-form');
const refreshBtn = document.querySelector('#form-refresh');
const scoresData = document.querySelector('.recent-score ul');
const game = new Game(baseUrl);

// game.addNewGame({ user: 'John Doe', score: 42 }, gameId);
// game.getGames(gameId);
const refreshPage = (leaderboardResults) => {
  // sort the leaderboardResults
  scoresData.innerHTML = '';
  console.log(leaderboardResults);
  leaderboardResults.forEach((result) => {
    console.log(result);
  });
};
// Event Listener
form.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#form-name');
  const score = document.querySelector('#form-score');
  game.addNewGame({ user: name.value, score: score.value });
  name.value = '';
  score.value = '';
  // refresh the list
});

refreshBtn.addEventListener('click', () => {
  const boardResult = game.getGames(gameId);
  refreshPage(boardResult);
});

const initleaderBoardReults = game.getGames(gameId);
refreshPage(initleaderBoardReults);
