import { log } from "console"

describe('Note app', function() {
  beforeEach(function() {
    cy.login({ username: 'ccol69', password: 'thisismypassword'})
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.login({ username: 'ccol69', password: 'thisismypassword'})
  })

  it('login fails with wrong password', function() {
    const incorrectCredentials = {
      username: 'ccol69',
      password: 'wrongpassword'
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('BACKEND')}/login`, 
      body: incorrectCredentials,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.include('invalid username or password')
    });
  })

  describe('when a user is logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ccol69', password: 'thisismypassword' })
    })

    it('a new note can be created', function() {
      cy.createNote({
        content: 'I am a note created by Cypress',
        important: true
      })
      cy.contains('I am a note created by Cypress')
    })

    describe('and notes exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'another Cypress note!!!', important: true })
        cy.createNote({ content: 'AND another Cypress note!!!', important: true })
        cy.createNote({ content: 'AND AND another Cypress note!!!', important: true })
      })
      
      it('can be made not important', function() {
        cy.contains('make not important').click()
        cy.get('make not important').should('not.exist')
      })

      it('can be made important', function() {
        cy.contains('make not important').click()
        cy.contains('show all').click()
        cy.contains('make important').click()
        cy.contains('show important').click()
        cy.contains('a note created by cypress')
      })
    })
  })
})
