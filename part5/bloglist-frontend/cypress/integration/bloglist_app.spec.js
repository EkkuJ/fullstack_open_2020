describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ekku Test Jokinen',
      username: 'ekkutest',
      password: 'Secret',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('ekkutest')
      cy.get('#input-password').type('Secret')
      cy.get('#login-button').click()

      cy.contains('Logged in as ekkutest')
      cy.contains('logout')
      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('wrong_username')
      cy.get('#input-password').type('Somethingtrivial')
      cy.get('#login-button').click()

      cy.contains('Wrong username and/or password')
      cy.contains('Log in to application')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ekkutest', password: 'Secret' })
    })

    it('A blog can be created', function () {
      cy.get('#toggle-button').click()
      cy.get('#input-title').type('Generic blog title')
      cy.get('#input-author').type('Test Author')
      cy.get('#input-url').type('www.google.com')
      cy.get('#submit-blog').click()

      cy.contains('Generic blog title')
      cy.contains('by Test Author')
    })
  })

  describe('When a blog is posted', function () {
    beforeEach(function () {
      cy.login({ username: 'ekkutest', password: 'Secret' })
      cy.postBlog({ title: 'blog1', author: 'author1', url: 'www.url1.com' })
    })

    it('can like a blog post', function () {
      cy.get('.detail-button').click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()

      cy.contains('Likes: 3')
    })

    it('can remove a blog post', function () {
      cy.get('.detail-button').click()
      cy.get('#remove-button').click()

      cy.contains('Removed blog1 by author1')
      cy.get('#root').should('not.contain', 'blog1')
    })
  })

  describe.only('When 3 blogs are posted', function () {
    beforeEach(function () {
      cy.login({ username: 'ekkutest', password: 'Secret' })
      cy.postBlog({ title: 'blog1', author: 'author1', url: 'www.url1.com' })
      cy.postBlog({ title: 'blog2', author: 'author2', url: 'www.url2.com' })
      cy.postBlog({ title: 'blog3', author: 'author3', url: 'www.url3.com' })
    })
    it('sorts blogs according to likes', function () {
      cy.get('.detail-button').click({ multiple: true })
      cy.get('.like-button:first').click()
      cy.get('.like-button:last').click()
      cy.get('.like-button:last').click()

      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'blog3')
      cy.get('.blog').eq(1).should('contain', 'blog1')
      cy.get('.blog').eq(2).should('contain', 'blog2')
    })
  })
})
