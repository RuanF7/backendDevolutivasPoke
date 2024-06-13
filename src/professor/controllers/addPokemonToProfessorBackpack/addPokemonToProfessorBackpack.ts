import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { AddPokemonService } from "../../services/addPokemonToProfessorBackpack/addPokemonToProfessorBackpack";

const addPokemonService = new AddPokemonService(prisma);

export class AddPokemonController {
  static async addPokemon(req: Request, res: Response) {
    const { id, nome, tipo } = req.body;

    try {
      const pokemon = await addPokemonService.addPokemon({
        id,
        nome,
        tipo,
      });
      console.log("Pokemon created:", pokemon);
      res.status(200).json(pokemon);
    } catch (error) {
      console.error("Failed to add Pokémon", error);
      res.status(500).json({ error: error as Error });
    }
  }
}
