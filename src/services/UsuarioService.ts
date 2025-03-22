import Usuario from '../model/Usuario';
import bcrypt from 'bcrypt';

export class UsuarioService {
    // Buscar todos os usuários ativos (status = 1)
    static async getUsuarios() {
        return await Usuario.findAll({
            where: {
                status: 1
            }
        });
    }

    // Buscar usuário por ID
    static async getUsuarioById(id: number) {
        return await Usuario.findByPk(id);
    }

    // Criar novo usuário com validação
    static async createUsuario(nome: string, email: string, senha: string, tipo: string, status: number) {
        // Validação de campos obrigatórios
        if (!nome || !email || !senha || !tipo) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
        }

        // Verificar se o email já existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error('O email já está em uso.');
        }

        // Hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        // Criar o usuário no banco de dados com dataCriacao e dataAtualizacao
        return await Usuario.create({
            nome,
            email,
            senha: hashedSenha,
            tipo,
            status,
            dataCriacao: new Date(),  // Configura a data de criação
            dataAtualizacao: new Date()  // Configura a data de atualização
        });
    }

    // Atualizar usuário
    static async updateUsuario(id: number, nome: string, email: string, senha: string, tipo: string, status: number) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Atualiza os dados do usuário
        usuario.nome = nome;
        usuario.email = email;
        usuario.tipo = tipo;
        usuario.status = status;

        // Se a senha foi fornecida, atualiza a senha
        if (senha) {
            usuario.senha = await bcrypt.hash(senha, 10);
        }

        // Atualiza a data de atualização
        usuario.dataAtualizacao = new Date();

        // Salva as alterações no banco
        await usuario.save();
        return usuario;
    }

    // Deletar usuário (alterar status para 0)
    static async deleteUsuario(id: number) {
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
