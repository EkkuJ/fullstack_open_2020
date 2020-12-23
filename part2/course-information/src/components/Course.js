import React from 'react'

const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Total = ({ parts }) => {
	const sum = parts.map(part => part.exercises)
		.reduce((sum, part) => {
			return sum + part
	  	})
	return <h4>Number of exercises {sum}</h4>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course