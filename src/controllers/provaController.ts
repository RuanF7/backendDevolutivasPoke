import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProvaService } from "../services/provaService";

const prisma = new PrismaClient();
const provaService = new ProvaService(prisma);

export class ProvaController {
  static async createProva(req: Request, res: Response) {
    const { professorId, provaData } = req.body;

    console.log(
      "Received request to create prova with professorId:",
      professorId
    );
    console.log("Received provaData:", provaData);

    if (
      typeof professorId !== "number" ||
      !Array.isArray(provaData.pokemonNomes) ||
      typeof provaData.nome !== "string"
    ) {
      return res.status(400).json({ error: "Invalid data format." });
    }

    try {
      const prova = await provaService.createProva(
        professorId,
        provaData.nome,
        provaData.pokemonNomes
      );
      res.status(201).json(prova);
    } catch (error) {
      console.error("Error creating prova:", error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        res.status(400).json({ error: "Foreign key constraint failed" });
      } else {
        res.status(500).json({ error: "Failed to create prova" });
      }
    }
  }
  async criarDevolutiva(req: Request, res: Response) {
    const { provaId, alunoId, correcao } = req.body;

    try {
      const devolutiva = await provaService.criarDevolutiva(
        provaId,
        alunoId,
        correcao
      );
      res.status(201).json(devolutiva);
    } catch (error) {
      console.error("Erro ao criar devolutiva:", error);
      res.status(500).json({ error: "Falha ao criar devolutiva" });
    }
  }
}
