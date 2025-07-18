import express from 'express';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 19237;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to NodeExpressWebAPI! See /api-docs for API documentation.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 