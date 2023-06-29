import React, { useState, useEffect } from "react";

function App() {
	const [squares, setSquares] = useState(Array(9).fill(""));
	const [turn, setTurn] = useState("x");
	const [winner, setWinner] = useState(false);

	useEffect(() => {
		checkWin()
	}, [squares])

	const WIN_COMBINATIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6]
	]
	
	function checkWin() {
		WIN_COMBINATIONS.forEach(combination => {
			if (combination.every(item => squares[item] === "x") ||
				combination.every(item => squares[item] === "o")
			) {
				setWinner(true)
			}
		})
	}

	function fillSquare(id) {
		!winner &&
		setSquares(prevSquares => prevSquares.map((square, index) => {
			if (index === id && square === "") {
				if (turn === "x") {
					square = "x"
					setTurn("o")

				} else {
					square = "o"
					setTurn("x")
				}
			}
			return square
		}))
	}
	
	const squaresElements = squares.map((item, index) =>
		<div
			key={index}
			className={["square", item === "x" && "with-x", item === "o" && "with-o"].filter(Boolean).join(" ")}
			onClick={() => {fillSquare(index)}}
		></div>
	)

	return (
		<div className="app">
			<div className="squares-container">
				{squaresElements}
			</div>
		</div>
	);
}

export default App;
