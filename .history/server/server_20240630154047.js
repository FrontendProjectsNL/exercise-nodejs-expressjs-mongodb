import express from 'express';
import cors from 'cors';
import recordsRouter from './routes/record.js'; // Assuming your router is exported as `recordsRouter`

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Mounting the record router
app.use('/record', recordsRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
