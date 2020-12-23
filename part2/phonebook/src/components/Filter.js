import React from "react";

const Filter = ({ value, handleChange }) => {
	return (
		<div>
			filter shown with:{" "}
			<input value={value} onChange={handleChange}></input>
		</div>
	);
};

export default Filter;
