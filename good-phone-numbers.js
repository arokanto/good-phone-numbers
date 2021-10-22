function generatePhoneNumbers(amount, start, end) {
	let numbers = [], i;
	for (i = 0; i < amount; i++) {
		numbers[i] = String(Math.floor(Math.random() * (end - start)) + start + 1);
	}
	return numbers;
}

function calculateScores(numbers) {
	const scored = numbers.map(number => {
		return {
			score: calculateScore(number),
			num: number
		}
	})

	const sorted = scored.sort(compare)

	return sorted
}

function calculateScore(number) {
	const len = number.length
	let score = 0
	tempAr = [];
	for (let i = 0; i < len; i++) {
		thisChar = number.charAt(i);

		// Only calculate each number once
		if (tempAr.indexOf(thisChar) === -1) {
		
			// Check for the amount of occurences
			for (let j = (i + 1); j < len; j++) {
				if (thisChar === number.charAt(j)) {
					score += 1;
				}
			}
		}
		
		// Check for adjacency
		if (thisChar === number.charAt(i + 1)) {
			score += 2;
		}

		tempAr.push(thisChar);
	}

	return score
}

function compare(a, b) {
	if (a.score > b.score)
		return -1;
	if (a.score < b.score)
		return 1;
	return 0;
}
