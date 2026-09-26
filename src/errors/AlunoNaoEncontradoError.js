const ApiError = require("./ApiError");

class AlunoNaoEncontradoError extends ApiError {
    constructor() {
        super("Aluno não encontrado", 404);
    }
}

module.exports = AlunoNaoEncontradoError;