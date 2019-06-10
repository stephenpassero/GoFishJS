/* eslint no-undef: 0 */
describe('LoginView', () => {
  it('calls the function passed in with the player\'s name', () => {
    let calledWith
    const onLogin = (name) => { calledWith = name }
    const loginView = new LoginView(onLogin)
    const container = document.createElement('div')
    document.body.appendChild(container)
    loginView.render(container)
    loginView.nameInput().value = 'A Cool Person'
    loginView.submitButton().click()
    expect(calledWith).toEqual('A Cool Person')
    container.remove()
  })
})
