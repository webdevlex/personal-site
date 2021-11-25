const MILLIS_IN_A_SECOND = 1000;

module.exports = function (fps, orbits) {
	const interval = MILLIS_IN_A_SECOND / fps;

	const positionsForAllOrbits = orbits.map((singleOrbit) => {
		const positionsAndScales = generatePositionsForSingleOrbit(
			singleOrbit,
			interval
		);
		return {
			positionIndex: 0,
			id: singleOrbit.id,
			positionsArray: positionsAndScales.positions,
			scalesArray: positionsAndScales.scales,
		};
	});
	// console.log(positionsForAllOrbits);
	return positionsForAllOrbits;
};

function generatePositionsForSingleOrbit(singleOrbit, interval) {
	const { width, height, duration, positionInDegrees, direction } =
		singleOrbit;
	const durationInMillis = duration * MILLIS_IN_A_SECOND;

	let degreesToAdd = divideAnimaitonIntoInterval(
		durationInMillis,
		interval
	);
	let degreesToAddEveryInterval = calculateDirection(
		degreesToAdd,
		direction
	);

	let executed = 0;
	const maxExecutions = calculateMaxExecutions(
		durationInMillis,
		interval
	);

	let currentAngle = positionInDegrees;
	let currentPoint = { x: 0, y: 0 };

	let scales = [];
	let positions = [];
	while (executed < maxExecutions) {
		currentPoint = calculatePoint(currentAngle);

		const singlePosition = calculateSinglePosition(
			currentPoint,
			width,
			height
		);
		// const singleScale = calculateSingleScale(currentPoint);

		positions.push(singlePosition);
		scales.push(currentPoint.y);

		currentAngle += degreesToAddEveryInterval;
		executed++;
	}
	return { positions, scales };
}

function calculatePoint(angle) {
	let currentAngleInRadians = degreesToRadians(angle);
	x = Math.cos(currentAngleInRadians);
	y = calculateY(x, angle) || 0;
	return { x, y };
}

function degreesToRadians(degrees) {
	let pi = Math.PI;
	return degrees * (pi / 180);
}

function calculateY(x, angle) {
	let y = Math.sqrt(1 - x * x);

	if (angle > 0 && angle <= 180) {
		y *= -1;
	} else if (angle > 180 && angle <= 360) {
		y *= 1;
	} else if (angle <= -180) {
		y *= -1;
	}
	return y;
}

function divideAnimaitonIntoInterval(durationInMillis, interval) {
	const oneForthOfAnimation = durationInMillis / 4;
	const numberOfExecutions = oneForthOfAnimation / interval;

	return 90 / numberOfExecutions;
}

function calculateDirection(degreesToAdd, direction) {
	return (degreesToAdd *= direction === 'clock-wise' ? -1 : 1);
}

function calculateMaxExecutions(durationInMillis, interval) {
	return durationInMillis / interval;
}

function calculateSinglePosition(currentPoint, width, height) {
	const halfOfWidth = width / 2;
	const halfOfHeight = height / 2;

	let xPos = halfOfWidth * currentPoint.x;
	let yPos = halfOfHeight * currentPoint.y;

	return { x: xPos, y: yPos };
}

function calculateSingleScale(currentPoint) {
	console.log(currentPoint);
	if (currentPoint.y >= 0) {
		if (currentPoint.x <= 0) {
			return currentPoint.y;
		} else {
			return currentPoint.y;
		}
	} else {
		if (currentPoint.x <= 0) {
			return currentPoint.y;
		} else {
			return currentPoint.y;
		}
	}
}
