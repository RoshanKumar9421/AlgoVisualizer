export async function kadansAlgorithmWithStop(
  arr,
  setArray,
  setColorArray,
  delay,
  stopRef,
  updateStats
) {
  let n = arr.length;
  let maxSum = arr[0];
  let currentSum = arr[0];

  setColorArray(new Array(n).fill("blue"));

  for (let i = 1; i < n; i++) {
    if (stopRef.current) return;

    const colors = new Array(n).fill("blue");
    colors[i] = "orange";
    setColorArray(colors);
    await new Promise((r) => setTimeout(r, delay));

    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  setColorArray(new Array(n).fill("green"));
  updateStats({ maxSum });
  return maxSum;
}

// ✅ Default export
export default kadansAlgorithmWithStop;
