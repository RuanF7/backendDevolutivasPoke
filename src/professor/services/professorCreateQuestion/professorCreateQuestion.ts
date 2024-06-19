import { Questao, PrismaClient, Pokemon } from "@prisma/client";
import {
  Question,
  QuestionResponse,
  HavePokemon,
} from "../../../types/professorTypes";

export class ProfessorCreateQuestionService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async professorHasPokemon(pokemon: HavePokemon): Promise<boolean> {
    const professorPokemons = await this.prisma.pokemon.findFirst({
      where: { professorId: pokemon.professorId, nome: pokemon.nome },
    });

    if (professorPokemons) {
      return false;
    }
    return true;
  }
  async createQuestion(question: Question): Promise<Questao> {
    const questionData = await this.prisma.questao.create({
      data: {
        provaId: question.provaId,
        pergunta: question.pergunta,
      },
    });

    const response: QuestionResponse = {
      id: questionData.id,
      provaId: questionData.provaId,
      pergunta: questionData.pergunta,
    };

    return response;
  }
}
