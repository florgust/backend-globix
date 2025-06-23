# Usa imagem oficial do Node 18
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências com npm
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Roda o build do TypeScript (gera JS na pasta dist)
RUN npm run build

# Expõe a porta que o backend usa
EXPOSE 3333

# Comando para rodar a aplicação compilada
CMD ["node", "-r", "module-alias/register", "dist/app.js"]
