export interface ScoreItem {
  category: string;
  score: number;
  weight: number;
}

export function calculateOverall(
  scores: ScoreItem[] = []
): number {

  const validScores = scores
    .map(item => ({
      score: Number(item.score),
      weight: Number(item.weight),
    }))
    .filter(item =>
      !Number.isNaN(item.score) &&
      !Number.isNaN(item.weight) &&
      item.weight > 0
    );

  if (validScores.length === 0) {
    return 0;
  }

  const totalWeight = validScores.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const weightedScore = validScores.reduce(
    (sum, item) => sum + (item.score * item.weight),
    0
  );

  return Number(
    (weightedScore / totalWeight).toFixed(1)
  );

}