import Usuario from '../model/Usuario';
import bcrypt from 'bcrypt';

export class UsuarioService {
    // Buscar todos os usuários
    static async getUsuarios() {
        return await Usuario.findAll();
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

        // Atualizar dados
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha ? await bcrypt.hash(senha, 10) : usuario.senha;
        usuario.tipo = tipo;
        usuario.status = status;
        usuario.dataAtualizacao = new Date();  // Atualiza a data de atualização

        // Salvar as alterações
        await usuario.save();
        return usuario;
    }
}
