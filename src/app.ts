import express, { Application } from "express";
import cors from "cors";
import userRouter from "./user/routes/userRouter";
import professorRouter from "./professor/routes/professorRouter";
// import provaRoutes from './routes/provaRoutes';
import studentRouter from "./student/routes/studentRouter";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/auth", userRouter);
app.use("/professor", professorRouter);
// app.use('/api/prova', provaRoutes);
app.use("/aluno", studentRouter);

export default app;
