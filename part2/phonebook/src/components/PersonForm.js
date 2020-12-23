import React from "react";

const PersonForm = ({
	nameValue,
	numberValue,
	handleSubmit,
	handleNameChange,
	handleNumberChange,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input value={nameValue} onChange={handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input value={numberValue} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
