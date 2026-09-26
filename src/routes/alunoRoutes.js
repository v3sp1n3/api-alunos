const express = require("express");
const alunoController = require("../controllers/AlunoController");

const router = express.Router();

router.post("/", (request, response) => {
    alunoController.create(request, response);
});

router.get("/", (request, response) => {
    alunoController.findMany(request, response);
});

router.get("/:id", (request, response) => {
    alunoController.findUnique(request, response);
});

router.put("/:id", (request, response) => {
    alunoController.update(request, response);
});

module.exports = router;