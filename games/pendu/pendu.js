//récupération des mots entre 5 et 12 lettres (pas trop facile ni trop dur)
const url =
	'https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json';

function removeDiacritics(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
async function loadWords(url) {
	const response = await fetch(url);
	let arr;
	try {
		arr = await response.json();
	} catch (e) {
		const txt = await response.text();
		arr = txt
			.split(/\r?\n/)
			.map(s => s.trim())
			.filter(Boolean);
	}
	const words = arr
		.map(w => w.toLowerCase().trim())
		.map(removeDiacritics)
		.filter(w => /^[a-z]+$/.test(w))
		.filter(w => w.length >= 5 && w.length <= 12)
		.filter(w => !w.includes('-'));

	return words;
}

const guessButtons = document.querySelectorAll('#keyboard-colored button');

let correctWord;
let tryWord = '';
loadWords(url).then(wordsList => {
	let words = wordsList;
	correctWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
	guessButtons.forEach(button => {
		button.disabled = false;
	});
	for (let i = 0; i < correctWord.length; i++) tryWord += '_';
	printWord();
});

const maxHearts = 8;
let hearts = maxHearts;

const heartsHTML = document.querySelector('#hearts');
const wordHTML = document.querySelector('#wordSpace');

guessButtons.forEach(button => {
	button.addEventListener('click', () => guess(button));
});

function guess(letterButton) {
	let letter = letterButton.innerHTML;
	if (correctWord.includes(letter)) {
		letterButton.disabled = true;
		colorLetter(letterButton, 1);
		discoverLetter(letter);
	} else {
		letterButton.disabled = true;
		colorLetter(letterButton, 0);
		removeHeartAndUpdate();
	}
	printWord();
	checkWin();
}

function removeHeartAndUpdate() {
	hearts--;
	let res = '';
	for (let i = 1; i <= maxHearts; i++) {
		if (i <= hearts) res += '❤️';
		else res += '🖤';

		if (i === 4) res += '<br>';
	}
	heartsHTML.innerHTML = res;
}

//color code : 0=red, 1=green
function colorLetter(button, colorNumber) {
	if (colorNumber === 0) {
		button.classList.remove('btn-outline-secondary');
		button.classList.add('btn-danger');
	} else {
		button.classList.remove('btn-outline-secondary');
		button.classList.add('btn-success');
	}
}

function discoverLetter(letter) {
	for (let i = 0; i < correctWord.length; i++) {
		if (letter === correctWord[i]) {
			tryWord = tryWord.substring(0, i) + letter + tryWord.substring(i + 1);
		}
	}
}

function printWord() {
	let res = '';
	for (let i = 0; i < tryWord.length; i++) {
		res += tryWord[i] + ' '; //ajout d'un espace après chaque lettre pour une meilleure visibilité
	}
	wordHTML.innerHTML = res;
}

function checkWin() {
	const win = document.querySelector('#win');
	const lose = document.querySelector('#lose');

	// cas défaite
	if (hearts === 0) {
		disableButtons();
		lose.classList.remove('invisible');
		lose.innerHTML += correctWord + ' !';
	} else {
		// cas victoire
		if (tryWord === correctWord) {
			disableButtons();
			win.classList.remove('invisible');
		}
	}
}

function disableButtons() {
	guessButtons.forEach(button => {
		button.disabled = true;
	});
}
