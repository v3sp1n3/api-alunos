const alunoService = require("../services/AlunoService");

class AlunoController {
    async create(request, response) {
        try {
            const aluno = await alunoService.create(request.body);

            return response.status(201).json(aluno);
        } catch (e) {
            return response.status(e.statusCode || 500).json({
                message: e.message
            });
        }
    }

    async findMany(request, response) {
        try {
            let { page, pageSize, orderBy, order } = request.query;

            page ||= 1;
            pageSize ||= 10;
            orderBy ||= "id";
            order ||= "asc";

            if (order !== "asc" && order !== "desc") {
                order = "asc";
            }

            const resultado = await alunoService.findMany(
                page,
                pageSize,
                orderBy,
                order
            );

            return response.status(200).json(resultado);
        } catch (e) {
            return response.status(e.statusCode || 500).json({
                message: e.message
            });
        }
    }

    async findUnique(request, response) {
        try {
            const { id } = request.params;

            const aluno = await alunoService.findUnique(id);

            return response.status(200).json(aluno);
        } catch (e) {
            return response.status(e.statusCode || 500).json({
                message: e.message
            });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            const aluno = await alunoService.update(id, request.body);

            return response.status(200).json(aluno);
        } catch (e) {
            return response.status(e.statusCode || 500).json({
                message: e.message
            });
        }
    }
}

module.exports = new AlunoController();