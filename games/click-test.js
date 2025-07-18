let nbClick = 0;
let isFirstClick = true;
let seconds = 0;

const clickZone = document.querySelector('#clickZone');
const nbClickMessage = document.querySelector('#nbClick');
const CPS = document.querySelector('#CPS');

//chart datas
const xTimesValues = [0];
const yCPSValues = [0];
const yNbClickValues = [0];

clickZone.addEventListener('click', addClick);

function addClick() {
	if (isFirstClick) {
		isFirstClick = false;

		launchTimer();
	}
	nbClick++;
	updateValues();
}

function launchTimer() {
	const secondsTimer = setTimeout(() => {
		seconds += 1 / 10;
		updateValues();
		if (seconds < 9.9) {
			launchTimer();
		} else {
			stopGame();
		}
	}, 100);
}

function updateValues() {
	//update time in click zone
	clickZone.innerHTML = `${seconds.toFixed(1)} s`;

	//update nb clicks
	if (nbClick > 1) {
		nbClickMessage.innerHTML = `Nombre de clics : ${nbClick}`;
	} else {
		nbClickMessage.innerHTML = `Nombre de clic : ${nbClick}`;
	}

	//update CPS
	let cpsValue = 0;
	cpsValue = (nbClick / seconds).toFixed(2);
	CPS.innerHTML = `CPS : ${cpsValue}`;

	//add data to the chart
	xTimesValues.push(seconds);
	yCPSValues.push(cpsValue);
	yNbClickValues.push(nbClick);
}

function stopGame() {
	clickZone.disabled = true;
	createCharts();
}

function createCharts() {
	//click chart
	const clickData = [
		{
			x: xTimesValues,
			y: yNbClickValues,
			mode: 'lines',
		},
	];

	const clickLayout = {
		xaxis: { range: [0, 10], title: 'Temps (en secondes)' },
		title: 'Nombre de clics en fonction du temps.',
		paper_bgcolor: 'rgba(0,0,0,0',
		plot_bgcolor: 'rgba(0,0,0,0)',
		font: {
			color: '#ffffff',
		},
	};

	Plotly.newPlot('clickChart', clickData, clickLayout, { staticPlot: true });

	//cps chart
	const cpsData = [
		{
			x: xTimesValues,
			y: yCPSValues,
			mode: 'lines',
		},
	];

	const cpsLayout = {
		xaxis: { range: [0, 10], title: 'Temps (en secondes)' },
		title: 'Valeur du CPS en fonction du temps.',
		paper_bgcolor: 'rgba(0,0,0,0',
		plot_bgcolor: 'rgba(0,0,0,0)',
		font: {
			color: '#ffffff',
		},
	};

	Plotly.newPlot('cpsChart', cpsData, cpsLayout, { staticPlot: true });
}

createCharts();
