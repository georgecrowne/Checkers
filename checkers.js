// Define the board
const board = [
	null,0,null,1,null,2,null,3,
	4,null,5,null,6,null,7,null,
	null,8,null,9,null,10,null,11,
	null,null,null,null,null,null,null,null,
	null,null,null,null,null,null,null,null,
	12,null,13,null,14,null,15,null,
	null, 16,null,17,null,18,null,19,
	20,null,21,null,22,null,23,null
]

// Define the cells and each players pieces
let cells = document.querySelectorAll("td");
let pieces = document.querySelectorAll("p");
var onePieces = []
var twoPieces = []
for (let i = 0; i < pieces.length; i++) {
	if (i < 12) {
		twoPieces.push(pieces[i])
	}
	else {
		onePieces.push(pieces[i])
	}
}

// Setup first players turn and initial scores
let turn = 1;
let oneScore = 12;
let twoScore = 12;


// Allow the right pieces to be clicked (player 1 if turn = 1 and player 2 if turn = 2)
function givePiecesEventListeners() {
	if (turn == 1) {
		for (let i = 0; i < onePieces.length; i++) {
			onePieces[i].onclick = getPiece(onePieces[i]);
		}
	}
	else {
		for (let i = 0; i < twoPieces.length; i++) {
			twoPieces[i].onclick = getPiece(twoPieces[i]);
		}
	}
}

// Selected a piece and unselect other pieces
function getPiece(piece) {
	return function() {
		// already selected
		if (piece.classList.contains("selectedPiece")) {
			if (turn == 1){
				piece.classList.add("one")
			}
			else {
				piece.classList.add("two")
			}
			piece.classList.remove("selectedPiece")
			for (let i = 1; i < board.length; i++) {
				if (!cells[i].classList.contains("null")) {
					cells[i].style.backgroundColor = "#BA7A3A"
					cells[i].onclick = null
				}
			}
		}

		else {
			// unselect all others
			var lastSelected = document.getElementsByClassName("selectedPiece");
			for (let i = 0; i < lastSelected.length; i++) {
				if (turn == 1) {
					lastSelected[i].classList.add("one")
				}
				else {
					lastSelected[i].classList.add("two")
				}
				lastSelected[i].classList.remove("selectedPiece")
			}
			for (let i = 0; i < cells.length; i++) {
				if (!cells[i].classList.contains("null")) {
					cells[i].style.backgroundColor = "#BA7A3A"
					cells[i].onclick = null
				}
			}

			//select clicked piece
			if (turn == 1) {
				if (piece.classList.contains("selectedPiece")) {
					piece.classList.add("one")
					piece.classList.remove("selectedPiece")
				}
				else {
					piece.classList.remove("one")
					piece.classList.add("selectedPiece");
				}			
				
			}
			else {
				if (piece.classList.contains("selectedPiece")) {
					piece.classList.add("two")
					piece.classList.remove("selectedPiece")
				}
				else {
					piece.classList.remove("two")
					piece.classList.add("selectedPiece");
				}			
				
			}
			showAvailableCells(piece)
		}
	}
}


