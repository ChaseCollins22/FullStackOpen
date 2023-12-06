describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('input:first').type('ADMIN')
    cy.get('#password').type('Password101')
    cy.get('#login-btn').click()
    cy.contains('Administrator logged in!')
  })

  describe('when a user is logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('input:first').type('ADMIN')
      cy.get('#password').type('Password101')
      cy.get('#login-btn').click()
    })

    it('a new note can be created', function() {
      cy.contains('New note').click()
      cy.get('[placeholder="enter note here"]').type('a note created by cypress');
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
