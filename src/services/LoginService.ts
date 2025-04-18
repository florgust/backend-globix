import jwt from 'jsonwebtoken';
import { PasswordUtils } from '@utils/PasswordUtils';
import Usuario from '@models/Usuario';
import { BadRequestError, NotFoundError } from '@utils/Errors';

class LoginService {
  static async validateUser(email: string, senha: string): Promise<{ token: string }> {
    // Busca o usuário no banco de dados pelo email
    const usuario = await Usuario.findOne(
      {
        where: {
          email,
          status: 1,
        }
      });

    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    // Verifica se a senha está correta
    const senhaValida = await PasswordUtils.comparePassword(senha, usuario.senha);

    if (!senhaValida) {
      throw new BadRequestError("Senha inválida.");
    }

    // Gera o token JWT
    const token = this.generateToken({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });

    return { token: `Bearer ${token}` };
  }

  private static generateToken(payload: { id: number; nome: string; email: string }): string {
    const secret = process.env.JWT_PRIVATE_SECRET!.replace(/\\n/g, '\n');; // Use uma variável de ambiente para o segredo

    if (!secret) {
      throw new Error("JWT_SECRET não está definida.");
    }

    return jwt.sign(payload, secret, { algorithm: 'RS256', expiresIn: '1h' });
  }

}

export default LoginService;