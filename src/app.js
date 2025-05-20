const express = require("express");
const { spawn } = require("child_process");
// const cors = require("cors");

const app = express();
// app.use(cors());
app.use(express.json());

const path = require("path");

app.get("/run-python", (req, res) => {
  const argument = req.query.name || "Default";

  const scriptPath = path.join(__dirname, "scripts", "script.py");
  const python = spawn("python", [scriptPath, argument]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send({ output: "Printed successfully!" });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
