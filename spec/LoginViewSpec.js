/* eslint no-undef: 0 */
describe('LoginView', () => {
  // Should I split this into two tests?
  it('calls the function passed in with the player\'s name and the number of players', () => {
    let calledWith
    let totalPlayers
    const onLogin = (name, numOfPlayers) => {
      calledWith = name
      totalPlayers = numOfPlayers
    }
    const loginView = new LoginView(onLogin)
    const container = document.createElement('div')
    document.body.appendChild(container)
    loginView.render(container)
    loginView.nameInput().value = 'A Cool Person'
    loginView.totalPlayersInput().value = 5
    loginView.submitButton().click()
    expect(calledWith).toEqual('A Cool Person')
    expect(totalPlayers).toEqual(5)
    container.remove()
  })
})
