function generatePhoneNumbers(amount, start, end) {
	var numbers = [], i;
	for (i = 0; i < amount; i++) {
		numbers[i] = String(Math.floor(Math.random() * (end - start)) + start + 1);
	}
	return numbers;
}

function calculateScore(numbers) {

	var l = numbers.length;
	var array = [];
	var i, j, k, thisNumber, len;
	var sortedNumbers;

	// Store the numbers to an array of objects
	for (i = 0; i < l; i++) {
		array[i] = {}
		array[i].num = numbers[i];
		array[i].score = 0;
	}

	// Start counting
	for (i = 0; i < l; i++) {
		thisNumber = array[i].num;
		len = thisNumber.length;
		for (j = 0; j < len; j++) {
			thisChar = thisNumber.charAt(j);

			// Check for the amount of occurences
			for (k = 0; k < thisNumber.length; k++) {
				if (k != j && thisChar === thisNumber.charAt(k)) {
					array[i].score += 1;
				}
			}

			// Check for adjacency
			if (thisChar === thisNumber.charAt(j - 1) || thisChar === thisNumber.charAt(j + 1)) {
				array[i].score += 2;
			}
		}
	}

	sortedNumbers = array.sort( compare );
	return sortedNumbers;
}

function compare(a, b) {
	if (a.score > b.score)
		return -1;
	if (a.score < b.score)
		return 1;
	return 0;
}
