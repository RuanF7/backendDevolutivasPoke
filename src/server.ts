import express from 'express';
import authRoutes from './routes/authRoutes';
import professorRoutes from './routes/professorRoutes';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/professor', professorRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
