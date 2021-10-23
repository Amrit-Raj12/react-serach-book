import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import { Accordion } from 'react-bootstrap';

function App() {
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch("https://openlibrary.org/search.json?author=tolkien")
			.then((response) => response.json())
			.then((data) => setData(data))
			.then(() => setLoading(false))
			.catch(setError);
	}, []);

	if (loading) {
		return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	if (!data.docs) {
		return null;
	}

	let x = data.docs;
  x.length = 5;
	let y = data.docs;
  y.length = 5;

  let cnt=0;

	const searchHandler = (search) => {
		setSearch(search);
		if (search !== "") {
			const newBooksList = y.filter((i) => {
				return Object.values(i)
					.join(" ")
					.toLowerCase()
					.includes(search.toLowerCase());
			});
			setSearchResults(newBooksList);
		} else {
			setSearchResults(y);
		}
	};

	console.log(searchResults);

	return (
		<div className="container">
      <div className="bg-dark" fixed="top">
      <h3 className="text-white d-flex justify-content-center">Search Book</h3>
      </div>
			<Search term={search} searchKeyword={searchHandler} style={{marginBottom:'10px'}} />
			{search.length < 1  ? (
				<Accordion className="list">
					{x.map((item, i) => {
              item.text.length = 50;
						return (
              <Accordion.Item eventKey={cnt++}>
							<Accordion.Header key={i} className="list-item">
								
								{item.title}
							</Accordion.Header>
              <Accordion.Body style={{width:'80%'}}>{item.text}</Accordion.Body>
              </Accordion.Item>
						);
					})}
				</Accordion>
			) : (
				<Accordion className="list">
					{searchResults.map((item, i) => {
            item.text.length = 50;
						return (
              <Accordion.Item eventKey={cnt++}>
							<Accordion.Header key={i} className="list-item">
								
								{item.title}
							</Accordion.Header>
              <Accordion.Body>{item.text}</Accordion.Body>
              </Accordion.Item>
						);
					})}
				</Accordion >
			)}
      <div className="bg-dark" fixed="bottom">
      <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'white'}}>
    © 2021 Copyright:
    <a className="text-reset fw-bold" href="https://github.com/Amrit-Raj12"> Amrit-Raj</a>
  </div>
      </div>
		</div>
	);
}
export default App;