let correctAnswer = Math.floor(Math.random() * 100) + 1;
let attemptNumber = 0;

const guessButton = document.querySelector('#guessButton');
const guessInput = document.querySelector('#guessInput');
const guessWindow = document.querySelector('#guess');

guessButton.addEventListener('click', guess);

guessInput.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		guess();
	}
});

function guess(event) {
	let answer = guessInput.value;
	guessInput.value = '';
	//verification de la validité de la réponse
	if (answer > 0 && answer <= 100) {
		// incrémentation du compteur d'essai
		attemptNumber++;
		if (attemptNumber === 0 || attemptNumber === 1) {
			document.querySelector('#attemptNumber').innerHTML =
				`Nombre de tentative : ${attemptNumber}`;
		} else {
			document.querySelector('#attemptNumber').innerHTML =
				`Nombre de tentatives : ${attemptNumber}`;
		}

		//vérification de la réponse donnée
		if (answer < correctAnswer) {
			guessWindow.innerHTML = `${answer} ⬆️`;
		} else if (answer > correctAnswer) {
			guessWindow.innerHTML = `${answer} ⬇️`;
		} else {
			guessWindow.innerHTML = `${answer} ✅`;
			guessButton.disabled = true;
		}
	}
}
