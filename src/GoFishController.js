/* eslint no-undef: 0 */
class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const loginView = new LoginView(this.startGame.bind(this))
    loginView.render(this.container())
  }

  startGame(name, numOfPlayers) {
    const player = '' // new Player
    const game = '' // new Game
    // Pass the bot names from game to the game view
    // Game will pass the bot names into the game view
    const view = new GameView(name, 'botNames') // new GameView
    view.render(this.container())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
