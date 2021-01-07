import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <div>
        has {anecdote.votes} votes <button onClick={vote}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 3)
  }

  return (
    <>
      <h2>Most popular anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote)}
        />
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  let shownAnecdotes = state.anecdotes
  if (state.filter !== '') {
    shownAnecdotes = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase()),
    )
  }
  return { anecdotes: shownAnecdotes.sort((a, b) => b.votes - a.votes) }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)
export default ConnectedAnecdoteList
