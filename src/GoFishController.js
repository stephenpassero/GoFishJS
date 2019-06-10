class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const loginView = new LoginView(this.startGame.bind(this))
    loginView.render(this.container())
  }

  startGame(name) {
    const player = '' // new Player
    const game = '' // new Game
    const view = '' // new GameView
    // view.draw(this.container())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
