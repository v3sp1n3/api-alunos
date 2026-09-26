const ApiError = require("./ApiError");

class EmailDuplicadoError extends ApiError {
    constructor() {
        super("Email já cadastrado", 400);
    }
}

module.exports = EmailDuplicadoError;