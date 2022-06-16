import './style.css';
import Game from './modules/Game.js';
import sort from './modules/Sort.js';

let gameId = '';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const form = document.querySelector('#score-form');
const refreshBtn = document.querySelector('#form-refresh');
const scoresData = document.querySelector('.recent-score ul');
const game = new Game(baseUrl);

const checkLocalStorage = async () => {
  const testGameId = localStorage.getItem('gameId');
  if (!testGameId) {
    const response = await game.createGame();
    gameId = response.slice(14, 34);
    localStorage.setItem('gameId', gameId);
  } else {
    gameId = testGameId;
  }
};
checkLocalStorage();
const refreshPage = async () => {
  scoresData.innerHTML = '';
  let leaderboardResults = await game.getGames(gameId);
  leaderboardResults = sort(leaderboardResults);
  leaderboardResults.forEach((result, index) => {
    if (index === 0) {
      scoresData.innerHTML += `<li class="first">
        <p class="rank ">${index + 1}</p>
        <p class="name">${result.user}</p>
        <p class="score">${result.score}</p>
    </li>`;
    } else {
      scoresData.innerHTML += `<li>
        <p class="rank">${index + 1}</p>
        <p class="name">${result.user}</p>
        <p class="score">${result.score}</p>
    </li>`;
    }
  });
};

// Event Listener

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.querySelector('#form-name');
  const score = document.querySelector('#form-score');
  const response = await game.addNewGame(
    { user: name.value, score: score.value },
    gameId,
  );
  name.value = '';
  score.value = '';
  const result = document.querySelector('.add-result');
  result.style.display = 'block';
  result.textContent = response;
  setTimeout(() => {
    result.style.display = 'none';
    refreshPage();
  }, 3000);
});

refreshBtn.addEventListener('click', async () => {
  const boardResult = await game.getGames(gameId);
  refreshPage(boardResult);
});

refreshPage();
