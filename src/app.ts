import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import professorRoutes from "./routes/professorRoutes";
// import provaRoutes from './routes/provaRoutes';
import cursoRoutes from "./routes/cursoRoutes";
import alunoRoutes from "./routes/alunoRoutes";

import routes from "./routes/routes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/professor", professorRoutes);
// app.use('/api/prova', provaRoutes);
app.use("/cursos", cursoRoutes);
app.use("/aluno", alunoRoutes);
app.use("/pokemon", routes);

export default app;
