import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const updatedAnecdote = action.updatedAnecdote
      return state.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(votedAnecdote)
    dispatch({
      type: 'VOTE',
      updatedAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
