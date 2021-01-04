const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const getTestToken = async () => {
  const user = await User.findOne({})
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects
    .map((blog) => blog.save())
    .concat(user.save())
  await Promise.all(promiseArray)
})

describe('when some notes are saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map((b) => b.title)
    expect(contents).toContain('React patterns')
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      id: '5a422a851b54a676234d17e2',
      title: 'Blog-list testing',
      author: 'Ekku Jokinen',
      url: 'https://testing.com',
      likes: 0,
    }

    const token = await getTestToken()

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    const blogsAtEnd = result.body
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('Blog-list testing')
  })

  test('returns 400 Bad Request when title is not defined', async () => {
    const newBlog = {
      author: 'Ekku Jokinen',
      url: 'https://testing.com',
      likes: 0,
    }

    const token = await getTestToken()

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('returns 400 Bad Request when url is not defined', async () => {
    const newBlog = {
      title: 'Testing is fun',
      author: 'EkkuJ',
      likes: 0,
    }

    const token = await getTestToken()

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('returns 401 Unauthorized when token is not defined', async () => {
    const newBlog = {
      title: 'Testing is fun',
      author: 'EkkuJ',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('likes are defaulted to 0', async () => {
    const newBlog = {
      title: 'How to get initial likes?',
      author: 'Ekku Jokinen',
      url: 'https://testing.com',
    }

    const token = await getTestToken()

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    const blogsAtEnd = result.body

    const postedBlog = blogsAtEnd.find(
      (blog) => blog.title === 'How to get initial likes?'
    )
    expect(postedBlog.likes).toBeDefined()
    expect(postedBlog.likes).toBe(0)
  })
})

describe('blog resource has', () => {
  test('an id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    const blogToInspect = blogs[0]

    expect(blogToInspect.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
