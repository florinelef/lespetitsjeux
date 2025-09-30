const caseState = ['1', '2', '3', '4', '5', '6', '7', '8', '-'];
const winState = ['1', '2', '3', '4', '5', '6', '7', '8', '-'];
//buttons list only used for disabling or enabling buttons
const buttons = [];
let isShuffling = true;
let score = 0;
let gameOver = false;

attachButtonEvents();
disableButtons();

const startButton = document.querySelector('#start');
startButton.addEventListener('click', startGame);

function startGame() {
	startButton.disabled = true;
	shuffle();
}

function shuffle(n = 300) {
	if (n > 0) {
		let empty = caseState.indexOf('-');
		let neighbors = caseState.filter((_, idx) => nextTo(idx, empty));
		let randomNeighbor =
			neighbors[Math.floor(Math.random() * neighbors.length)];
		swap(randomNeighbor);
		disableButtons();
		setTimeout(() => {
			shuffle(n - 1);
		}, 20);
	} else {
		updateBoard();
		enableButtons();
		isShuffling = false;
	}
}

function swap(num1) {
	if (!gameOver) {
		let i1 = caseState.indexOf(num1);
		let i2 = caseState.indexOf('-');

		if (nextTo(i1, i2)) {
			[caseState[i1], caseState[i2]] = [caseState[i2], caseState[i1]];
			updateBoard();
			if (!isShuffling) {
				incrementScore();
				checkWin();
			}
		}
	}
}

function incrementScore() {
	score++;
	document.querySelector('#score').innerHTML = 'Score : ' + score;
}

function checkWin() {
	let winCondition = caseState.every((val, index) => val === winState[index]);
	if (winCondition) {
		gameOver = true;
		buttons.forEach(button => {
			button.classList.remove('btn-primary');
			button.classList.add('btn-success');
		});
	}
}

function attachButtonEvents() {
	buttons.length = 0;

	for (let i = 0; i < caseState.length; i++) {
		const value = caseState[i];
		const button = document.querySelector(`#case${i + 1} button`);

		if (button && value !== '-') {
			button.addEventListener('click', () => swap(value));
			buttons.push(button);
		}
	}
}

function updateBoard() {
	for (let i = 0; i < caseState.length; i++) {
		const div = document.querySelector('#case' + (i + 1));
		const value = caseState[i];

		if (value === '-') {
			div.innerHTML = `<span id="emptySpace"></span>`;
		} else {
			div.innerHTML = `<button class="btn btn-primary" style="width: 98px; height: 98px; font-size: 40px;">${value}</button>`;
		}
	}

	attachButtonEvents();
}

function nextTo(i1, i2) {
	//i1 = case à bouger, i2 = case vide
	switch (i1) {
		case 0:
			if ([1, 3].includes(i2)) return true;
			break;
		case 1:
			if ([0, 2, 4].includes(i2)) return true;
			break;
		case 2:
			if ([1, 5].includes(i2)) return true;
			break;
		case 3:
			if ([4, 0, 6].includes(i2)) return true;
			break;
		case 4:
			if ([1, 3, 5, 7].includes(i2)) return true;
			break;
		case 5:
			if ([2, 4, 8].includes(i2)) return true;
			break;
		case 6:
			if ([3, 7].includes(i2)) return true;
			break;
		case 7:
			if ([6, 4, 8].includes(i2)) return true;
			break;
		case 8:
			if ([7, 5].includes(i2)) return true;
			break;
	}
	return false;
}

function disableButtons() {
	buttons.forEach(button => {
		button.disabled = true;
		button.classList.remove('btn-primary');
		button.classList.add('btn-secondary');
	});
}

function enableButtons() {
	buttons.forEach(button => {
		button.disabled = false;
		button.classList.remove('btn-secondary');
		button.classList.add('btn-primary');
	});
}
