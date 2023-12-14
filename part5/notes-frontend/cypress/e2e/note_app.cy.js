describe('Note app', function() {
  beforeEach(function() {
    cy.login({ username: 'ccol420', password: 'thisismypassword'})
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.login({ username: 'ccol420', password: 'thisismypassword'})
  })

  it.only('login fails with wrong password', function() {
    cy.login({ username: 'ccol420', password: 'NOTTHEPASSWORD'})
      .then((response) => {
        expect(response.status).to.eq(401)
      })
    cy.contains('Invalid Credentials')
    cy.get('.error').contains('Invalid Credentials')

    cy.contains('Chase Collins logged in!').should('not.exist')
  })

  describe('when a user is logged in', function() {
    beforeEach(function() {
      cy.request()
    })

    it('a new note can be created', function() {
      cy.contains('New note').click()
      cy.get('[placeholder="enter note here"]').type('a note created by cypress');
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and note exists', function() {
      beforeEach(function() {
        cy.contains('New note').click()
        cy.get('[placeholder="enter note here"]').type('a note created by cypress');
        cy.contains('save').click()
        cy.contains('a note created by cypress')
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
