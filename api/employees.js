import express from "express";
import employees from "#db/employees";

const router = express.Router();
export default router;

router
  .route("/")
  .get((req, res) => {
    res.send(employees);
  })
  .post((req, res) => {
    const name = req.body?.name;

    
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).send("A valid name is required.");
    }

    const id = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    const employee = { id, name: name.trim() };

    employees.push(employee);
    res.status(201).send(employee);
  });

router.route("/random").get((req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.send(employees[i]);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("There is no employee with that id.");
  }
  res.send(employee);
});