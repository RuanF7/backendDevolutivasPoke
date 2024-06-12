// import axios from "axios";
// import { PrismaClient } from "@prisma/client";
// import { fetchPokemon } from "./pokemonService";

// interface RespostaCorrecao {
//   questaoId: number;
//   alunoId: number;
//   nota: number;
//   resposta1: string;
//   resposta2: string;
// }

// export class ProvaService {
//   private prisma: PrismaClient;

//   constructor(prisma: PrismaClient) {
//     this.prisma = prisma;
//   }

//   async createProva(
//     professorId: number,
//     nomeProva: string,
//     pokemonNomes: string[]
//   ) {
//     const professor = await this.prisma.professor.findUnique({
//       where: { id: professorId },
//       include: { Mochila: { include: { Pokemon: true } } },
//     });

//     if (!professor || !professor.Mochila) {
//       throw new Error("Professor not found or has no mochila");
//     }

//     const curso = await this.prisma.curso.findFirst({
//       where: { tipo: professor.tipo },
//     });

//     if (!curso) {
//       throw new Error("Course not found");
//     }

//     const questoes = await this.createQuestoes(pokemonNomes);

//     const prova = await this.prisma.prova.create({
//       data: {
//         nome: nomeProva,
//         professorId,
//         cursoId: curso.id,
//         dataCriacao: new Date(),
//         Questao: {
//           create: questoes,
//         },
//       },
//       include: { Questao: true },
//     });

//     return prova;
//   }

//   async criarDevolutiva(
//     provaId: number,
//     alunoId: number,
//     correcao: RespostaCorrecao[]
//   ) {
//     const prova = await this.prisma.prova.findUnique({
//       where: { id: provaId },
//       include: { Questao: true },
//     });

//     if (!prova) {
//       throw new Error("Prova não encontrada");
//     }

//     let notaFinal = 0;
//     let totalPeso = 0;

//     const updatedQuestoes = correcao.map((resposta) => {
//       const questao = prova.Questao.find((q) => q.id === resposta.questaoId);

//       if (!questao) {
//         throw new Error(
//           `Questão com ID ${resposta.questaoId} não encontrada na prova`
//         );
//       }

//       const peso = questao.pergunta1 === "name" ? 4 / 3 : 2;
//       notaFinal += resposta.nota * peso;
//       totalPeso += peso;

//       return {
//         questaoId: questao.id,
//         nota: resposta.nota,
//         provaId: provaId,
//         alunoId: alunoId,
//       };
//     });

//     notaFinal = (notaFinal / totalPeso) * 10;
//     const devolutiva = await this.prisma.devolutiva.create({
//       data: {
//         Prova: { connect: { id: provaId } },
//         Aluno: { connect: { id: alunoId } },
//         notaFinal,
//         dataDevolutiva: new Date(),
//         Nota: {
//           create: updatedQuestoes,
//         },
//       },
//       include: { Nota: true },
//     });

//     return devolutiva;
//   }

//   private async fetchPokemonImage(nome: string) {
//     try {
//       const response = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon/${nome}`
//       );
//       return response.data.sprites.front_default;
//     } catch (error) {
//       console.error("Error fetching Pokemon image:", error);
//       throw new Error("Failed to fetch Pokemon image");
//     }
//   }

//   private async createQuestoes(pokemonNomes: string[]) {
//     const questoes = [];

//     for (const nome of pokemonNomes) {
//       try {
//         const imagem = await this.fetchPokemonImage(nome);
//         questoes.push({
//           imagem: imagem,
//           pergunta1: "",
//           pergunta2: "",
//         });
//       } catch (error) {
//         console.error("Error creating questions for Pokemon:", nome, error);
//         throw new Error("Failed to create questions for Pokemon");
//       }
//     }

//     return questoes;
//   }
//   async getProvaById(provaId: number) {
//     try {
//       const prova = await this.prisma.prova.findUnique({
//         where: {
//           id: provaId, // Corrigido para usar o ID passado como argumento
//         },
//         include: {
//           Questao: true,
//         },
//       });

//       return prova;
//     } catch (error) {
//       console.error("Erro ao buscar detalhes da prova:", error);
//       throw error; // Lança o erro para ser tratado no código que chamou esta função
//     }
//   }

//------------------------------------------------------------------------------

// async corrigirProva(
//   provaId: number,
//   alunoId: number,
//   correcao: RespostaCorrecao[]
// ) {
//   const prova = await this.prisma.prova.findUnique({
//     where: { id: provaId },
//     include: { Questao: true },
//   });

//   if (!prova) {
//     throw new Error("Prova não encontrada");
//   }

//   const respostas = correcao.map((resposta) => ({
//     questaoId: resposta.questaoId,
//     resposta1: resposta.resposta1,
//     resposta2: resposta.resposta2,
//     provaId: provaId,
//     alunoId: alunoId,
//   }));

//   const correcaoRegistro = await this.prisma.correcao.createMany({
//     data: respostas,
//   });

//   return correcaoRegistro;

// let notaFinal = 0;
// let totalPeso = 0;

// const updatedQuestoes = correcao.map((resposta) => {
//   const questao = prova.Questao.find((q) => q.id === resposta.questaoId);

//   if (!questao) {
//     throw new Error(
//       `Questão com ID ${resposta.questaoId} não encontrada na prova`
//     );
//   }

//   const peso = questao.perguntaTipo === "name" ? 4 / 3 : 2;
//   notaFinal += resposta.nota * peso;
//   totalPeso += peso;

//   return {
//     questaoId: questao.id,
//     nota: resposta.nota,
//     provaId: provaId,
//     alunoId: alunoId,
//   };
// });

// notaFinal = (notaFinal / totalPeso) * 10;
// const devolutiva = await this.prisma.devolutiva.create({
//   data: {
//     Prova: { connect: { id: provaId } },
//     Aluno: { connect: { id: alunoId } },
//     notaFinal,
//     dataDevolutiva: new Date(),
//     Nota: {
//       create: updatedQuestoes,
//     },
//   },
//   include: { Nota: true },
// });

// return devolutiva;
//
