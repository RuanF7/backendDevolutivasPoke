import { Request, Response } from "express";
import prisma from "../prismaClient";
import { ProfessorService } from "../services/professorService";

const professorService = new ProfessorService(prisma);

export class ProfessorController {
  static async addPokemon(req: Request, res: Response) {
    const { id, nome, tipo } = req.body;

    try {
      const professor = await professorService.addPokemon({
        id,
        nome,
        tipo,
      });
      res.status(200).json(professor);
    } catch (error) {
      res.status(500).json({ error: error as Error });
    }
  }
}
// const prisma = new PrismaClient();
// const cursoService = new CursoService();
// const provaService = new ProvaService(prisma);

// export class ProfessorController {
//   static async addPokemonToMochila(req: Request, res: Response) {
//     console.log("addPokemonToMochila method called");
//     const { professorId, pokemonName } = req.body;
//     console.log(
//       "Received request with professorId:",
//       professorId,
//       "and pokemonName:",
//       pokemonName
//     );

//     if (typeof professorId !== "number") {
//       return res.status(400).json({
//         error: "Invalid data format. Expected professorId as number.",
//       });
//     }

//     if (typeof pokemonName !== "string") {
//       return res.status(400).json({
//         error: "Invalid data format. Expected pokemonName as string.",
//       });
//     }

//     try {
//       const professor = await prisma.professor.findUnique({
//         where: { id: professorId },
//         include: { Mochila: true },
//       });

//       if (!professor) {
//         return res.status(404).json({ error: "Professor not found" });
//       }

//       const pokemonData = await fetchPokemon(pokemonName);
//       console.log(professor.tipo, pokemonData.tipo);
//       if (pokemonData.tipo != professor.tipo) {
//         return res
//           .status(400)
//           .json({ error: "Pokemon type does not match professor type" });
//       }

//       const pokemon = await prisma.pokemon.create({
//         data: {
//           nome: pokemonData.name,
//           tipo: pokemonData.tipo,
//           mochilaId: professor.Mochila?.id ?? 0,
//         },
//       });
//       console.log("Pokemon added to mochila:", pokemon);
//       res.status(201).json(pokemon);
//     } catch (error) {
//       console.error("Error adding Pokémon to mochila:", error);
//       res.status(500).json({ error: "Failed to add Pokémon to mochila" });
//     }
//   }

//   static async corrigirProva(req: Request, res: Response) {
//     const { provaId, alunoId, correcao } = req.body;

//     if (
//       typeof provaId !== "number" ||
//       typeof alunoId !== "number" ||
//       !Array.isArray(correcao)
//     ) {
//       return res.status(400).json({ error: "Invalid data format." });
//     }

// try {
//   const correcaoRegistro = await provaService.corrigirProva(
//     provaId,
//     alunoId,
//     correcao
//   );
//   res.status(201).json(correcaoRegistro);
// } catch (error) {
//   console.error("Error correcting prova:", error);
//   res.status(500).json({ error: "Failed to correct prova" });
// }

// try {
//   const devolutiva = await provaService.corrigirProva(
//     provaId,
//     alunoId,
//     correcao
//   );
//   res.status(200).json(devolutiva);
// } catch (error) {
//   res.status(400).json({ error: (error as Error).message });
// }
