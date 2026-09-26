const express = require("express");
const alunoController = require("../controllers/AlunoController");

const router = express.Router();

router.get("/", (request, response) => {
    alunoController.findMany(request, response);
});

router.post("/", (request, response) => {
    alunoController.create(request, response);
});

module.exports = router;