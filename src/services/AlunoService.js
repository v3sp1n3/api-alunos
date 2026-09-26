const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");

const adapter = new PrismaBetterSqlite3({
    url: "file:./dev.db"
});

const prisma = new PrismaClient({
    adapter
});

class AlunoService {
    async create(data) {
        if (!data.nome || !data.email) {
            throw new AlunoInvalidoError();
        }

        const aluno = await prisma.aluno.create({
            data: {
                nome: data.nome,
                email: data.email
            }
        });

        return aluno;
    }

    async findMany(page, pageSize) {
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize)
        });

        return alunos;
    }
}

module.exports = new AlunoService();