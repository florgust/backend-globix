import Notificacao from "../models/Notificacoes";
import { io } from "./socket";

interface CriarNotificacaoParams {
  userId: number;
  viagemId?: number;
  tipo: string;
  mensagem: string;
}

export async function criarNotificacao(params: CriarNotificacaoParams) {

  const { userId, viagemId, tipo, mensagem } = params;
  console.log("criarNotificacao chamado com:", params);

  try {
    const notificacao = await Notificacao.create({
      userId,
      viagemId,
      tipo,
      mensagem,
      read: false,
      dataCriacao: new Date(),
    });
    console.log("notificação salva no BD:", notificacao.toJSON());

    io.to(String(userId)).emit("nova-notificacao", {
      id: notificacao.id,
      mensagem: notificacao.mensagem,
      viagemId: notificacao.viagemId,
      tipo: notificacao.tipo,
      dataCriacao: notificacao.dataCriacao,
    });

    return notificacao;
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    throw error;
  }
}