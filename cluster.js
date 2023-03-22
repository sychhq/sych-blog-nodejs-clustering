const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  console.log(
    `Master process is running with PID ${process.pid} and creating ${numWorkers} worker processes.`
  );

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker process with PID ${worker.process.pid} exited with code ${code} and signal ${signal}.`
    );
    console.log(`Starting a new worker process...`);

    cluster.fork();
  });
} else {
  require("./index.js");
}
