const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
const EmailDuplicadoError = require("../errors/EmailDuplicadoError");

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

    async findMany(page, pageSize, orderBy, order) {
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
            orderBy: {
                [orderBy]: order
            }
        });

        const total = await prisma.aluno.count();

        return {
            alunos,
            total
        };
    }

    async findUnique(id) {
        const aluno = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!aluno) {
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }

    async update(id, data) {
        const alunoExistente = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!alunoExistente) {
            throw new AlunoNaoEncontradoError();
        }

        if (!data.nome && !data.email) {
            throw new AlunoInvalidoError();
        }

        try {
            const aluno = await prisma.aluno.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...(data.nome && { nome: data.nome }),
                    ...(data.email && { email: data.email })
                }
            });

            return aluno;
        } catch (e) {
            if (e.code === "P2002") {
                throw new EmailDuplicadoError();
            }

            throw e;
        }
    }

    async delete(id) {
        const alunoExistente = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!alunoExistente) {
            throw new AlunoNaoEncontradoError();
        }

        await prisma.aluno.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

module.exports = new AlunoService();