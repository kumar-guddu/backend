export const isMatchAboveThreshold = (
  query: string, target: string, threshold: number): boolean => {
  const len = Math.min(query.length, target.length);
  let matchCount = 0;

  for (let i = 0; i < len; i++) {
    if (query[i].toLowerCase() === target[i].toLowerCase()) {
      matchCount++;
    }
  }

  return (matchCount / len) >= threshold;
};
