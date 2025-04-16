import Usuario, { UsuarioAttributes } from '@models/Usuario';
import { PasswordUtils } from '@utils/PasswordUtils';

export class UsuarioService {
    // Buscar todos os usuários ativos (status = 1)
    static async getUsuarios(): Promise<UsuarioAttributes[]> {
        return await Usuario.findAll({
            where: {
                status: 1
            }
        });
    }

    // Buscar usuário por ID
    static async getUsuarioById(id: number): Promise<UsuarioAttributes | null> {
        return await Usuario.findByPk(id);
    }

    // Criar novo usuário com validação
    static async createUsuario(data: Omit<UsuarioAttributes, 'id' | 'status' | 'dataCriacao' | 'dataAtualizacao'>): Promise<UsuarioAttributes> {
        // Validação de campos obrigatórios
        if (!data.nome || !data.email || !data.senha || !data.tipo) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
        }

        // Verificar se o email já existe
        const usuarioExistente = await Usuario.findOne({ where: { email: data.email } });
        if (usuarioExistente) {
            throw new Error('O email já está em uso.');
        }

        // Hash da senha
        const hashedSenha = await PasswordUtils.hashPassword(data.senha);
        data.senha = hashedSenha;

        // Criar o usuário no banco de dados com dataCriacao e dataAtualizacao
        return await Usuario.create({
            ...data,
            status: 1,
            dataCriacao: new Date(),  // Configura a data de criação
            dataAtualizacao: new Date()  // Configura a data de atualização
        });
    }

    static async updateUsuario(id: number, data: Partial<Omit<UsuarioAttributes, 'id' | 'dataCriacao' | 'dataAtualizacao'>>): Promise<UsuarioAttributes> {
        // Verificar se o usuário existe
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Se a senha foi fornecida, atualiza a senha
        if (data.senha) {
            data.senha = await PasswordUtils.hashPassword(data.senha);
        }

        // Atualizar os campos fornecidos
        return await usuario.update({
            ...data,
            dataAtualizacao: new Date(), // Atualiza a data de modificação
        });
    }

    // Deletar usuário (alterar status para 0)
    static async deleteUsuario(id: number): Promise<UsuarioAttributes | null> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return null; // Retorna null caso o usuário não seja encontrado
        }

        // Alterar o status para 0, marcando como desativado
        usuario.status = 0;
        usuario.dataAtualizacao = new Date();  // Atualiza a data de atualização

        // Salvar as alterações
        await usuario.save();
        return usuario; // Retorna o usuário desativado
    }


}
