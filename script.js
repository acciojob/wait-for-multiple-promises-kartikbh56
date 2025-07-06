const output = document.getElementById("output");

// Step 1: Insert "Loading..." row by default
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Utility function to create a promise that resolves after a random time
function createTimedPromise(index) {
  const delay = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index + 1}`, time: delay });
    }, delay * 1000);
  });
}

// Start time to calculate total duration
const startTime = performance.now();

// Create array of 3 promises
const promises = [0, 1, 2].map((i) => createTimedPromise(i));

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000;

  // Clear the loading row
  output.innerHTML = "";

  // Add rows for each resolved promise
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;
  output.appendChild(totalRow);
});
