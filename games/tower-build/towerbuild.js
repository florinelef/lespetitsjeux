const colorGradients = [
	// Orange
	[
		'#fff3e0',
		'#ffe0b2',
		'#ffcc80',
		'#ffb74d',
		'#ffa726',
		'#ff9800',
		'#fb8c00',
		'#f57c00',
		'#ef6c00',
		'#e65100',
		'#e64a19',
		'#d84315',
		'#bf360c',
		'#ff6f00',
		'#ff8f00',
		'#ffa000',
		'#ffb300',
		'#ffc107',
		'#ffca28',
		'#ffd54f',
		'#ffe082',
		'#fff59d',
		'#fff176',
		'#ffee58',
		'#ffeb3b',
		'#fdd835',
		'#fbc02d',
		'#f9a825',
		'#f57f17',
		'#ff6f00',
	],

	// Bleu
	[
		'#e3f2fd',
		'#bbdefb',
		'#90caf9',
		'#64b5f6',
		'#42a5f5',
		'#2196f3',
		'#1e88e5',
		'#1976d2',
		'#1565c0',
		'#0d47a1',
		'#82b1ff',
		'#448aff',
		'#2979ff',
		'#2962ff',
		'#4fc3f7',
		'#29b6f6',
		'#03a9f4',
		'#039be5',
		'#0288d1',
		'#0277bd',
		'#01579b',
		'#b3e5fc',
		'#81d4fa',
		'#4fc3f7',
		'#29b6f6',
		'#03a9f4',
		'#039be5',
		'#0288d1',
		'#0277bd',
		'#01579b',
	],

	// Vert
	[
		'#e8f5e9',
		'#c8e6c9',
		'#a5d6a7',
		'#81c784',
		'#66bb6a',
		'#4caf50',
		'#43a047',
		'#388e3c',
		'#2e7d32',
		'#1b5e20',
		'#dcedc8',
		'#c5e1a5',
		'#aed581',
		'#9ccc65',
		'#8bc34a',
		'#7cb342',
		'#689f38',
		'#558b2f',
		'#33691e',
		'#1b5e20',
		'#a5d6a7',
		'#81c784',
		'#66bb6a',
		'#4caf50',
		'#43a047',
		'#388e3c',
		'#2e7d32',
		'#1b5e20',
		'#0d5300',
		'#004d00',
	],

	// Rouge
	[
		'#ffebee',
		'#ffcdd2',
		'#ef9a9a',
		'#e57373',
		'#ef5350',
		'#f44336',
		'#e53935',
		'#d32f2f',
		'#c62828',
		'#b71c1c',
		'#ff8a80',
		'#ff5252',
		'#ff1744',
		'#d50000',
		'#f48fb1',
		'#f06292',
		'#ec407a',
		'#e91e63',
		'#d81b60',
		'#c2185b',
		'#ad1457',
		'#880e4f',
		'#ff80ab',
		'#ff4081',
		'#f50057',
		'#c51162',
		'#ff1744',
		'#d50000',
		'#b71c1c',
		'#ff5252',
	],

	// Violet
	[
		'#f3e5f5',
		'#e1bee7',
		'#ce93d8',
		'#ba68c8',
		'#ab47bc',
		'#9c27b0',
		'#8e24aa',
		'#7b1fa2',
		'#6a1b9a',
		'#4a148c',
		'#ea80fc',
		'#e040fb',
		'#d500f9',
		'#aa00ff',
		'#ce93d8',
		'#ba68c8',
		'#ab47bc',
		'#9c27b0',
		'#8e24aa',
		'#7b1fa2',
		'#6a1b9a',
		'#4a148c',
		'#f48fb1',
		'#f06292',
		'#ec407a',
		'#e91e63',
		'#d81b60',
		'#c2185b',
		'#ad1457',
		'#880e4f',
	],

	// Jaune
	[
		'#fffde7',
		'#fff9c4',
		'#fff59d',
		'#fff176',
		'#ffee58',
		'#ffeb3b',
		'#fdd835',
		'#fbc02d',
		'#f9a825',
		'#f57f17',
		'#fff176',
		'#ffee58',
		'#ffeb3b',
		'#fdd835',
		'#fbc02d',
		'#f9a825',
		'#f57f17',
		'#f4511e',
		'#e65100',
		'#ffd600',
		'#ffeb3b',
		'#fdd835',
		'#fbc02d',
		'#f9a825',
		'#f57f17',
		'#ffca28',
		'#ffb300',
		'#ffa000',
		'#ff8f00',
		'#ff6f00',
	],
];

const game = document.querySelector('#game');
const countdown = document.querySelector('#countdown');
const timer = document.querySelector('#timer');

const xmid = game.offsetWidth / 2 - 10;
const ymid = 300;
const unit = Math.min(xmid, ymid) / 10;

let Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Events = Matter.Events,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse;

let engine = Engine.create();

let render = Render.create({
	element: game,
	engine: engine,
	options: {
		width: 2 * xmid,
		height: 2 * ymid,
		background: 'transparent',
		wireframes: false,
	},
});

let detected = false;
let isGameOver = false;

// compte à rebours 3s
let countdownRunning = false;
let countdownInterval = null;
let countdownValue = 3;

// timer global 60s
let globalTime = 60;
let globalInterval = null;

//pc
game.addEventListener('mouseup', () => startCountdown());
game.addEventListener('mousedown', () => stopCountdown());

// mobile
game.addEventListener(
	'touchstart',
	e => {
		e.preventDefault();
		stopCountdown();
	},
	{ passive: false }
);

game.addEventListener(
	'touchend',
	e => {
		e.preventDefault();
		startCountdown();
	},
	{ passive: false }
);

let elements = [];
let finishLine;

// -------------------------------------
function draw() {
	// finish line
	finishLine = Bodies.rectangle(xmid, 30, xmid * 2, 40, {
		isStatic: true,
		isSensor: true,
		render: {
			fillStyle: 'red',
			opacity: '0.3',
		},
		chamfer: { radius: 10 },
	});

	elements.push(finishLine);

	// boxes
	let colors = colorGradients[Math.floor(Math.random() * 6)];
	for (let i = 0; i < 30; i++) {
		elements.push(
			Bodies.rectangle(
				((xmid * 2) / 20) * ((i % 15) + 3),
				Math.abs(
					(ymid * 1.5 -
						((i % 15) * Math.floor(Math.random() * 3) + 2) *
							unit *
							Math.floor(Math.random() * 3) +
						2) %
						(ymid * 1.8)
				),
				(Math.floor(Math.random() * 4) + 1) * unit,
				(Math.floor(Math.random() * 2) + 1) * unit,
				{
					angle: (360 / 15) * (Math.floor(Math.random() * 15) + 1),
					render: {
						fillStyle: colors[i],
					},
					chamfer: { radius: Math.floor(Math.random() * 5) },
				}
			)
		);
	}

	// walls
	elements.push(
		Bodies.rectangle(xmid, ymid * 2 - 15, xmid * 2, 25, {
			isStatic: true,
			chamfer: { radius: 10 },
		})
	);
	elements.push(
		Bodies.rectangle(0, ymid, 25, ymid * 2 - 20, {
			isStatic: true,
			render: {
				fillStyle: 'transparent',
			},
		})
	);
	elements.push(
		Bodies.rectangle(xmid * 2, ymid, 25, ymid * 2 - 20, {
			isStatic: true,
			render: {
				fillStyle: 'transparent',
			},
		})
	);

	// collisions
	Events.on(engine, 'collisionStart', function (event) {
		for (let pair of event.pairs) {
			if (pair.bodyA === finishLine || pair.bodyB === finishLine) {
				engine.timing.timeScale = 0.6;
				detected = true;
			}
		}
	});

	Events.on(engine, 'collisionEnd', function (event) {
		for (let pair of event.pairs) {
			if (pair.bodyA === finishLine || pair.bodyB === finishLine) {
				engine.timing.timeScale = 1;
				detected = false;

				stopCountdown(true);
			}
		}
	});

	Composite.add(engine.world, elements);
}

function startCountdown() {
	if (!detected || countdownRunning || isGameOver) return;

	finishLine.render.fillStyle = 'green';

	countdownRunning = true;
	countdownValue = 3;
	countdown.textContent = countdownValue;

	countdownInterval = setInterval(() => {
		countdownValue--;

		if (countdownValue <= 0) {
			countdown.textContent = '0';
			stopCountdown();
			stopGame(true);
			return;
		}

		countdown.textContent = countdownValue;
	}, 1000);
}

function stopCountdown(red = false) {
	if (isGameOver) return;

	if (red) finishLine.render.fillStyle = 'red';
	countdownRunning = false;
	clearInterval(countdownInterval);
}

function startGlobalTimer() {
	globalInterval = setInterval(() => {
		globalTime--;

		if (globalTime <= 0) {
			clearInterval(globalInterval);
			stopGame(false);
		}
		timer.innerHTML = globalTime + 's';
	}, 1000);
}

function stopGlobalTimer() {
	if (globalInterval) {
		clearInterval(globalInterval);
		globalInterval = null;
	}
}

function stopGame(win) {
	stopGlobalTimer();
	Runner.stop(runner);
	countdown.innerHTML = win ? 'Victoire 🎉' : 'Défaite...';
	isGameOver = true;
}

draw();

// add mouse control
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		stiffness: 0.2,
		render: { visible: false },
	},
});

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

Render.run(render);

let runner = Runner.create();
Runner.run(runner, engine);

// lancement du timer global 60s
startGlobalTimer();
