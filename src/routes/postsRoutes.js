// Routes define as rotas da aplicação, mapeando URLs para as ações correspondentes nos Controllers

// Importar dependências de outros arquivos e bibliotecas
import cors from "cors"; // Biblioteca pare permitir receber conexão de outro endereço (segurança)
import express from "express"; // Importa o framework Express para criar aplicações
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost, deletarPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000", // Endereço usado pelo front-end
    optionsSuccessStatus: 200
}

//Remediação para o multer manter o nome do arquino no windows
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({dest:"./uploads", storage});
//No linux ou mac
//const upload = multer({dest:"./uploads"});

// Define as rotas usando o objeto Express app
const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    // Permite que o servidor receba requisições do front-end
    app.use(cors(corsOptions));
    
    
    // Rota para buscar todos os posts. Note que não estamos executando listarPosts, apenas indexando que função será chamda quando bater nesta rota
    app.get("/posts", listarPosts);
    // Rota para criar um post.
    app.post("/posts", postarNovoPost);
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualizar um post
    app.put("/upload/:id", atualizarNovoPost);
    // Rota para apagar um post
    //app.delete("/delete/:id", deletarPost);
}

// Exporta a função routes
export default routes;