import Usuario, { UsuarioAttributes } from '@models/Usuario';
import { PasswordUtils } from '@utils/PasswordUtils';
import { NotFoundError, BadRequestError } from '@utils/Errors';

export class UsuarioService {
    // Buscar todos os usuários ativos (status = 1)
    static async getUsuarios(): Promise<UsuarioAttributes[]> {
        return await Usuario.findAll({
            where: {
                status: 1,
            },
        });
    }

    // Buscar usuário por ID
    static async getUsuarioById(id: number): Promise<UsuarioAttributes> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }
        return usuario;
    }

    // Criar novo usuário
    static async createUsuario(data: Omit<UsuarioAttributes, 'id' | 'status' | 'dataCriacao' | 'dataAtualizacao'>): Promise<UsuarioAttributes> {
        // Verificar se o email já existe
        const usuarioExistente = await Usuario.findOne({ where: { email: data.email } });
        if (usuarioExistente) {
            throw new BadRequestError('O email já está em uso.');
        }

        // Hash da senha
        const hashedSenha = await PasswordUtils.hashPassword(data.senha);
        data.senha = hashedSenha;

        // Criar o usuário no banco de dados com dataCriacao e dataAtualizacao
        return await Usuario.create({
            ...data,
            status: 1,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar usuário
    static async updateUsuario(id: number, data: Partial<Omit<UsuarioAttributes, 'id' | 'dataCriacao' | 'dataAtualizacao'>>): Promise<UsuarioAttributes> {
        // Verificar se o usuário existe
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        // Se a senha foi fornecida, atualiza a senha
        if (data.senha) {
            data.senha = await PasswordUtils.hashPassword(data.senha);
        }

        // Atualizar os campos fornecidos
        return await usuario.update({
            ...data,
            dataAtualizacao: new Date(),
        });
    }

    // Deletar usuário (alterar status para 0)
    static async deleteUsuario(id: number): Promise<UsuarioAttributes> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        // Alterar o status para 0, marcando como desativado
        usuario.status = 0;
        usuario.dataAtualizacao = new Date();

        // Salvar as alterações
        await usuario.save();
        return usuario;
    }
}