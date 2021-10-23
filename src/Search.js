import React from "react";

function Search({ term, searchKeyword }) {
	function handleSearch(e) {
		searchKeyword(e.target.value);
	}
	return (
		<div className="center">
			<input
				className="input-field mb-3"
				type="text"
				value={term}
				placeholder="Enter the book name"
				onChange={handleSearch}
			></input>
		</div>
	);
}

export default Search;