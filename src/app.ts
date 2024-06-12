import express, { Application } from "express";
import cors from "cors";
import userRouter from "./user/routes/userRouter";
import professorRouter from "./professor/routes/professorRouter";
// import provaRoutes from './routes/provaRoutes';
import cursoRoutes from "./routes/cursoRoutes";
import alunoRoutes from "./routes/alunoRoutes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/auth", userRouter);
app.use("/professor", professorRouter);
// app.use('/api/prova', provaRoutes);
app.use("/cursos", cursoRoutes);
app.use("/aluno", alunoRoutes);

export default app;
