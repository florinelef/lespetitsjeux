const caseState = ['1', '2', '3', '4', '5', '6', '7', '8', '-'];
//buttons list only used for disabling or enabling buttons
const buttons = [];

for (let i = 1; i <= 8; i++) {
	buttons.push(document.querySelector('#case' + i + ' button'));
}

const startButton = document.querySelector('#start');

startButton.addEventListener('click', startGame);

function startGame() {
	disableButtons();
	swap('6', '-');
	swap('3', '-');
	swap('2', '-');
	swap('1', '-');
}

function swap(num1, num2) {
	let i1 = caseState.indexOf(num1);
	let i2 = caseState.indexOf(num2);
	[caseState[i1], caseState[i2]] = [caseState[i2], caseState[i1]];
	i1++;
	i2++;
	[
		document.querySelector('#case' + i1).innerHTML,
		document.querySelector('#case' + i2).innerHTML,
	] = [
		document.querySelector('#case' + i2).innerHTML,
		document.querySelector('#case' + i1).innerHTML,
	];
}

function disableButtons() {
	buttons.forEach(button => {
		button.disabled = true;
		button.classList.remove('btn-primary');
		button.classList.add('btn-danger');
	});
}

function enableButtons() {
	buttons.forEach(button => {
		button.disabled = false;
		button.classList.remove('btn-danger');
		button.classList.add('btn-primary');
	});
}
