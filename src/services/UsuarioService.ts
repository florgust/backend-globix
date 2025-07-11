import Usuario, { UsuarioAttributes } from '@models/Usuario';
import { PasswordUtils } from '@utils/PasswordUtils';
import { NotFoundError, BadRequestError, UnauthorizedError } from '@utils/Errors';
import Foto from '@models/Foto';

export class UsuarioService {
    // Buscar todos os usuários ativos (status = 1)
    static async getUsuarios(): Promise<UsuarioAttributes[]> {
        return await Usuario.findAll({
            where: {
                status: 1,
            },
        });
    }

    static async getUsuariosComFoto(): Promise<any[]> {
        const usuarios = await Usuario.findAll({
            where: {
                status: 1,
            },
            include: [{
                model: Foto,
                as: 'fotoPerfil',
                attributes: ['id', 'url'],
                required: false // LEFT JOIN - usuário pode não ter foto
            }]
        });

        // Formatar resposta incluindo URL da foto
        return usuarios.map(usuario => ({
            ...usuario.toJSON(),
            url: usuario.fotoPerfil?.url || null
        }));
    }

    // Buscar usuário por ID
    static async getUsuarioById(id: number): Promise<UsuarioAttributes> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }
        return usuario;
    }

    static async getUsuarioComFotoById(id: number): Promise<any> {
        const usuario = await Usuario.findByPk(id, {
            include: [{
                model: Foto,
                as: 'fotoPerfil',
                attributes: ['id', 'url']
            }]
        });
        
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        // Formatar resposta incluindo URL da foto
        return {
            ...usuario.toJSON(),
            url: usuario.fotoPerfil?.url || null
        };
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

    static async updateSenhaUsuario(id: number, senhaAtual: string, novaSenha: string): Promise<void> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        // Valida a senha atual
        const senhaCorreta = await PasswordUtils.comparePassword(senhaAtual, usuario.senha);
        if (!senhaCorreta) {
            throw new UnauthorizedError('Senha atual incorreta.');
        }

        // Atualiza a senha
        const hashedNovaSenha = await PasswordUtils.hashPassword(novaSenha);
        usuario.senha = hashedNovaSenha;
        usuario.dataAtualizacao = new Date();
        await usuario.save();
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