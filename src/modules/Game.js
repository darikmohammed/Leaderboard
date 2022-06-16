class Game {
  constructor(baseUrl) {
    this.gameName = 'Music Billboard';
    this.baseUrl = baseUrl;
  }

  createGame = async () => {
    await fetch(`${this.baseUrl}/games`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.gameName,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  addNewGame = async (newData, gameId) => {
    const response = await fetch(`${this.baseUrl}/games/${gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return data.result;
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    // return {result: 'Leaderboard score created correctly.'}
  };

  getGames = async (gameId) => {
    const response = await fetch(`${this.baseUrl}/games/${gameId}/scores/`);
    const data = await response.json();
    return data.result;
    //   .then((response) => response.json())
    //   .then((json) => json.result);
  };
}

module.exports = Game;
