//récupération des mots à 5 lettres
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
		.filter(w => w.length === 5)
		.filter(w => !w.includes('-'));

	return words;
}

const guessInput = document.querySelector('#guessInput');
const guessButton = document.querySelector('#guessButton');
guessButton.disabled = true;

let words;
let correctWord;
loadWords(url).then(wordsList => {
	words = wordsList;
	correctWord = words[Math.floor(Math.random() * words.length)];
	guessButton.disabled = false;
});

//status : 0=gray, 1=orange, 2=green
let lettersStatus = {};
let currentLineNumber = 1;

guessButton.addEventListener('click', () => guess(guessInput.value));

//appuie sur Entrer pour guess
guessInput.addEventListener('keypress', event => {
	if (event.key === 'Enter') guess(guessInput.value);
});

function guess(word) {
	if (word === correctWord) {
		writeWord(word, currentLineNumber);
		endGame();
	} else if (word.length === 5 && words.includes(word)) {
		writeWord(word, currentLineNumber);
		currentLineNumber++;
		if (currentLineNumber === 7) {
			endGame();
		}
	} else {
		colorBadGuess();
	}
	guessInput.value = '';
}

function colorBadGuess() {
	guessButton.classList.remove('btn-primary');
	guessButton.classList.add('btn-danger');
	setTimeout(() => {
		guessButton.classList.remove('btn-danger');
		guessButton.classList.add('btn-primary');
	}, 700);
}

function endGame() {
	document.querySelector('#inputZone').classList.add('invisible');

	document.querySelector('#correctWord').innerHTML += correctWord.toUpperCase();
	if (currentLineNumber < 7) {
		document.querySelector('#score').innerHTML += currentLineNumber;
	} else {
		document.querySelector('#score').innerHTML += '+6';
	}

	document.querySelector('#gameOver').classList.remove('invisible');
}

function writeWord(word, linenumber, letter = 0, lettersRemaining = null) {
	guessButton.disabled = true;

	if (letter === 0) {
		lettersRemaining = correctWord.split('');
	}

	if (linenumber >= 1 && linenumber <= 6) {
		setTimeout(() => {
			const box = document.querySelector(`#l${linenumber}-c${letter + 1}`);
			box.innerHTML = word[letter].toUpperCase();

			if (word[letter] === correctWord[letter]) {
				box.classList.add('green-letter');
				document
					.querySelector(`#letter-${word[letter]}`)
					.classList.add('green-letter');
				lettersStatus[word[letter]] = 2;
				lettersRemaining[letter] = null;
			}

			if (letter < 4) {
				writeWord(word, linenumber, letter + 1, lettersRemaining);
			} else {
				for (let i = 0; i < 5; i++) {
					const b = document.querySelector(`#l${linenumber}-c${i + 1}`);
					if (!b.classList.contains('green-letter')) {
						const idx = lettersRemaining.indexOf(word[i]);
						if (idx !== -1) {
							b.classList.add('orange-letter');
							document
								.querySelector(`#letter-${word[i]}`)
								.classList.add('orange-letter');
							lettersStatus[word[i]] = 1;
							lettersRemaining[idx] = null;
						} else {
							b.classList.add('gray-letter');
							document
								.querySelector(`#letter-${word[i]}`)
								.classList.add('gray-letter');
							lettersStatus[word[i]] = 0;
						}
					}
				}
				guessButton.disabled = false;
			}
		}, 300);
	}
}
