function generatePhoneNumbers(amount, start, end) {
  let numbers = [],
    i;
  for (i = 0; i < amount; i++) {
    numbers[i] = String(Math.floor(Math.random() * (end - start)) + start + 1);
  }
  return numbers;
}

function calculateScores(numbers) {
  const scored = numbers.map((number) => {
    return {
      score: calculateScore(number),
      num: number,
    };
  });

  const sorted = scored.sort(compare);

  return sorted;
}

function calculateScore(number) {
  let score = 0;

  score += getOccurenceScore(number);
  score += getAdjacencyScore(number);
  score += getPatternScore(number);

  return score;
}

function getOccurenceScore(number) {
  let score = 0;
  for (let i = 0; i < 10; i++) {
    const amount = number.split(i).length - 1;
    score += amount > 1 ? amount : 0;
  }
  return score;
}

function getAdjacencyScore(number) {
  const len = number.length;
  const maxConsecutiveAmountMid = 2;
  const maxConsecutiveAmountEnd = 3;
  let score = 0;
  let headMatchAmount = 1;
  let tailMatchAmount = 1;

  // head
  for (let i = 0; i < len; i++) {
    if (number.charAt(i) !== number.charAt(i + 1)) break;
    if (i + 1 >= maxConsecutiveAmountEnd) {
      score -= 1;
    } else {
      score += 2;
    }
    headMatchAmount++;
  }

  // tail
  for (let i = len - 1; i > 0; i--) {
    if (number.charAt(i) !== number.charAt(i - 1)) break;
    if (i <= len - maxConsecutiveAmountEnd) {
      score -= 1;
    } else {
      score += 2;
    }
    tailMatchAmount++;
  }

  // mid
  let consecutiveAmount = 0;
  for (let i = headMatchAmount; i < len - tailMatchAmount; i++) {
    if (number.charAt(i) === number.charAt(i + 1)) {
      consecutiveAmount++;
      if (consecutiveAmount <= maxConsecutiveAmountMid) {
        score += 2;
      }
    } else {
      consecutiveAmount = 0;
    }
  }
  return score;
}

function getPatternScore(number) {
  const len = number.length;
  const maxPatternLength = Math.floor(len / 2);
  let score = 0;
  patternBlock: {
    for (let patternLength = maxPatternLength; patternLength >= 2; patternLength--) {
      const usedPatters = [];
      for (let j = 0; j + patternLength <= len; j++) {
        const pattern = number.substring(j, j + patternLength);
        const parts = number.split(pattern);
        if (parts.length > 2 && !usedPatters.includes(pattern)) {
          score += (parts.length - 2) * (patternLength + 1);
          if (patternLength === maxPatternLength) {
            break patternBlock;
          }
          usedPatters.push(pattern);
        }
      }
    }
  }
  return score;
}

function compare(a, b) {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
}

module.exports = {
  calculateScore,
  generatePhoneNumbers,
  getAdjacencyScore,
  getOccurenceScore,
  getPatternScore,
};
