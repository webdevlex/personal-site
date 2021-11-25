// // 240,000 milliseconds in 4 min
// // 60,000 milliseconds in 1 min
// // after 1 min, x should equal 1
// // 60,000 divided by 41 = 1463
// // function will run 1463 times in 1 minute
// // 1000 milliseconds divided by 1463 = 0.00069
// // we need to add 0.00069 in order to hit 1 after 1 min

const fs = require('fs');

let runs = 0;
const shouldRun = 1463;
let positions = [];

const DURATION = 60;
const FPS = 24;
const MILLIS_IN_SECONDS = 1000;
const INTERVAL = MILLIS_IN_SECONDS / FPS;
const PI = Math.PI;
const STARTING_RADIANS = 0;

const boxWidth = 1500;
const boxHeight = 500;

const RADIANS_TO_ADD = PI / 2 / calculateNumberOfExecutions();
let currentRadians = STARTING_RADIANS;
let flipper = 1;

function calculateNumberOfExecutions() {
	const animationDurationInMillis = DURATION * MILLIS_IN_SECONDS;
	const oneForthOfAnimation = animationDurationInMillis / 4;
	const numberOfExecutions = oneForthOfAnimation / INTERVAL;

	return numberOfExecutions;
}

function startInterval() {
	let x = 0;
	let y = 0;
	while (runs < shouldRun) {
		currentRadians += RADIANS_TO_ADD;
		x = Math.cos(currentRadians);
		y = getY(x) || 0;
		moveCircle(x, y);
		runs++;
	}
	// setInterval(function () {
	// 	if (runs < shouldRun) {
	// 		currentRadians += RADIANS_TO_ADD;
	// 		x = Math.cos(currentRadians);
	// 		y = getY(x) || 0;
	// 		moveCircle(x, y);
	// 		console.log(runs);
	// 		runs++;
	// 	}
	// }, INTERVAL);
}

function getY(x) {
	return Math.sqrt(1 - x * x);
}

function moveCircle(x, y) {
	// let circleContainer = document.getElementById('square-wrapper');

	// let circleContainerWidth = circleContainer.offsetWidth;
	let circleContainerWidth = boxWidth;
	let halfOfScreenWidth = circleContainerWidth / 2;

	// let circleContainerHeight = circleContainer.offsetHeight;
	let circleContainerHeight = boxHeight;
	let halfOfScreenHeight = circleContainerHeight / 2;

	let yPosition = halfOfScreenHeight * y * flipper;
	let xPosition = halfOfScreenWidth * x;

	let rightSideOfScreen = halfOfScreenWidth;
	let leftSideOfScreen = halfOfScreenWidth * -1;

	// let circle = document.getElementById('square');
	// circle.style.cssText += `transform:translate(${xPosition}px,${yPosition}px);`;

	if (
		xPosition >= rightSideOfScreen ||
		xPosition <= leftSideOfScreen
	) {
		flipper *= -1;
	}
	positions.push({ xPosition, yPosition });
}

startInterval();

let positionsString = JSON.stringify(positions);
fs.writeFile('./positions.txt', positionsString, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('Done!');
});
