import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { AddPokemonService } from "../../services/addPokemonToProfessorBackpack/addPokemonToProfessorBackpack";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";
import { ProfessorAddPokemon } from "../../../types/professorTypes";

const addPokemonService = new AddPokemonService(prisma);

export class AddPokemonController {
  static async addPokemon(req: Request, res: Response) {
    const { professorId, pokemonName } = req.body;

    try {
      if (!professorId || !pokemonName) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: professorId, pokemonName"
        );
      }

      const data: ProfessorAddPokemon = { professorId, pokemonName };
      const pokemon = await addPokemonService.addPokemon(data);

      if (!pokemon) {
        throw new NotFoundError("Não foi possível adicionar o pokemon.");
      }

      console.log("Pokemon adicionado com sucesso!:", pokemon);
      res.status(200).json(pokemon);
    } catch (error) {
      console.error("Não foi possível adicionar o pokemon.", error);

      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro no servidor.");
        res.status(500).json({ error: internalError.message });
      }
    }
  }
}
