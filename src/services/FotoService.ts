import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Foto, { FotoAttributes } from "../models/Foto";
import { BadRequestError, NotFoundError } from "@utils/Errors";

class FotoService {
    static async createFoto(data: Omit<FotoAttributes, "id">): Promise<FotoAttributes> {
        return await Foto.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    private async uploadToCloudinary(file: Express.Multer.File, folder: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result);
                }
            );
            stream.end(file.buffer);
        });
    }

    async uploadFotoPerfil(file: Express.Multer.File, usuarioId: number) {
        if (!file) throw new BadRequestError("Arquivo de imagem não enviado.");

        const fotoExistente = await Foto.findOne({
            where: { usuarioId, tipo: "perfil" },
        });

        if (fotoExistente) {
            await this.deleteFoto(fotoExistente.id!);
        }

        const result = await this.uploadToCloudinary(file, `/globix/usuarios/${usuarioId}/perfil`);

        const foto = await FotoService.createFoto({
            url: result.secure_url,
            tipo: "perfil",
            usuarioId,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });

        return foto;
    }

    async uploadFotoCapa(file: Express.Multer.File, viagemId: number): Promise<FotoAttributes> {
        if (!file) throw new BadRequestError("Arquivo de imagem não enviado.");

        const fotoExistente = await Foto.findOne({
            where: { viagemId, tipo: "capa_viagem" },
        });

        if (fotoExistente) {
            await this.deleteFoto(fotoExistente.id!);
        }

        const result = await this.uploadToCloudinary(file, `/globix/viagens/${viagemId}/capa`);

        const foto = await FotoService.createFoto({
            url: result.secure_url,
            tipo: "capa_viagem",
            viagemId,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });

        return foto;
    }

    async getFotoById(id: number): Promise<FotoAttributes> {
        const foto = await Foto.findByPk(id);
        if (!foto) {
            throw new NotFoundError("Foto não encontrada.");
        }
        return foto;
    }

    async getFotoPerfil(usuarioId: number): Promise<FotoAttributes | null> {
        return await Foto.findOne({
            where: { usuarioId, tipo: "perfil" },
        });
    }

    async getFotoCapa(viagemId: number): Promise<FotoAttributes | null> {
        return await Foto.findOne({
            where: { viagemId, tipo: "capa_viagem" },
        });
    }

    async deleteFoto(id: number): Promise<{ message: string }> {
        const foto = await Foto.findByPk(id);
        if (!foto) {
            throw new NotFoundError("Foto não encontrada.");
        }

        try {
            if (foto.url) {
                const publicId = this.extractPublicId(foto.url);
                await cloudinary.uploader.destroy(publicId);
            }

            await foto.destroy();
            return { message: "Foto deletada com sucesso" };
        } catch (error: any) {
            throw new BadRequestError(`Erro ao deletar foto: ${error.message}`);
        }
    }

    async updateFoto(id: number, file: Express.Multer.File): Promise<FotoAttributes> {
        if (!file) throw new BadRequestError("Arquivo de imagem não enviado.");

        const foto = await Foto.findByPk(id);
        if (!foto) {
            throw new NotFoundError("Foto não encontrada.");
        }

        try {
            if (foto.url) {
                const publicId = this.extractPublicId(foto.url);
                await cloudinary.uploader.destroy(publicId);
                console.log('Deletando foto antiga do Cloudinary:', publicId);
            }

            let folder = "";
            if (foto.tipo === "perfil") {
                folder = `usuarios/${foto.usuarioId}/perfil`;
            } else if (foto.tipo === "capa_viagem") {
                folder = `viagens/${foto.viagemId}/capa`;
            }

            const result = await this.uploadToCloudinary(file, folder);

            const updatedFoto = await foto.update({
                url: result.secure_url,
                dataAtualizacao: new Date(),
            });

            return updatedFoto;
        } catch (error: any) {
            throw new BadRequestError(`Erro ao atualizar foto: ${error.message}`);
        }
    }

    private extractPublicId(url: string): string {
        const urlObj = new URL(url);
        const path = urlObj.pathname; 
        const parts = path.split("/");
        const uploadIndex = parts.indexOf("upload");
        const publicPath = parts.slice(uploadIndex + 1).join("/"); 
        return publicPath.split(".")[0]; 
    }
}

export default new FotoService();
