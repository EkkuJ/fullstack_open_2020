import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  const course = props.course

return <h1>{course}</h1>
}

const Part = (props) => {
  const part = props.part
  const exercises = props.exercises

return <p>{part} {exercises}</p>
}

const Content = (props) => {
  const part1 = props.part1
  const exercises1 = props.exercises1
  const part2 = props.part2
  const exercises2 = props.exercises2
  const part3 = props.part3
  const exercises3 = props.exercises3

  return (
    <div>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </div>
  )
}

const Total = () => {

}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}/>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))