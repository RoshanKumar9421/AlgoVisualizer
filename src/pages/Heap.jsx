// src/pages/Heap.jsx
import { useState } from "react";
import "./Heap.css";

/**
 * 🏗️ Heap Data Structure Visualization Component
 *
 * Interactive visualization and learning tool for Heap operations like
 * insertion, deletion, peek, and heapify.
 *
 * @component
 * @returns {JSX.Element} Heap visualization page
 */
export default function Heap() {
  const [heap, setHeap] = useState([10, 20, 15, 30, 40]); // initial min-heap
  const [input, setInput] = useState("");
  const [showCode, setShowCode] = useState(null);

  /** 🧮 Helper - Build Min-Heap */
  const heapify = (arr, n, i) => {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) smallest = left;
    if (right < n && arr[right] < arr[smallest]) smallest = right;

    if (smallest !== i) {
      [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
      heapify(arr, n, smallest);
    }
  };

  /** ➕ Insert Element */
  const insert = () => {
    if (!input.trim()) return;
    const val = parseInt(input);
    const newHeap = [...heap, val];
    // build heap bottom-up
    for (let i = Math.floor(newHeap.length / 2) - 1; i >= 0; i--) {
      heapify(newHeap, newHeap.length, i);
    }
    setHeap(newHeap);
    setInput("");
  };

  /** ➖ Delete Root */
  const deleteRoot = () => {
    if (heap.length === 0) return;
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    heapify(newHeap, newHeap.length, 0);
    setHeap(newHeap);
  };

  /** 👁️ Peek (Root Element) */
  const peek = () => {
    if (heap.length === 0) alert("Heap is empty!");
    else alert(`Top Element (Root): ${heap[0]}`);
  };

  /** 🧹 Reset Heap */
  const reset = () => {
    setHeap([]);
  };

  return (
    <div className="heap-page">
      {/* 🏷️ Header */}
      <header className="page-header">
        <h1>Heap Data Structure</h1>
        <p className="page-subtitle">
          Visualize operations like insertion, deletion, and heapify in a Min-Heap.
        </p>
      </header>

      {/* 🎮 Controls */}
      <section className="controls-panel">
        <div className="input-group">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="heap-input"
          />
        </div>

        <div className="operation-buttons">
          <button onClick={insert} className="control-btn insert-btn">
            Insert
          </button>
          <button onClick={deleteRoot} className="control-btn delete-btn">
            Delete Root
          </button>
          <button onClick={peek} className="control-btn peek-btn">
            Peek
          </button>
          <button onClick={reset} className="control-btn reset-btn">
            Reset
          </button>
        </div>
      </section>

      {/* 🎨 Visualization */}
      <section className="heap-visualization">
        <h3>Heap Tree Visualization</h3>
        {heap.length > 0 ? (
          <div className="heap-tree">
            {heap.map((val, i) => (
              <div key={i} className="heap-node">
                <span className="node-value">{val}</span>
                <span className="node-index">[{i}]</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="heap-empty">Heap is empty</div>
        )}
      </section>

      {/* 📘 Documentation */}
      <section className="documentation-section">
        <article className="ds-info">
          <h2>About Heap Data Structure</h2>
          <p>
            A <strong>Heap</strong> is a special tree-based data structure that satisfies the{" "}
            <em>heap property</em> — in a <strong>Min-Heap</strong>, each parent node is less
            than or equal to its child nodes; in a <strong>Max-Heap</strong>, it’s the opposite.
          </p>

          <h3>Types of Heaps</h3>
          <ul>
            <li>Min-Heap (smallest element at root)</li>
            <li>Max-Heap (largest element at root)</li>
            <li>Binary Heap (most common)</li>
            <li>Fibonacci Heap (used in Dijkstra, Prim)</li>
          </ul>

          <h3>Pseudocode (Min-Heap)</h3>
          <pre className="pseudocode">{`insert(heap, value):
  add value at end
  heapifyUp(heap)

deleteRoot(heap):
  replace root with last element
  remove last element
  heapifyDown(heap)

heapifyDown(i):
  smallest = i
  left = 2*i + 1, right = 2*i + 2
  if left < n and heap[left] < heap[smallest]:
      smallest = left
  if right < n and heap[right] < heap[smallest]:
      smallest = right
  if smallest != i:
      swap(heap[i], heap[smallest])
      heapifyDown(smallest)`}</pre>

          <h3>Time & Space Complexity</h3>
          <table className="complexity-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time</th>
                <th>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Insert</td><td>O(log n)</td><td>O(1)</td></tr>
              <tr><td>Delete</td><td>O(log n)</td><td>O(1)</td></tr>
              <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Heapify</td><td>O(n)</td><td>O(1)</td></tr>
            </tbody>
          </table>

          <h3>Real-World Applications</h3>
          <ul className="applications-list">
            <li>Priority Queues</li>
            <li>Heap Sort Algorithm</li>
            <li>Dijkstra and Prim’s Algorithm</li>
            <li>CPU Job Scheduling</li>
            <li>Top-k elements in a stream</li>
          </ul>

          <h3>Code Snippets</h3>
          <div className="code-snippets-container">
            {[
              {
                operation: "Insert",
                code: `function insert(heap, val) {
  heap.push(val);
  let i = heap.length - 1;
  while (i > 0 && heap[Math.floor((i-1)/2)] > heap[i]) {
    [heap[i], heap[Math.floor((i-1)/2)]] =
      [heap[Math.floor((i-1)/2)], heap[i]];
    i = Math.floor((i-1)/2);
  }
}`,
              },
              {
                operation: "Delete Root",
                code: `function deleteRoot(heap) {
  heap[0] = heap.pop();
  heapifyDown(heap, 0);
}`,
              },
            ].map(({ operation, code }) => (
              <div key={operation} className="code-snippet">
                <button
                  className="code-toggle-button"
                  onClick={() =>
                    setShowCode(showCode === operation ? null : operation)
                  }
                >
                  <span className="operation-name">{operation}</span>
                  <span className="toggle-icon">
                    {showCode === operation ? "▲" : "▼"}
                  </span>
                </button>
                {showCode === operation && (
                  <div className="code-content">
                    <pre className="implementation-code">{code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 💡 Tips */}
      <aside className="usage-tips">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Use heaps for efficient minimum or maximum retrieval.</li>
          <li>Binary Heap is implemented using arrays.</li>
          <li>Heapify ensures the heap property from bottom-up or top-down.</li>
          <li>Heaps are ideal for priority queues and sorting.</li>
        </ul>
      </aside>
    </div>
  );
}
