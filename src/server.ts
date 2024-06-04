import express from 'express';
import authRoutes from './routes/authRoutes';
import professorRoutes from './routes/professorRoutes';
import provaRoutes from './routes/provaRoutes';
import cursoRoutes from './routes/cursoRoutes';
import alunoRoutes from './routes/alunoRoutes';  // importando as rotas dos alunos

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/prova', provaRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/aluno', alunoRoutes);  // adicionando o uso das rotas dos alunos

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
