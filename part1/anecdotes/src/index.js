import React, { useState } from "react";
import ReactDOM from "react-dom";

const indexOfMax = (arr) => {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}

	return maxIndex;
};

const App = ({ anecdotes }) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(6).fill(0));

	const mostVoted = anecdotes[indexOfMax(votes)];

	const handleNext = () => {
		console.log(votes);
		const indx = Math.floor(Math.random() * 6);
		setSelected(indx);
	};

	const handleVote = () => {
		const votesCopy = [...votes];
		votesCopy[selected] += 1;
		setVotes(votesCopy);
		console.log(votes);
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote{votes[selected] === 1 ? "" : "s"}</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleNext}>next anecdote</button>
			<h1>Most voted anecdote</h1>
			{mostVoted}
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