function showAvailableCells(piece) {
	for (let i = 1; i < board.length; i++) {
		if (board[i] == piece.id) {

			if (turn == 1) {
				// see if cell is on edge
				if (i % 8 == 0) {
					if (i-7 >= 0) {
						if (isCellOccupied(i-7) == 0) {
							cells[i-7].style.backgroundColor = "green"
							giveCellEventListeners(i-7, i, piece.id, 0)
						}
						else if (isCellOccupied(i-7) == 1) {
							if (i-14 >= 0) {
								if (isCellOccupied(i-14) == 0) {
									cells[i-14].style.backgroundColor = "green"
									giveCellEventListeners(i-14, i, piece.id, -7)
								}
							}
						}
					}
				}
				else if (i % 8 == 7) {
					if (i-9 >= 0) {
						if (isCellOccupied(i-9) == 0) {
							cells[i-9].style.backgroundColor = "green"
							giveCellEventListeners(i-9, i, piece.id, 0)
						}
						else if (isCellOccupied(i-9) == 1) {
							if (i-18 >= 0) {
								if (isCellOccupied(i-18) == 0) {
									cells[i-18].style.backgroundColor = "green"
									giveCellEventListeners(i-18, i, piece.id, -9)
								}
							}
						}
					}
				} 
				else {
					if (i-7 >= 0) {
						if (isCellOccupied(i-7) == 0) {
							cells[i-7].style.backgroundColor = "green"
							giveCellEventListeners(i-7, i, piece.id, 0)
						}
						else if (isCellOccupied(i-7) == 1) {
							if (i-14 >= 0) {
								if ((i-7)%8 != 0 && (i-7)%8 != 7) {
									if (isCellOccupied(i-14) == 0) {
										cells[i-14].style.backgroundColor = "green"
										giveCellEventListeners(i-14, i, piece.id, -7)
									}
								}
							}
						}
					}
					if (i-9 >= 0) {
						if (isCellOccupied(i-9) == 0) {
							cells[i-9].style.backgroundColor = "green"
							giveCellEventListeners(i-9, i, piece.id, 0)
						}
						else if (isCellOccupied(i-9) == 1) {
							if (i-18 >= 0) {
								if ((i-9)%8 != 0 && (i-9)%8 != 7) {
									if (isCellOccupied(i-18) == 0) {
										cells[i-18].style.backgroundColor = "green"
										giveCellEventListeners(i-18, i, piece.id, -9)
									}
								}
							}
						}
					}
				}	
			}

			else {
				// see if cell is on edge
				if (i % 8 == 0) {
					if (i+9 <= 63) {
						if (isCellOccupied(i+9) == 0) {
							cells[i+9].style.backgroundColor = "green"
							giveCellEventListeners(i+9, i, piece.id, 0)
						}
						else if (isCellOccupied(i+9) == 1) {
							if (i+18 <= 63) {
								if (isCellOccupied(i+18) == 0) {
									cells[i+18].style.backgroundColor = "green"
									giveCellEventListeners(i+18, i, piece.id, 9)
								}
							}
						}
					}
				}
				else if (i % 8 == 7) {
					if (i+7 <= 63) {
						if (isCellOccupied(i+7) == 0) {
							cells[i+7].style.backgroundColor = "green"
							giveCellEventListeners(i+7, i, piece.id, 0)
						}
						else if (isCellOccupied(i+7) == 1) {
							if (i+14 <= 63) {
								if (isCellOccupied(i+14) == 0) {
									cells[i+14].style.backgroundColor = "green"
									giveCellEventListeners(i+14, i, piece.id, 7)
								}
							}
						}
					}
				} 
				else {
					if (i+7 <= 63) {
						if (isCellOccupied(i+7) == 0) {
							cells[i+7].style.backgroundColor = "green"
							giveCellEventListeners(i+7, i, piece.id, 0)
						}
						else if (isCellOccupied(i+7) == 1) {
							if (i+14 <= 63) {
								if ((i+14)%8 != 0 && (i+14)%8 != 7) {
									if (isCellOccupied(i+14) == 0) {
										cells[i+14].style.backgroundColor = "green"
										giveCellEventListeners(i+14, i, piece.id, 7)
									}
								}
							}
						}
					}
					if (i+9 <= 63) {
						if (isCellOccupied(i+9) == 0) {
							cells[i+9].style.backgroundColor = "green"
							giveCellEventListeners(i+9, i, piece.id, 0)
						}
						else if (isCellOccupied(i+9) == 1) {
							if (i+18 <= 63) {
								if ((i+18)%8 != 0 && (i+18)%8 != 7) {
									if (isCellOccupied(i+18) == 0) {
										cells[i+18].style.backgroundColor = "green"
										giveCellEventListeners(i+18, i, piece.id, 9)
									}
								}
							}
						}
					}
				}
			}
		}
	}
}


// 0 = empty, 1 = opponents piece, 2 = your piece
function isCellOccupied(id) {
	if (board[id] != null) {
		if (board[id] < 12) {
			if (turn == 1) {
				return(1)
			}
			else {
				return(2)
			}
		}
		else {
			if (turn == 1) {
				return(2)
			}
			else {
				return(1)
			}
		}
	}
	else {
		return(0)
	}
}

// new cell id, old cell id, id, id of cell getting jumped
function giveCellEventListeners(newCell, oldCell, id, jump) {
	cells[newCell].onclick = moveToCell(newCell, oldCell, id, jump)
}

function moveToCell(newCell, oldCell, id, jump) {
	return function() {
		if (isCellOccupied(newCell) == 0) {
			board[newCell] = board[oldCell]
			board[oldCell] = null
			cells[oldCell].innerHTML = ""
			const piece = document.createElement("p");
			piece.id = id
			if (newCell <= 7 || newCell >= 56) {
				if (turn == 1) {
					piece.classList = "oneking"
				}
				else {
					piece.classList = "twoking"
				}
			}
			cells[newCell].appendChild(piece)
			if (jump != 0 && jump != null) {
				board[oldCell + jump] = null
				cells[oldCell + jump].innerHTML = ""
				if (turn == 1) {
					twoScore -= 1
				}
				else {
					oneScore -= 1
				}
			}
			resetPieces()
			resetBoard()
			changeTurn()
		}
		
	}
}


function resetBoard() {
	for (let i = 0; i < cells.length; i++) {
		if (!cells[i].classList.contains("null")) {
			cells[i].style.backgroundColor = "#BA7A3A"
			cells[i].onclick = null
		}
	}
	if (turn == 1) {
		for (let i = 0; i < onePieces.length; i++) {
			if (onePieces[i].classList.contains("oneking")) {
				onePieces[i].classList = "oneking"
			}
			else {
				onePieces[i].classList = "one"
			}
		}
	}
	else {
		for (let i = 0; i < twoPieces.length; i++) {
			if (twoPieces[i].classList.contains("twoking")) {
				twoPieces[i].classList = "twoking"
			}
			else {
				twoPieces[i].classList = "two"
			}
		}
	}
}

function resetPieces() {
	pieces = document.querySelectorAll("p");
	onePieces = []
	twoPieces = []
	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i].id < 12) {
			twoPieces.push(pieces[i])
		}
		else {
			onePieces.push(pieces[i])
		}
	}
}


function changeTurn() {
	if (turn == 1) {
		document.getElementById("turn").innerHTML = "Black's Turn"
		for (let i = 0; i < onePieces.length; i++) {
			onePieces[i].onclick = null;
		}
		turn = 2
	}
	else {
		document.getElementById("turn").innerHTML = "Red's Turn"
		for (let i = 0; i < twoPieces.length; i++) {
			twoPieces[i].onclick = null;
		}
		turn = 1
	}
	givePiecesEventListeners()
}



givePiecesEventListeners()




















