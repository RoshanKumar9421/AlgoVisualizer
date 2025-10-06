import React, { useState } from "react";
import kadansAlgorithmWithStop from "../algorithms/kadansAlgorithm.js";

export default function KadansAlgorithm() {
  const [array, setArray] = useState([4, -1, 2, 1, -5, 4]);
  const [colorArray, setColorArray] = useState(new Array(array.length).fill("blue"));
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    const delay = 300;
    const stopRef = { current: false };
    const updateStats = (stats) => setResult(stats.maxSum);

    await kadansAlgorithmWithStop(array, setArray, setColorArray, delay, stopRef, updateStats);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Kadane’s Algorithm Visualizer</h1>

      <div className="flex gap-2 mb-4">
        {array.map((num, i) => (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded text-white`}
            style={{ backgroundColor: colorArray[i] }}
          >
            {num}
          </div>
        ))}
      </div>

      <button
        onClick={handleRun}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Run Kadane’s Algorithm
      </button>

      {result !== null && (
        <p className="mt-4 text-lg text-green-600 font-semibold">
          Maximum Subarray Sum = {result}
        </p>
      )}
    </div>
  );
}
