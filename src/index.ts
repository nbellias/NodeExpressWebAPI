import express from 'express';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 19237;

// Security middleware
app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

app.use(express.json({ limit: '10kb' }));


app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to NodeExpressWebAPI! See /api-docs for API documentation.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
