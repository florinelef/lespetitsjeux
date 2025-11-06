const startButton = document.querySelector('#start');
const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
const b3 = document.querySelector('#b3');
const b4 = document.querySelector('#b4');

const coloredTime = 450;
const waitTime = 400;

let correctPattern = '';
let verificationIndex = 0;
let canTouchButtons = false;
let score = 0;

startButton.addEventListener('click', startGame);
b1.addEventListener('click', () => handleClickOnColoredButton('1'));
b2.addEventListener('click', () => handleClickOnColoredButton('2'));
b3.addEventListener('click', () => handleClickOnColoredButton('3'));
b4.addEventListener('click', () => handleClickOnColoredButton('4'));

function startGame() {
	startButton.disabled = true;
	addRandomColor();
	playPattern(correctPattern);
}

function continueGame(correctAwnser) {
	if (correctAwnser) {
		addRandomColor();
		playPattern(correctPattern);
	} else {
		document.querySelector('#gameOver').classList.remove('invisible');
		document.querySelector('#gamePanel').classList.add('invisible');
		document.querySelector('#finalScore').innerHTML = 'Score : ' + score;
	}
}

function handleClickOnColoredButton(colorNumber) {
	if (canTouchButtons) {
		lightup(colorNumber);
		if (correctPattern[verificationIndex] === colorNumber) {
			verificationIndex++;
		} else {
			continueGame(false);
		}
		if (verificationIndex === correctPattern.length) {
			verificationIndex = 0;
			score++;
			document.querySelector('#score').innerHTML = 'Score : ' + score;
			continueGame(true);
		}
	}
}

function addRandomColor() {
	correctPattern = correctPattern + (Math.floor(Math.random() * 4) + 1);
}

function playPattern(pattern, i = 0) {
	canTouchButtons = false;
	document.body.style.cursor = 'wait';
	setTimeout(() => {
		lightup(pattern[i]);
		if (i < pattern.length) {
			playPattern(pattern, i + 1);
		} else {
			canTouchButtons = true;
			document.body.style.cursor = '';
		}
	}, coloredTime + waitTime);
}

function lightup(colorNumber) {
	switch (colorNumber) {
		case '1':
			b1.classList.add('blue');
			setTimeout(() => {
				b1.classList.remove('blue');
			}, waitTime);
			break;

		case '2':
			b2.classList.add('red');
			setTimeout(() => {
				b2.classList.remove('red');
			}, waitTime);
			break;

		case '3':
			b3.classList.add('yellow');
			setTimeout(() => {
				b3.classList.remove('yellow');
			}, waitTime);
			break;

		case '4':
			b4.classList.add('green');
			setTimeout(() => {
				b4.classList.remove('green');
			}, waitTime);
			break;

		default:
			break;
	}
}
