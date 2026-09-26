const express = require("express");
const alunoController = require("../controllers/AlunoController");

const router = express.Router();

router.get("/", (request, response) => {
    alunoController.findMany(request, response);
});

router.post("/", (request, response) => {
    alunoController.create(request, response);
});

router.get("/:id", (request, response) => {
    alunoController.findUnique(request, response);
});

module.exports = router;