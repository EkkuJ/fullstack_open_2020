const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a unique username', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'EkkuJ',
      name: 'Ekku Jokinen',
      password: 'Secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is taken', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'root',
      name: 'Same User',
      password: 'Secretaswell',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'ro',
      name: 'Same User',
      password: 'Secretaswell',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username`')
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')


    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'fresh22',
      name: 'Fresh User',
      password: 'Sh',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.error.text).toContain('Password must be at least 3')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})