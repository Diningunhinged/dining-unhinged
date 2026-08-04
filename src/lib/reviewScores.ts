export function venueOverall(scores) {
  return Number(
    (
      scores.food * 0.35 +
      scores.drinks * 0.15 +
      scores.service * 0.20 +
      scores.atmosphere * 0.15 +
      scores.value * 0.15
    ).toFixed(1)
  );
}

export function drinkOverall(scores) {
  return Number(
    (
      scores.appearance * 0.10 +
      scores.balance * 0.20 +
      scores.taste * 0.40 +
      scores.creativity * 0.15 +
      scores.value * 0.15
    ).toFixed(1)
  );
}