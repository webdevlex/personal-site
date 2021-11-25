const fs = require('fs');
const generateString = require('./generateString.js');

module.exports = function (savePath, fps, positions) {
	const scriptString = generateString(fps, positions);

	fs.writeFile(savePath, scriptString, (err) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('Done!');
	});
};
