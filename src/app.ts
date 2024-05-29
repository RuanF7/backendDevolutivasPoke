import express, { Application } from 'express';
import routes from './routes/routes';

const app: Application = express();

app.use(express.json());
app.use('/api/pokemon', routes);

export default app;