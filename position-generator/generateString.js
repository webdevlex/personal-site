module.exports = function (fps, positions) {
	let elementsArray = [];
	let positionArrayLengths = [];

	positions.forEach(({ id, positionsArray }) => {
		elementsArray.push(`document.getElementById('${id}')`);
		positionArrayLengths.push(positionsArray.length - 1);
	});

	let elementsArrayStringified = JSON.stringify(
		elementsArray
	).replace(/"/g, '');

	return `   
    let positions = ${JSON.stringify(positions)};

    const MILLIS_IN_A_SECOND = 1000;
	const interval = MILLIS_IN_A_SECOND / ${fps};
	const elements = ${elementsArrayStringified};
	const arrayLengths = ${JSON.stringify(positionArrayLengths)};

	function moveCircle(index, x, y) {
		elements[index].style.cssText += "transform:translate(" + x + "px," + y + "px);";
	}

	function resetOrIncrementIndex(positionIndex, arrayLength) {
		if (positionIndex >= arrayLength) {
			return 0;
		}
		return positionIndex + 1;
	}
	
	function orbit() {
		positions.forEach(
			({ positionIndex, positionsArray }, index, array) => {
				let x = positionsArray[positionIndex].x;
				let y = positionsArray[positionIndex].y;
	
				moveCircle(index, x, y);
	
				array[index].positionIndex = resetOrIncrementIndex(
					positionIndex,
					arrayLengths[index]
				);
			}
		);
		window.requestAnimationFrame(orbit);
	}
	
	window.requestAnimationFrame(orbit);`;
};
