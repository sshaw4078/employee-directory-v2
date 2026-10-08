import express from "express";
import employeesRouter from "#api/employees";

const app = express();
export default app;


app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});


app.use("/employees", employeesRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});