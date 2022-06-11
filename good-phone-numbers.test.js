const {
  calculateScore,
  getAdjacencyScore,
  getOccurenceScore,
  getPatternScore,
} = require("./good-phone-numbers");

describe("addOccurenceScores", () => {
  it("Calculates occurence scores correctly", () => {
    expect(getOccurenceScore("1234567")).toBe(0);
    expect(getOccurenceScore("1214167")).toBe(3);
    expect(getOccurenceScore("1214161")).toBe(4);
    expect(getOccurenceScore("1134567")).toBe(2);
    expect(getOccurenceScore("1234566")).toBe(2);
    expect(getOccurenceScore("1222566")).toBe(5);
  });
});

describe("getAdjacencyScore", () => {
  it("Calculates head matches correctly", () => {
    expect(getAdjacencyScore("1234567")).toBe(0);
    expect(getAdjacencyScore("1134567")).toBe(2);
    expect(getAdjacencyScore("1114567")).toBe(4);
    expect(getAdjacencyScore("1111567")).toBe(3);
    expect(getAdjacencyScore("1111167")).toBe(2);
    expect(getAdjacencyScore("1111117")).toBe(1);
    expect(getAdjacencyScore("1111111")).toBe(0);
  });

  it("Calculates tail matches correctly", () => {
    expect(getAdjacencyScore("1234566")).toBe(2);
    expect(getAdjacencyScore("1234555")).toBe(4);
    expect(getAdjacencyScore("1234444")).toBe(3);
    expect(getAdjacencyScore("1244444")).toBe(2);
    expect(getAdjacencyScore("1444444")).toBe(1);
  });

  it("Calculates mid matches correctly", () => {
    expect(getAdjacencyScore("1224567")).toBe(2);
    expect(getAdjacencyScore("1222567")).toBe(4);
    expect(getAdjacencyScore("1222267")).toBe(4);
    expect(getAdjacencyScore("1224557")).toBe(4);
    expect(getAdjacencyScore("1222557")).toBe(6);
  });
});

describe("getPatternScore", () => {
  it("Calculates pattern matches correctly", () => {
    expect(getPatternScore("1234567")).toBe(0);
    expect(getPatternScore("1212567")).toBe(3);
    expect(getPatternScore("1212512")).toBe(6);
    expect(getPatternScore("1231237")).toBe(4);
    expect(getPatternScore("1234123")).toBe(4);
    expect(getPatternScore("1234234")).toBe(4);
  });
});

describe("Combinations", () => {
  it("Calclulates combinations correctly", () => {
    expect(calculateScore("1255512")).toBe(14);
    expect(calculateScore("1233212")).toBe(12);
  });
});
