import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value, postfix }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}{postfix}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = all > 0 ? (good - bad) / all : 0;
	const percOfGood = all > 0 ? (good * 100) / all : 0;

	if (all === 0) {
		return <div>No feedback given</div>;
	}

	return (
		<table>
			<tbody>
				<Statistic text="good" value={good} />
				<Statistic text="neutral" value={neutral} />
				<Statistic text="bad" value={bad} />
				<Statistic text="all" value={all} />
				<Statistic text="average" value={average} />
				<Statistic text="positive" value={percOfGood} postfix="%" />
			</tbody>
		</table>
	);
};

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<div className="buttons">
				<Button text="good" handleClick={() => setGood(good + 1)} />
				<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
				<Button text="bad" handleClick={() => setBad(bad + 1)} />
			</div>
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
