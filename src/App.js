import React, { useState, useEffect } from "react";

function App() {
	const [squares, setSquares] = useState(Array(9).fill(""));
	const [turn, setTurn] = useState("x");       
	const [winner, setWinner] = useState("");
	const [results, setResults] = useState({playerX: 0, playerO: 0})

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
		if (squares.every(square => square !== "") && !winner) {
			setWinner("DRAW")
		}
		WIN_COMBINATIONS.forEach(combination => {
			if (combination.every(item => squares[item] === "x")) {
				setResults(prevResults => ({...prevResults, playerX: prevResults.playerX + 1}))
				setWinner("Player X")
			} else if (combination.every(item => squares[item] === "o")) {
				setResults(prevResults => ({ ...prevResults, playerO: prevResults.playerO + 1 }))
				setWinner("Player O")
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

	function playAgain() {
		setWinner("")
		setTurn("x")
		setSquares(Array(9).fill(""))
	}
	
	const squaresElements = squares.map((item, index) =>
		<div
			key={index}
			className={["square", item === "x" && "with-x", item === "o" && "with-o"].filter(Boolean).join(" ")}
			onClick={() => {fillSquare(index)}}
		></div>
	)
	
	const underGameField = () => (
		winner ?
		<div className="win-block">
			<p className="congratulation-text">
				{winner === "DRAW" ? "It's a DRAW!" : `${winner} wins!`}
			</p>
			<button
				className="button-play-again"
				onClick={playAgain}
			>play again</button>
				<p className="reset-text">&#42;refresh the page to reload the results</p>
		</div>
		:
		<p className="turn-text">Player {turn.toUpperCase()}'s turn!</p>
	)

	return (
		<div className="app">
			<div className="results-container">
				<div className="result-block">
					<p>Player X<br/><span>{results.playerX}</span></p>
				</div>
				<div className="result-block">
					<p>Player O<br/><span>{results.playerO}</span></p>
				</div>
			</div>
			<div className="squares-container">
				{squaresElements}
			</div>
			{underGameField()}
		</div>
	);
}

export default App;
