import { server } from "./utils/socket";

const PORT = process.env.PORT ?? 3001;

server.listen(PORT, () => {
  console.log(`Servidor rodando 🚀 na porta ${PORT}`);
});