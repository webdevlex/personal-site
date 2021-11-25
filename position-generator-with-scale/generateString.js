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

	function moveCircle(index, x, y, scale) {
		elements[index].style.cssText += "transform:translate(" + x + "px," + y + "px) scale(" + (1 + (scale * 0.5)) + ");";
	}

	function moveCircleNoScale(index, x, y) {
		elements[index].style.cssText +=
			'transform:translate(' + x + 'px,' + y + 'px)';
	}

	function hideMoon(index) {
		elements[index].style.cssText += 'z-index:-1;';
	}
	
	function showMoon(index) {
		elements[index].style.cssText += 'z-index:1;';
	}

	function resetOrIncrementIndex(positionIndex, arrayLength) {
		if (positionIndex >= arrayLength) {
			return 0;
		}
		return positionIndex + 1;
	}
	
	var stop = false;
	var frameCount = 0;
	var fps, fpsInterval, startTime, now, then, elapsed;
	
	startAnimating(${fps});
	
	function startAnimating(fps) {
		fpsInterval = 1000 / fps;
		then = Date.now();
		startTime = then;
		animate();
	}
	
	function animate() {
		if (stop) {
			return;
		}
	
		requestAnimationFrame(animate);
	
		now = Date.now();
		elapsed = now - then;
	
		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);
			positions.forEach(
				({ id, positionIndex, positionsArray, scalesArray }, index, array) => {
					let x = positionsArray[positionIndex].x;
					let y = positionsArray[positionIndex].y;
					let scale = scalesArray[positionIndex];
	
					if (positionIndex === 0 && id === 'moon') {
						showMoon(index);
					} else if (positionIndex === 80 && id == 'moon') {
						hideMoon(index);
					}
	
					if (id !== 'moon') {
						moveCircle(index, x, y, scale);
					} else {
						moveCircleNoScale(index, x, y);
					}
	
					array[index].positionIndex = resetOrIncrementIndex(
						positionIndex,
						arrayLengths[index]
					);
				}
			);
		}
	}`;
};
