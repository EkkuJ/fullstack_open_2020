const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs) return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, cur) => ({ likes: prev.likes + cur.likes })
  const res = blogs.reduce(reducer, { likes: 0 })
  return res.likes
}

const favoriteBlog = (blogs) => {
  const favorite = _.maxBy(blogs, (blog) => blog.likes)
  if (favorite) {
    return _.pick(favorite, ['title', 'author', 'likes'])
  } else return undefined
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const countAr = _.toPairsIn(counts)
  const most = _.maxBy(countAr, _.last)
  if (most) {
    return { author: most[0], blogs: most[1] }
  } else return undefined
}

const mostLikes = (blogs) => {

  const likes = _(blogs)
    .groupBy('author')
    .map((group, author) => ({
      author: author,
      likes: _.sumBy(group, 'likes')
    }))
    .value()

  const res = _.maxBy(likes, 'likes')

  if (res) {
    return { author: res.author, likes: res.likes }
  } else return undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
