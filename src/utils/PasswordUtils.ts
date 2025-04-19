import bcrypt from 'bcrypt';

export class PasswordUtils {
    // Método para criptografar uma senha
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // Número de rounds para gerar o salt
        return await bcrypt.hash(password, saltRounds);
    }

    // Método para comparar uma senha com o hash armazenado
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}