import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { handleAuthCallback } from './controllers/authController.js';
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    try {
        return res.status(200).json({ message: 'Welcome to the API!' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/auth/callback', handleAuthCallback);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;