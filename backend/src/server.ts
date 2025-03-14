import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./database";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Rota inicial de teste faz u L
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

// servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
