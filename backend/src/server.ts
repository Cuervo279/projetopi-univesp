import express from "express";
import cors from "cors";
import rankingRoutes from "./rankingRoutes";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite receber JSON no corpo das requisições resolveu o erro no rankingRoutes

// Rotas principais
app.use("/api", rankingRoutes);

// Rota raiz (só para teste)
app.get("/", (req, res) => {
  res.send("Servidor backend rodando com sucesso!");
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});
