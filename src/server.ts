import express from 'express';
import authRoutes from './routes/authRoutes';
import professorRoutes from './routes/professorRoutes';
import provaRoutes from './routes/provaRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/prova', provaRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
