//difficulty
const difficulty = document.querySelector('#difficulty');
const difficultyValue = difficulty.value;
difficulty.addEventListener('change', () => {
	window.location.reload();
});

//flags
const flags = document.querySelector('#flags');
const botText = document.querySelector('#botText');
let flagsNumber = Math.floor(Math.random() * 7) + 17;
flags.innerHTML = buildFlagsString(flagsNumber);

const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
const b3 = document.querySelector('#b3');

b1.addEventListener('click', () => take(1));
b2.addEventListener('click', () => take(2));
b3.addEventListener('click', () => take(3));

function buildFlagsString(num) {
	let res = '';
	for (let i = 0; i < num; i++) {
		if (i == 0) res += '🚩';
		else res += '🏳️';
	}
	return res;
}

function take(num) {
	if ([1, 2, 3].includes(num)) {
		if (num < flagsNumber) {
			let flagsStr = flags.innerHTML;
			flagsNumber -= num;
			flagsStr = flagsStr.substring(0, flagsStr.length - num * 3);
			flags.innerHTML = flagsStr;
			updateButtons();
			if (!checkWin(1)) {
				botPlays();
			}
		}
	}
}

//status : true = enable buttons, false = disable
function updateButtons(status = true) {
	b1.disabled = !status;
	b2.disabled = !status;
	b3.disabled = !status;
	switch (flagsNumber) {
		case 3:
			b3.disabled = true;
			break;
		case 2:
			b2.disabled = true;
			b3.disabled = true;
			break;
		case 1:
			b1.disabled = true;
			b2.disabled = true;
			b3.disabled = true;
			break;
	}
}

// 0 = bot, 1 = player
function checkWin(winner) {
	if (flagsNumber === 1) {
		if (winner === 1) botText.innerHTML = 'Vous avez gagné !';
		else if (winner === 0) botText.innerHTML = "L'adversaire a gagné !";
		return true;
	}
	return false;
}

function botPlays() {
	let nbTakes = 0;
	updateButtons(false);

	if (difficultyValue == '1') {
		if (flagsNumber >= 5) {
			switch ((flagsNumber - 1) % 4) {
				case 1:
					nbTakes = 1;
					break;
				case 2:
					nbTakes = 2;
					break;
				case 3:
					nbTakes = 3;
					break;
				case 0:
					nbTakes = Math.floor(Math.random() * 3) + 1;
			}
		} else {
			nbTakes = flagsNumber - 1;
		}
	} else {
		if (flagsNumber >= 5) {
			nbTakes = Math.floor(Math.random() * 3) + 1;
		} else {
			nbTakes = flagsNumber - 1;
		}
	}

	setTimeout(() => {
		botText.innerHTML = `L'adversaire a pris ${nbTakes} drapeaux.`;
		botTakes(nbTakes);
		updateButtons(true);
	}, 800);
}

function botTakes(num) {
	if ([1, 2, 3].includes(num)) {
		if (num < flagsNumber) {
			let flagsStr = flags.innerHTML;
			flagsNumber -= num;
			flagsStr = flagsStr.substring(0, flagsStr.length - num * 3);
			flags.innerHTML = flagsStr;

			if (!checkWin(0)) {
				updateButtons(false);
			}
		}
	}
}
