import { server } from "./utils/socket";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando 🚀 na porta ${PORT}`);
});