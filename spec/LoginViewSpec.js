/* eslint no-undef: 0 */
describe('LoginView', () => {
  it('calls the function passed in with the player\'s name and the number of players', () => {
    const onLogin = (name, numOfPlayers) => {
      calledWith = name
      totalPlayers = numOfPlayers
    }
    const loginView = new LoginView(onLogin)
    const container = document.createElement('div')
    document.body.appendChild(container)
    loginView.render(container)
    loginView.nameInput().value = 'A Cool Person'
    loginView.totalPlayersInput().value = 4
    loginView.submitButton().click()
    expect(calledWith).toEqual('A Cool Person')
    expect(totalPlayers).toEqual(4)
    container.remove()
  })
})
