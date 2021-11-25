const generateAllPositions = require('./generatePositions.js');
const generateScript = require('./generateScript.js');

const savePath = './'; // Where final javaScript file will be saved
const fileName = 'xxx'; // Name javascript file will be given
const fps = 30; // Frames per second (number of times element will move in a second)

const orbits = [
	{
		width: 1200, // Width of orbiting elements parent container
		height: 450, // Height of orbiting elements parent container
		id: 'planet-1', // html id of orbiting element
		duration: 60, // Duration of animation in seconds
		positionInDegrees: 220, // Starting positon or orbiting element in degrees ( 0 - 420 )
		direction: 'clock-wise', // Direction of orbit ( 'clock-wise' or 'counter-clock-wise')
	},

	{
		width: 1200,
		height: 450,
		id: 'planet-2',
		duration: 60,
		positionInDegrees: 0,
		direction: 'clock-wise',
	},
	{
		width: 1200,
		height: 450,
		id: 'planet-3',
		duration: 60,
		positionInDegrees: 100,
		direction: 'clock-wise',
	},
	{
		width: 65,
		height: 20,
		id: 'moon',
		duration: 5,
		positionInDegrees: 0,
		direction: 'clock-wise',
	},
];

// This will generate a javaScript file that will automatically animate
// all elements in orbits array when linked to an html document
function main() {
	const positions = generateAllPositions(fps, orbits);
	generateScript(`${savePath}${fileName}.txt`, fps, positions);
}

main();
