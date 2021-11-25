module.exports = function (fps, positions) {
	return `   
    let positions = ${positions}

    const MILLIS_IN_A_SECOND = 1000;
	const interval = MILLIS_IN_A_SECOND / ${fps};
	setInterval(function () {
		positions.forEach(
			({ positionIndex, id, positionsArray }, index, array) => {
				let x = positionsArray[positionIndex].x;
				let y = positionsArray[positionIndex].y;

				moveCircle(id, x, y);

				array[index].positionIndex = resetOrIncrementIndex(
					positionIndex,
					positionsArray.length
				);
			}
		);
	}, interval);

	function moveCircle(id, x, y) {
		let element = document.getElementById(id);
		element.style.cssText += "transform:translate(" + x + "px," + y + "px);";
	}

	function resetOrIncrementIndex(positionIndex, arrayLength) {
		if (positionIndex >= arrayLength) {
			return 0;
		}
		return positionIndex + 1;
	}`;
};
