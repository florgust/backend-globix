
import { PasswordUtils } from '@utils/PasswordUtils';
import Usuario from '@models/Usuario';

class LoginService {
  static async validateUser(email: string, senha: string): Promise<{ status: number; data: any }> {
    // Busca o usuário no banco de dados pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return { status: 404, data: { message: 'Usuário não encontrado.' } };
    }

    // Verifica se a senha está correta
    const senhaValida = await PasswordUtils.comparePassword(senha, usuario.senha);

    if (!senhaValida) {
      return { status: 401, data: { message: 'Senha inválida.' } };
    }

    // Retorna sucesso se o usuário for autenticado
    return { status: 200, data: { message: 'Login realizado com sucesso.', usuario } };
  }
}

export default LoginService;