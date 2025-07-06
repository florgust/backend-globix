import Notificacao from "../models/Notificacoes";
import { io } from "./socket";

interface CriarNotificacaoParams {
  userId: number;
  viagemId?: number;
  tipo: string;
  mensagem: string;
}

export async function criarNotificacao({
  userId,
  viagemId,
  tipo,
  mensagem,
}: CriarNotificacaoParams) {
  // 1️⃣ Cria no banco
  const notificacao = await Notificacao.create({
    userId,
    viagemId,
    tipo,
    mensagem,
    read: false,
    dataCriacao: new Date(),
  });

  // 2️⃣ Emite via Socket.IO na sala do usuário
  io.to(String(userId)).emit("nova-notificacao", {
    id: notificacao.id,
    mensagem: notificacao.mensagem,
    viagemId: notificacao.viagemId,
    tipo: notificacao.tipo,
    dataCriacao: notificacao.dataCriacao,
  });

  return notificacao;
}