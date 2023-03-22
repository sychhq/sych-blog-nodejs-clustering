const express = require("express");
const app = express();
console.log(`Worker ${process.pid} started`);

app.get("/", (req, res) => {
  // Perform a CPU-bound computation
  const result = fibonacci(40);

  res.send(`Result: ${result}`);
});

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
