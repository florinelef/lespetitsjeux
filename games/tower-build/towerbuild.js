const game = document.querySelector('#game');

const xmid = game.offsetWidth/2 - 10;
const ymid = 300;


let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

let engine = Engine.create();

let render = Render.create({
    element: game,
    engine: engine,
    options: {
        width: 2*xmid,
        height: 2*ymid,
        background: 'transparent',
        wireframes: false
    }
});

let boxA = Bodies.rectangle(xmid + 30, ymid, 80, 80);
let boxB = Bodies.rectangle(xmid + 90, ymid - 1350, 80, 80);
let ground = Bodies.rectangle(xmid, ymid*2 - 20, xmid*2, 25, { isStatic: true });

Composite.add(engine.world, [boxA, boxB, ground]);

// add mouse control
let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

Render.run(render);

let runner = Runner.create();

Runner.run(runner, engine);