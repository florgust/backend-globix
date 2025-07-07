import { Router } from "express";
import upload from "../config/multer";
import { uploadFotoPerfil, uploadFotoCapa, updateFoto, deleteFoto, getFotoById, getFotoPerfil, getFotoCapa} from '@controllers/api/foto/FotoController';

const router = Router();

router.post("/foto/perfil/:usuarioId", upload.single("image"), uploadFotoPerfil);
router.post("/foto/capa/:viagemId", upload.single("image"), uploadFotoCapa);
router.put("/foto/:id", upload.single("image"), updateFoto);
router.delete("/foto/:id", deleteFoto);
router.get("/foto/:id", getFotoById);
router.get("/foto/perfil/:usuarioId", getFotoPerfil);
router.get("/foto/capa/:viagemId", getFotoCapa);

export default router;